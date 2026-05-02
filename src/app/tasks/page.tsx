'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  PlusIcon,
  UserCircleIcon,
  ClockIcon,
  XMarkIcon,
  ChevronRightIcon,
  PencilIcon,
  TrashIcon,
  CheckIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';
import type { Task, TaskStatus, ActivityEntry } from '@/lib/supabase';
import { STATUS_LABELS, PRIORITY_LABELS, PRIORITY_COLORS } from '@/lib/supabase';

const COLUMNS: TaskStatus[] = ['backlog', 'todo', 'in_progress', 'review', 'done'];

const STATUS_COLORS: Record<TaskStatus, string> = {
  backlog: 'bg-gray-100 border-gray-300',
  todo: 'bg-blue-50 border-blue-300',
  in_progress: 'bg-yellow-50 border-yellow-300',
  review: 'bg-purple-50 border-purple-300',
  done: 'bg-green-50 border-green-300',
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showNewTask, setShowNewTask] = useState(false);
  const [draggedTask, setDraggedTask] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    try {
      const res = await fetch('/api/tasks');
      if (!res.ok) throw new Error('Failed to fetch tasks');
      const data = await res.json();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const updateTask = async (id: string, updates: Partial<Task>) => {
    try {
      const res = await fetch('/api/tasks', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...updates }),
      });
      if (!res.ok) throw new Error('Failed to update task');
      await fetchTasks();
      if (selectedTask?.id === id) {
        const updated = await res.json();
        setSelectedTask(updated);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Update failed');
    }
  };

  const createTask = async (task: Partial<Task>) => {
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });
      if (!res.ok) throw new Error('Failed to create task');
      await fetchTasks();
      setShowNewTask(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Create failed');
    }
  };

  const deleteTask = async (id: string) => {
    if (!confirm('Delete this task?')) return;
    try {
      const res = await fetch(`/api/tasks?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete task');
      setSelectedTask(null);
      await fetchTasks();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    }
  };

  const handleDragStart = (taskId: string) => {
    setDraggedTask(taskId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (status: TaskStatus) => {
    if (draggedTask) {
      updateTask(draggedTask, { status });
      setDraggedTask(null);
    }
  };

  const tasksByStatus = (status: TaskStatus) =>
    tasks.filter((t) => t.status === status);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <ArrowPathIcon className="w-8 h-8 animate-spin text-[--primary]" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[--secondary]">Tasks</h1>
          <p className="text-sm text-[--text-muted]">{tasks.length} tasks across all stages</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => fetchTasks()}
            className="p-2 rounded-lg hover:bg-gray-100 text-[--text-secondary]"
            title="Refresh"
          >
            <ArrowPathIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => setShowNewTask(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[--primary] text-white rounded-lg hover:bg-[--primary-dark] transition-colors text-sm font-medium"
          >
            <PlusIcon className="w-4 h-4" />
            New Task
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
          <button onClick={() => setError(null)} className="ml-2 underline">dismiss</button>
        </div>
      )}

      {/* Board */}
      <div className="flex-1 overflow-x-auto">
        <div className="flex gap-4 min-w-max h-full">
          {COLUMNS.map((status) => (
            <div
              key={status}
              className={`w-72 flex-shrink-0 rounded-xl border-2 ${STATUS_COLORS[status]} p-3 flex flex-col`}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(status)}
            >
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold text-[--secondary] text-sm">
                  {STATUS_LABELS[status]}
                </h2>
                <span className="text-xs bg-white/80 px-2 py-0.5 rounded-full text-[--text-muted] font-medium">
                  {tasksByStatus(status).length}
                </span>
              </div>
              <div className="space-y-2 flex-1 overflow-y-auto max-h-[calc(100vh-220px)]">
                {tasksByStatus(status).map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onClick={() => setSelectedTask(task)}
                    onDragStart={() => handleDragStart(task.id)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Task Detail Slide-over */}
      {selectedTask && (
        <TaskDetail
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onUpdate={updateTask}
          onDelete={deleteTask}
        />
      )}

      {/* New Task Modal */}
      {showNewTask && (
        <NewTaskModal
          onClose={() => setShowNewTask(false)}
          onCreate={createTask}
        />
      )}
    </div>
  );
}

function TaskCard({
  task,
  onClick,
  onDragStart,
}: {
  task: Task;
  onClick: () => void;
  onDragStart: () => void;
}) {
  // Format timestamp as dd/mm/yyyy HH:MM
  const formatTimestamp = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onClick={onClick}
      className="bg-white rounded-lg p-3 shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="text-sm font-medium text-[--secondary] leading-tight">{task.title}</h3>
        <ChevronRightIcon className="w-4 h-4 text-[--text-muted] flex-shrink-0 mt-0.5" />
      </div>
      {task.description && (
        <p className="text-xs text-[--text-muted] mb-2 line-clamp-2">{task.description}</p>
      )}
      <div className="flex items-center gap-2 flex-wrap mb-2">
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${PRIORITY_COLORS[task.priority] || PRIORITY_COLORS[2]}`}>
          {PRIORITY_LABELS[task.priority] || 'Medium'}
        </span>
        {task.project && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-[--text-secondary] font-medium">
            {task.project}
          </span>
        )}
        {task.assigned_to && (
          <span className="text-xs text-[--text-muted] flex items-center gap-1 ml-auto">
            <UserCircleIcon className="w-3.5 h-3.5" />
            {task.assigned_to}
          </span>
        )}
      </div>
      <div className="flex items-center gap-1 text-xs text-[--text-muted]">
        <ClockIcon className="w-3.5 h-3.5" />
        {formatTimestamp(task.created_at)}
      </div>
      {task.due_date && (
        <div className="flex items-center gap-1 mt-1 text-xs text-amber-600">
          <ClockIcon className="w-3.5 h-3.5" />
          Due: {task.due_date}
        </div>
      )}
    </div>
  );
}

