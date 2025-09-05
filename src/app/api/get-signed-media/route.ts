import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const mediaPath = searchParams.get("mediaPath");

    if (!mediaPath) {
      return NextResponse.json({ error: "Missing mediaPath" }, { status: 400 });
    }

    // Optional: restrict to your bucket to prevent abuse
    const allowedPrefix =
      "https://fitmuse-strapi-cms-library-s3-bucket.s3.ap-southeast-2.amazonaws.com/";
    if (!mediaPath.startsWith(allowedPrefix)) {
      return NextResponse.json({ error: "Invalid mediaPath" }, { status: 403 });
    }

    // Fetch image from S3
    const s3Res = await fetch(mediaPath);
    if (!s3Res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch media" },
        { status: s3Res.status }
      );
    }

    // Read as ArrayBuffer and convert to raw response
    const arrayBuffer = await s3Res.arrayBuffer();

    return new Response(arrayBuffer, {
      status: 200,
      headers: {
        "Content-Type":
          s3Res.headers.get("content-type") || "application/octet-stream",
        "Cache-Control": "no-store", // optional: prevent caching
      },
    });
  } catch (err) {
    console.error("Proxy error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
