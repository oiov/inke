import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getUserByEmail } from "@/lib/db/user";
import {
  createShareNote,
  deleteShareNote,
  findShareByLocalId,
  updateShareNote,
} from "@/lib/db/share";

export async function GET(
  req: NextRequest,
  { params }: { params: Record<string, string | string | undefined[]> },
) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({
        code: 403,
        msg: "Empty id",
        data: null,
      });
    }

    const res = await findShareByLocalId(id);
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

    const { data } = await req.json();
    if (!data) {
      return NextResponse.json({
        code: 405,
        msg: "Empty data",
        data: null,
      });
    }

    // 必需要用户ID
    const find_res = await findShareByLocalId(data.id, user.id);

    if (find_res) {
      const update_res = await updateShareNote(data, find_res.id);
      return NextResponse.json({
        code: 200,
        msg: "Updated!",
        data: update_res,
      });
    }

    const res = await createShareNote(data, user.id);

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
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({
        code: 403,
        msg: "Empty id",
        data: null,
      });
    }

    const res = await deleteShareNote(id);
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
