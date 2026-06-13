import { generatedCatalog } from "@/data/catalog.generated";

export async function GET() {
  try {
    return Response.json(generatedCatalog);
  } catch (error) {
    return Response.json(
      {
        error: "Failed to load catalog from CSV templates.",
        detail: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
