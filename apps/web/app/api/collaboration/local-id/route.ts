import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getUserByEmail } from "@/lib/db/user";
import {
  findCollaborationByDBId,
  findCollaborationBylocalId,
} from "@/lib/db/collaboration";

// /invite/:id 邀请页调用，查询此邀请详细信息，不需要登录，点击“加入协作”后才需要鉴权
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

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("localId");
    if (!id) {
      return NextResponse.json({
        code: 403,
        msg: "Empty id",
        data: null,
      });
    }

    const res = await findCollaborationBylocalId(id, user.id);

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

export const dynamic = "force-dynamic";