function TaskDetail({
  task,
  onClose,
  onUpdate,
  onDelete,
}: {
  task: Task;
  onClose: () => void;
  onUpdate: (id: string, updates: Partial<Task>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}) {
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDesc, setEditDesc] = useState(task.description || '');
  const [editNotes, setEditNotes] = useState(task.notes || '');
  const [editAssignee, setEditAssignee] = useState(task.assigned_to || '');
  const [editPriority, setEditPriority] = useState(task.priority);
  const [editProject, setEditProject] = useState(task.project || '');
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    setEditTitle(task.title);
    setEditDesc(task.description || '');
    setEditNotes(task.notes || '');
    setEditAssignee(task.assigned_to || '');
    setEditPriority(task.priority);
    setEditProject(task.project || '');
    setEditing(false);
  }, [task]);

  const saveEdits = async () => {
    await onUpdate(task.id, {
      title: editTitle,
      description: editDesc,
      notes: editNotes,
      assigned_to: editAssignee,
      priority: editPriority,
      project: editProject,
    });
    setEditing(false);
  };

  const addNote = async () => {
    if (!newNote.trim()) return;
    const log = [...(task.activity_log || [])];
    log.push({
      ts: new Date().toISOString().split('T')[0],
      action: 'note',
      by: 'justin',
      note: newNote.trim(),
    });
    await onUpdate(task.id, { activity_log: log } as Partial<Task>);
    setNewNote('');
  };

  const activityLog = task.activity_log || [];

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[--border]">
          <div className="flex items-center gap-2">
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${PRIORITY_COLORS[task.priority] || PRIORITY_COLORS[2]}`}>
              {PRIORITY_LABELS[task.priority] || 'Medium'}
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-[--text-secondary]">
              {STATUS_LABELS[task.status as TaskStatus] || task.status}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setEditing(!editing)}
              className="p-1.5 rounded-lg hover:bg-gray-100 text-[--text-secondary]"
              title="Edit"
            >
              <PencilIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"
              title="Delete"
            >
              <TrashIcon className="w-4 h-4" />
            </button>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 text-[--text-secondary]">
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          {/* Title */}
          {editing ? (
            <input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="text-lg font-bold text-[--secondary] w-full border-b border-[--border] pb-1 focus:outline-none focus:border-[--primary]"
            />
          ) : (
            <h2 className="text-lg font-bold text-[--secondary]">{task.title}</h2>
          )}

          {/* Meta */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <label className="text-xs text-[--text-muted] uppercase tracking-wide">Assignee</label>
              {editing ? (
                <select
                  value={editAssignee}
                  onChange={(e) => setEditAssignee(e.target.value)}
                  className="mt-1 w-full border border-[--border] rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:border-[--primary]"
                >
                  <option value="justin">Justin</option>
                  <option value="thomas">Thomas</option>
                  <option value="steve">Steve</option>
                  <option value="scout">Scout</option>
                  <option value="sheila">Sheila</option>
                  <option value="atlas">Atlas</option>
                  <option value="sebastian">Sebastian</option>
                </select>
              ) : (
                <p className="mt-1 text-[--secondary] capitalize">{task.assigned_to || '—'}</p>
              )}
            </div>
            <div>
              <label className="text-xs text-[--text-muted] uppercase tracking-wide">Priority</label>
              {editing ? (
                <select
                  value={editPriority}
                  onChange={(e) => setEditPriority(Number(e.target.value))}
                  className="mt-1 w-full border border-[--border] rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:border-[--primary]"
                >
                  <option value={1}>High</option>
                  <option value={2}>Medium</option>
                  <option value={3}>Low</option>
                </select>
              ) : (
                <p className="mt-1 text-[--secondary]">{PRIORITY_LABELS[task.priority] || 'Medium'}</p>
              )}
            </div>
            <div>
              <label className="text-xs text-[--text-muted] uppercase tracking-wide">Project</label>
              {editing ? (
                <input
                  value={editProject}
                  onChange={(e) => setEditProject(e.target.value)}
                  className="mt-1 w-full border border-[--border] rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:border-[--primary]"
                />
              ) : (
                <p className="mt-1 text-[--secondary]">{task.project || '—'}</p>
              )}
            </div>
            <div>
              <label className="text-xs text-[--text-muted] uppercase tracking-wide">Status</label>
              <select
                value={task.status}
                onChange={(e) => onUpdate(task.id, { status: e.target.value })}
                className="mt-1 w-full border border-[--border] rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:border-[--primary]"
              >
                {COLUMNS.map((s) => (
                  <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-xs text-[--text-muted] uppercase tracking-wide">Description</label>
            {editing ? (
              <textarea
                value={editDesc}
                onChange={(e) => setEditDesc(e.target.value)}
                rows={3}
                className="mt-1 w-full border border-[--border] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[--primary] resize-none"
              />
            ) : (
              <p className="mt-1 text-sm text-[--secondary] whitespace-pre-wrap">{task.description || '—'}</p>
            )}
          </div>

          {/* Origin */}
          {task.origin && (
            <div>
              <label className="text-xs text-[--text-muted] uppercase tracking-wide">Origin / Context</label>
              <p className="mt-1 text-sm text-[--text-secondary] bg-gray-50 rounded-lg p-3">{task.origin}</p>
            </div>
          )}

          {/* Reference URLs */}
          {task.reference_urls && task.reference_urls.length > 0 && (
            <div>
              <label className="text-xs text-[--text-muted] uppercase tracking-wide">References</label>
              <div className="mt-1 space-y-1">
                {task.reference_urls.map((url, i) => (
                  <div key={i} className="text-xs text-[--info] bg-blue-50 rounded px-2 py-1 font-mono break-all">
                    {url}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          <div>
            <label className="text-xs text-[--text-muted] uppercase tracking-wide">Notes</label>
            {editing ? (
              <textarea
                value={editNotes}
                onChange={(e) => setEditNotes(e.target.value)}
                rows={3}
                className="mt-1 w-full border border-[--border] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[--primary] resize-none"
              />
            ) : (
              <p className="mt-1 text-sm text-[--secondary] whitespace-pre-wrap">{task.notes || '—'}</p>
            )}
          </div>

          {/* Edit Save/Cancel */}
          {editing && (
            <div className="flex gap-2">
              <button
                onClick={saveEdits}
                className="flex items-center gap-1 px-3 py-1.5 bg-[--primary] text-white rounded-lg text-sm hover:bg-[--primary-dark]"
              >
                <CheckIcon className="w-4 h-4" />
                Save
              </button>
              <button
                onClick={() => setEditing(false)}
                className="px-3 py-1.5 bg-gray-100 text-[--text-secondary] rounded-lg text-sm hover:bg-gray-200"
              >
                Cancel
              </button>
            </div>
          )}

          {/* Activity Log */}
          <div>
            <label className="text-xs text-[--text-muted] uppercase tracking-wide">Activity</label>
            <div className="mt-2 space-y-2">
              {activityLog.length === 0 && (
                <p className="text-xs text-[--text-muted]">No activity yet</p>
              )}
              {[...activityLog].reverse().map((entry: ActivityEntry, i: number) => (
                <div key={i} className="flex gap-2 text-xs">
                  <span className="text-[--text-muted] whitespace-nowrap">{entry.ts}</span>
                  <span className="text-[--text-secondary] capitalize font-medium">{entry.by}</span>
                  <span className="text-[--secondary]">{entry.note}</span>
                </div>
              ))}
            </div>
            {/* Add note */}
            <div className="mt-3 flex gap-2">
              <input
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addNote()}
                placeholder="Add a note..."
                className="flex-1 border border-[--border] rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-[--primary]"
              />
              <button
                onClick={addNote}
                className="px-3 py-1.5 bg-[--primary] text-white rounded-lg text-sm hover:bg-[--primary-dark]"
              >
                Add
              </button>
            </div>
          </div>

          {/* Timestamps */}
          <div className="text-xs text-[--text-muted] space-y-1 pt-2 border-t border-[--border]">
            <p>Created: {new Date(task.created_at).toLocaleString()}</p>
            <p>Updated: {new Date(task.updated_at).toLocaleString()}</p>
            {task.completed_at && <p>Completed: {new Date(task.completed_at).toLocaleString()}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

function NewTaskModal({
  onClose,
  onCreate,
}: {
  onClose: () => void;
  onCreate: (task: Partial<Task>) => Promise<void>;
}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignee, setAssignee] = useState('justin');
  const [priority, setPriority] = useState(2);
  const [project, setProject] = useState('');
  const [status, setStatus] = useState<TaskStatus>('todo');
  const [origin, setOrigin] = useState('');

  const handleCreate = () => {
    if (!title.trim()) return;
    onCreate({
      title: title.trim(),
      description: description.trim() || null,
      assigned_to: assignee,
      priority,
      project: project.trim() || null,
      status,
      origin: origin.trim() || null,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[--secondary]">New Task</h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100">
            <XMarkIcon className="w-5 h-5 text-[--text-secondary]" />
          </button>
        </div>
        <div className="space-y-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
            className="w-full border border-[--border] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[--primary]"
            autoFocus
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            rows={2}
            className="w-full border border-[--border] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[--primary] resize-none"
          />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-[--text-muted]">Assignee</label>
              <select
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                className="mt-1 w-full border border-[--border] rounded-lg px-2 py-1.5 text-sm"
              >
                <option value="justin">Justin</option>
                <option value="thomas">Thomas</option>
                <option value="steve">Steve</option>
                <option value="scout">Scout</option>
                <option value="sheila">Sheila</option>
                <option value="atlas">Atlas</option>
                <option value="sebastian">Sebastian</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-[--text-muted]">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(Number(e.target.value))}
                className="mt-1 w-full border border-[--border] rounded-lg px-2 py-1.5 text-sm"
              >
                <option value={1}>High</option>
                <option value={2}>Medium</option>
                <option value={3}>Low</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-[--text-muted]">Project</label>
              <input
                value={project}
                onChange={(e) => setProject(e.target.value)}
                placeholder="e.g. PFL Academy"
                className="mt-1 w-full border border-[--border] rounded-lg px-2 py-1.5 text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-[--text-muted]">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as TaskStatus)}
                className="mt-1 w-full border border-[--border] rounded-lg px-2 py-1.5 text-sm"
              >
                {COLUMNS.map((s) => (
                  <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs text-[--text-muted]">Origin / Context (optional)</label>
            <input
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              placeholder="Why does this task exist?"
              className="mt-1 w-full border border-[--border] rounded-lg px-2 py-1.5 text-sm"
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-[--text-secondary] hover:bg-gray-100 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={!title.trim()}
            className="px-4 py-2 text-sm bg-[--primary] text-white rounded-lg hover:bg-[--primary-dark] disabled:opacity-50"
          >
            Create Task
          </button>
        </div>
      </div>
    </div>
  );
}
