import { NextRequest, NextResponse } from "next/server";
import { getUserByEmail, getUserById, updateUserName } from "@/lib/db/user";

export async function GET(
  req: NextRequest,
  { params }: { params: Record<string, string | string | undefined[]> },
) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const id = searchParams.get("id");

    if (email) {
      const user = await getUserByEmail(email);
      return NextResponse.json(user);
    } else if (id && id !== "undefined") {
      const user = await getUserById(id);
      return NextResponse.json(user);
    }

    return NextResponse.json("empty params");
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Record<string, string | string | undefined[]> },
) {
  try {
    const { userId, userName } = await req.json();
    if (!userId || !userName) {
      return NextResponse.json("empty content");
    }

    const res = await updateUserName(userId, userName);

    if (res) {
      return NextResponse.json(res);
    }

    return NextResponse.json("something wrong");
  } catch {
    return NextResponse.json("error");
  }
}

// fix error: "DYNAMIC_SERVER_USAGE"
export const dynamic = "force-dynamic";
