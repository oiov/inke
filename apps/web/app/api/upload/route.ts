import { Account_Plans } from "@/lib/consts";
import { put } from "@vercel/blob";
// import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
// import { authOptions } from "../auth/[...nextauth]/route";
// import { getUserByEmail } from "@/lib/db/user";

export const runtime = "edge";

export async function POST(req: Request) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return new Response(
      "Missing BLOB_READ_WRITE_TOKEN. Don't forget to add that to your .env file.",
      {
        status: 401,
      },
    );
  }

  const file = req.body || "";
  const filename = req.headers.get("x-vercel-filename") || "file.txt";
  const contentType = req.headers.get("content-type") || "text/plain";
  const fileType = `.${contentType.split("/")[1]}`;

  // construct final filename based on content-type if not provided
  const finalName = filename.includes(fileType)
    ? filename
    : `${filename}${fileType}`;
  const blob = await put(finalName, file, {
    contentType,
    access: "public",
  });
  console.log(blob.url, blob.size);

  // if (
  //   blob &&
  //   Number(blob.size) > Account_Plans[plan].image_upload_size * 1024 * 1024
  // ) {
  //   return new Response(
  //     "You have exceeded the maximum size of uploads, please upgrade your plan.",
  //     {
  //       status: 429,
  //     },
  //   );
  // }

  return NextResponse.json(blob);
}
