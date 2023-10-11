import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    subject: "website",
    status: "on",
    color: "green",
  });
}
