import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const { documentId } = await req.json();

    if (!documentId) {
      return NextResponse.json(
        { error: "Missing documentId" },
        { status: 400 }
      );
    }

    // Delete the collection directly using documentId
    const deleteRes = await fetch(
      `${process.env.BACKEND_URL}/api/collections/${documentId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${process.env.SUPER_USER_TOKEN}`,
        },
      }
    );

    if (deleteRes.status !== 204 && !deleteRes.ok) {
      const err = await deleteRes.text();
      return NextResponse.json(
        { error: "Failed to delete collection", details: err },
        { status: deleteRes.status }
      );
    }

    return NextResponse.json({ success: true, documentId });
  } catch (error) {
    console.error("Delete Collection error:", error);
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
