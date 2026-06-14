import { get, put } from "@vercel/blob";
import { promises as fs } from "node:fs";
import path from "node:path";
import {
  defaultAdminState,
  sanitizeAdminState,
  serializeAdminState,
  type AdminState,
} from "@/lib/admin-state";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ADMIN_STATE_PATH = "state/admin-state.json";

function hasBlobStore() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

async function readLocalAdminState(): Promise<AdminState> {
  try {
    const raw = await fs.readFile(path.join(process.cwd(), "content", "admin-state.json"), "utf8");
    return sanitizeAdminState(JSON.parse(raw) as AdminState);
  } catch {
    return defaultAdminState;
  }
}

async function writeLocalAdminState(state: AdminState): Promise<AdminState> {
  await fs.mkdir(path.join(process.cwd(), "content"), { recursive: true });
  await fs.writeFile(
    path.join(process.cwd(), "content", "admin-state.json"),
    serializeAdminState(state),
    "utf8"
  );
  return state;
}

async function readSharedAdminState(): Promise<AdminState> {
  if (!hasBlobStore()) {
    return readLocalAdminState();
  }

  try {
    const result = await get(ADMIN_STATE_PATH, { access: "private" });
    if (!result || result.statusCode !== 200) {
      return defaultAdminState;
    }
    const raw = await new Response(result.stream).text();
    return sanitizeAdminState(JSON.parse(raw) as AdminState);
  } catch {
    return defaultAdminState;
  }
}

async function writeSharedAdminState(input: unknown): Promise<AdminState> {
  const state = sanitizeAdminState((input ?? null) as Record<string, unknown>);
  if (!hasBlobStore()) {
    return writeLocalAdminState(state);
  }

  await put(ADMIN_STATE_PATH, serializeAdminState(state), {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
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
