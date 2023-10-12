import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    subject: "website",
    status: "live",
    color: "green",
  });
}
