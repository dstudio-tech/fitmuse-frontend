import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const config = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: "/",
  // domain: process.env.HOST ?? "localhost",
  // httpOnly: true,
  sameSite: false,
  secure: process.env.NODE_ENV === "production" ? true : false,
};

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("access_token");

  if (!token) return NextResponse.redirect(new URL("/", request.url));
  const backendUrl = process.env.BACKEND_URL ?? "http://localhost:1337";
  const path = "/api/auth/google/callback";
  const url = new URL(backendUrl + path);
  url.searchParams.append("access_token", token);
  const res = await fetch(url.href);
  const data = await res.json();

  (await cookies()).set("jwt", data.jwt, config);
  // (await cookies()).set("user", JSON.stringify(data.user));

  return NextResponse.redirect(new URL("/profile", request.url));
}
