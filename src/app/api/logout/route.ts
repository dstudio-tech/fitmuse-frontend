import { NextResponse } from "next/server";

export async function GET() {
  const response = new NextResponse("Logged out", { status: 200 });

  response.cookies.set("jwt", "", {
    // httpOnly: true,
    path: "/",
    expires: new Date(0), // Expire immediately
  });

  return response;
}
