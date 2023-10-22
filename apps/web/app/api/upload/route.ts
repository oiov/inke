import { Account_Plans } from "@/lib/consts";
import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../auth/[...nextauth]/route";
// import { getUserByEmail } from "@/lib/db/user";
import COS from "cos-nodejs-sdk-v5";
import { Readable } from "stream";

const uploadFile = (stream: Readable, filename: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: "gcloud-1303456836",
      Region: "ap-chengdu",
      Key: "inke/" + filename,
      Body: stream,
    };

    cos.putObject(params, (err: any, data: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

export const runtime = "nodejs";

var cos = new COS({
  SecretId: process.env.TencentSecretID || "",
  SecretKey: process.env.TencentSecretKey || "",
});

export async function POST(req: Request) {
  // if (!process.env.BLOB_READ_WRITE_TOKEN) {
  //   return new Response(
  //     "Missing BLOB_READ_WRITE_TOKEN. Don't forget to add that to your .env file.",
  //     {
  //       status: 401,
  //     },
  //   );
  // }

  const file = req.body || "";
  const filename = req.headers.get("x-vercel-filename") || "file.txt";
  const contentType = req.headers.get("content-type") || "text/plain";
  const fileType = `.${contentType.split("/")[1]}`;

  // construct final filename based on content-type if not provided
  const finalName = filename.includes(fileType)
    ? filename
    : `${filename}${fileType}`;

  const fileStream = Readable.from(file as any);

  const res = await uploadFile(fileStream, finalName);
  // console.log("上传结果", res, res.Location);

  if (res && res.statusCode === 200) {
    return NextResponse.json({ url: "https://" + res.Location });
  }

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
}
