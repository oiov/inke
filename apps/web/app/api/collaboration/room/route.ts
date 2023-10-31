import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getUserByEmail } from "@/lib/db/user";
import { findCollaborationByRoomId } from "@/lib/db/collaboration";

// post页面获取详情时调用，需要用户id查询是否已经加入，加入才开启协作模式
export async function GET(
  req: NextRequest,
  { params }: { params: Record<string, string | string | undefined[]> },
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({
        code: 401,
        msg: "Unauthorized! Please login first",
        data: null,
      });
    }

    const user = await getUserByEmail(session.user.email);

    if (!user) {
      return NextResponse.json({
        code: 403,
        msg: "Not found user",
        data: null,
      });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("roomId");
    if (!id) {
      return NextResponse.json({
        code: 403,
        msg: "Empty roomId",
        data: null,
      });
    }

    // 查询用户是否已经加入了这个协作（已经创建了这个room记录）
    const res = await findCollaborationByRoomId(id, user.id);

    if (res) {
      return NextResponse.json({
        code: 200,
        msg: "Successed!",
        data: res,
      });
    }

    return NextResponse.json({
      code: 404,
      msg: "You haven't joined this collaboration yet",
      data: null,
    });
  } catch (error) {
    return NextResponse.json({
      code: 500,
      msg: error,
      data: null,
    });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Record<string, string | string | undefined[]> },
) {
  try {
    const { roomId } = await req.json();

    if (!roomId) {
      return NextResponse.json({
        code: 403,
        msg: "Empty roomId",
        data: null,
      });
    }

    const res = await findCollaborationByRoomId(roomId);

    if (res) {
      return NextResponse.json({
        code: 200,
        msg: "Successed!",
        data: res,
      });
    }

    return NextResponse.json({
      code: 404,
      msg: "Not found",
      data: null,
    });
  } catch (error) {
    return NextResponse.json({
      code: 500,
      msg: error,
      data: null,
    });
  }
}

// fix error: "DYNAMIC_SERVER_USAGE"
export const dynamic = "force-dynamic";
