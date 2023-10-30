import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getUserByEmail } from "@/lib/db/user";
import {
  createCollaboration,
  deleteCollaborationNote,
  findCollaborationByRoomId,
  findUserCollaborations,
} from "@/lib/db/collaboration";

export async function GET(
  req: NextRequest,
  { params }: { params: Record<string, string | string | undefined[]> },
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({
        code: 401,
        msg: "Unauthorized! Please login",
        data: null,
      });
    }

    const user = await getUserByEmail(session.user.email);

    if (!user) {
      return NextResponse.json({
        code: 403,
        msg: "Something wrong",
        data: null,
      });
    }

    const res = await findUserCollaborations(user.id);

    if (res) {
      return NextResponse.json({
        code: 200,
        msg: "Successed!",
        data: res,
      });
    }

    return NextResponse.json({
      code: 404,
      msg: "Not joined collaboration",
      data: null,
    });
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Record<string, string | string | undefined[]> },
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({
        code: 401,
        msg: "Unauthorized! Please login",
        data: null,
      });
    }

    const user = await getUserByEmail(session.user.email);

    if (!user) {
      return NextResponse.json({
        code: 403,
        msg: "Something wrong",
        data: null,
      });
    }

    const { localId, roomId, title } = await req.json();
    if (!localId || !roomId) {
      return NextResponse.json({
        code: 405,
        msg: "Empty params",
        data: null,
      });
    }

    // 判断用户是否已经加入此协作
    const find_res = await findCollaborationByRoomId(roomId, user.id);
    // const find_res = await findCollaborationByRoomId(roomId, user.id)

    if (find_res) {
      return NextResponse.json({
        code: 200,
        msg: "Joined, redirecting...",
        data: find_res,
      });
    }

    const res = await createCollaboration(user.id, localId, roomId, title);

    if (res) {
      return NextResponse.json({
        code: 200,
        msg: "Successfully！redirecting...",
        data: res,
      });
    }

    return NextResponse.json({
      code: 404,
      msg: "Something wrong",
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

export async function DELETE(
  req: NextRequest,
  { params }: { params: Record<string, string | string | undefined[]> },
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({
        code: 401,
        msg: "Unauthorized! Please login",
        data: null,
      });
    }

    const user = await getUserByEmail(session.user.email);

    if (!user) {
      return NextResponse.json({
        code: 403,
        msg: "Something wrong",
        data: null,
      });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({
        code: 403,
        msg: "Empty id",
        data: null,
      });
    }

    const res = await deleteCollaborationNote(id);
    if (res) {
      return NextResponse.json({
        code: 200,
        msg: "Successed!",
        data: res,
      });
    }

    return NextResponse.json({
      code: 404,
      msg: "Something wrong",
      data: null,
    });
  } catch (error) {
    return NextResponse.json(error);
  }
}

// fix error: "DYNAMIC_SERVER_USAGE"
export const dynamic = "force-dynamic";
