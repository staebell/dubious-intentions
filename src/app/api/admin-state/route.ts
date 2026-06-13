import { NextResponse } from "next/server";
import { readAdminState, writeAdminState } from "@/lib/admin-state";

export async function GET() {
  try {
    const state = await readAdminState();
    return NextResponse.json(state);
  } catch (error) {
    return NextResponse.json(
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
    const state = await writeAdminState(body);
    return NextResponse.json(state);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to write admin state.",
        detail: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
