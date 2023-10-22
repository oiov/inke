import { NextRequest, NextResponse } from "next/server";
import { findShareByDBId, updateShareKeeps } from "@/lib/db/share";

export async function POST(
  req: NextRequest,
  { params }: { params: Record<string, string | string | undefined[]> },
) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({
        code: 405,
        msg: "Empty id",
        data: null,
      });
    }

    const find_res = await findShareByDBId(id);

    if (find_res) {
      const res = await updateShareKeeps(id, find_res.keeps);

      return NextResponse.json({
        code: 200,
        msg: "success",
        data: null,
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

// fix error: "DYNAMIC_SERVER_USAGE"
export const dynamic = "force-dynamic";
