import { NextRequest, NextResponse } from 'next/server';
import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.SUPABASE_DB_URL,
  max: 5,
  idleTimeoutMillis: 30000,
});

export async function GET() {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM thomas.tasks ORDER BY priority ASC, created_at DESC`
    );
    return NextResponse.json(rows);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const now = new Date().toISOString().split('T')[0];
    const activityEntry = JSON.stringify([{
      ts: now,
      action: 'created',
      by: body.assigned_to || 'unknown',
      note: body.origin || 'Created from Mission Control'
    }]);

    const { rows } = await pool.query(
      `INSERT INTO thomas.tasks (title, description, assigned_to, priority, project, status, origin, activity_log)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8::jsonb)
       RETURNING *`,
      [body.title, body.description, body.assigned_to, body.priority || 2,
       body.project, body.status || 'todo', body.origin, activityEntry]
    );

    return NextResponse.json(rows[0]);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...rawUpdates } = body;

    if (!id) {
      return NextResponse.json({ error: 'id required' }, { status: 400 });
    }

    // If status is changing, add to activity log
    if (rawUpdates.status) {
      const { rows: existing } = await pool.query(
        `SELECT activity_log, status FROM thomas.tasks WHERE id = $1`,
        [id]
      );

      if (existing[0] && existing[0].status !== rawUpdates.status) {
        const log = existing[0].activity_log || [];
        log.push({
          ts: new Date().toISOString().split('T')[0],
          action: 'status_change',
          by: 'mission_control',
          note: `${existing[0].status} → ${rawUpdates.status}`
        });
        rawUpdates.activity_log = log;
      }

      if (rawUpdates.status === 'done') {
        rawUpdates.completed_at = new Date().toISOString();
      }
    }

    rawUpdates.updated_at = new Date().toISOString();

    // Build dynamic SET clause
    const keys = Object.keys(rawUpdates);
    const setClauses: string[] = [];
    const values: unknown[] = [id];

    keys.forEach((key, i) => {
      const paramIndex = i + 2;
      if (key === 'activity_log') {
        setClauses.push(`${key} = $${paramIndex}::jsonb`);
        values.push(JSON.stringify(rawUpdates[key]));
      } else {
        setClauses.push(`${key} = $${paramIndex}`);
        values.push(rawUpdates[key]);
      }
    });

    const { rows } = await pool.query(
      `UPDATE thomas.tasks SET ${setClauses.join(', ')} WHERE id = $1 RETURNING *`,
      values
    );

    return NextResponse.json(rows[0]);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'id required' }, { status: 400 });
    }

    await pool.query(`DELETE FROM thomas.tasks WHERE id = $1`, [id]);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
