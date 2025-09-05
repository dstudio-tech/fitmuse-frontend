import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { documentId } = await req.json();

    if (!documentId) {
      return NextResponse.json(
        { error: "Missing documentId" },
        { status: 400 }
      );
    }

    // 1. Get current article to read existing views
    const getRes = await fetch(
      `${process.env.BACKEND_URL}/api/articles/${documentId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.SUPER_USER_TOKEN}`,
        },
      }
    );

    if (!getRes.ok) {
      const error = await getRes.json();
      return NextResponse.json(
        { error: "Failed to fetch article", details: error },
        { status: getRes.status }
      );
    }

    const article = await getRes.json();
    const currentViews = article?.data?.views ?? 0;

    // 2. Update with incremented views
    const newViews = currentViews + 1;

    const updateRes = await fetch(
      `${process.env.BACKEND_URL}/api/articles/${documentId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.SUPER_USER_TOKEN}`,
        },
        body: JSON.stringify({
          data: { views: newViews },
        }),
      }
    );

    if (!updateRes.ok) {
      const error = await updateRes.json();
      return NextResponse.json(
        { error: "Failed to update views", details: error },
        { status: updateRes.status }
      );
    }

    const updated = await updateRes.json();
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Update article views error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
