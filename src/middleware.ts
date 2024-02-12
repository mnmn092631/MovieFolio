import { auth } from "./auth";
import { NextResponse } from "next/server";

export async function middleware() {
  const session = await auth();
  if (!session) return NextResponse.redirect(`${process.env.AUTH_URL}/login`);
}

export const config = {
  matcher: ["/home", "/search", "/release", "/board"],
};
