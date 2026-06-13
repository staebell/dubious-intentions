import { NextResponse } from "next/server";
import { loadCatalogFromCsv } from "@/lib/catalog-loader";

export async function GET() {
  try {
    const catalog = await loadCatalogFromCsv();
    return NextResponse.json(catalog);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to load catalog from CSV templates.",
        detail: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
