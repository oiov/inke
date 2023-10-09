import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getUserByEmail } from "@/lib/db/user";
import { findUserShares } from "@/lib/db/share";

export async function GET(
  req: NextRequest,
  { params }: { params: Record<string, string | string | undefined[]> },
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({
        code: 401,
        msg: "UnAuth",
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

    const res = await findUserShares(user.id);

    if (res) {
      return NextResponse.json({
        code: 200,
        msg: "",
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

export const dynamic = "force-dynamic";
