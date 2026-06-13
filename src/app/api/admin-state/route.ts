import { env } from "cloudflare:workers";
import {
  defaultAdminState,
  sanitizeAdminState,
  type AdminState,
} from "@/lib/admin-state";

const CREATE_ADMIN_STATE_TABLE_SQL =
  "CREATE TABLE IF NOT EXISTS admin_state (id INTEGER PRIMARY KEY CHECK (id = 1), json TEXT NOT NULL, updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)";
const SELECT_ADMIN_STATE_SQL = "SELECT json FROM admin_state WHERE id = 1";
const UPSERT_ADMIN_STATE_SQL =
  "INSERT INTO admin_state (id, json, updated_at) VALUES (1, ?, CURRENT_TIMESTAMP) ON CONFLICT(id) DO UPDATE SET json = excluded.json, updated_at = CURRENT_TIMESTAMP";

async function ensureAdminStateTable() {
  if (!env.DB) return false;
  await env.DB.prepare(CREATE_ADMIN_STATE_TABLE_SQL).run();
  return true;
}

async function readSharedAdminState(): Promise<AdminState> {
  if (!(await ensureAdminStateTable())) {
    return defaultAdminState;
  }
  const result = await env.DB.prepare(SELECT_ADMIN_STATE_SQL).first<{ json?: string }>();
  if (!result?.json) {
    return defaultAdminState;
  }
  try {
    return sanitizeAdminState(JSON.parse(result.json) as AdminState);
  } catch {
    return defaultAdminState;
  }
}

async function writeSharedAdminState(input: unknown): Promise<AdminState> {
  const state = sanitizeAdminState((input ?? null) as Record<string, unknown>);
  if (!(await ensureAdminStateTable())) {
    return state;
  }
  await env.DB.prepare(UPSERT_ADMIN_STATE_SQL).bind(JSON.stringify(state)).run();
  return state;
}

export async function GET() {
  try {
    const state = await readSharedAdminState();
    return Response.json(state);
  } catch (error) {
    return Response.json(
      {
        error: "Failed to read admin state.",
        detail: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const state = await writeSharedAdminState(body);
    return Response.json(state);
  } catch (error) {
    return Response.json(
      {
        error: "Failed to write admin state.",
        detail: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
