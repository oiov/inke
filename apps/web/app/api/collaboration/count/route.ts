import { NextRequest, NextResponse } from "next/server";
import { findCollaborationInviteCount } from "@/lib/db/collaboration";

export async function GET(
  req: NextRequest,
  { params }: { params: Record<string, string | string | undefined[]> },
) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id || id === "undefined") {
      return NextResponse.json({
        code: 403,
        msg: "Empty roomId",
        data: null,
      });
    }

    const res = await findCollaborationInviteCount(id);
    if (res) {
      return NextResponse.json({
        code: 200,
        msg: "Successed!",
        data: res,
      });
    }

    return NextResponse.json({
      code: 404,
      msg: "Not joined the collaboration space",
      data: null,
    });
  } catch (error) {
    return NextResponse.json(error);
  }
}

// export const dynamic = "force-dynamic";
