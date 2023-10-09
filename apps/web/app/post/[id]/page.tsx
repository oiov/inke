import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import EditorWrapper from "./wrapper";

// export async function generateMetadata({ params, searchParams }): Metadata {
//   const data = await getDetail(params.slug);
//   return { title: data.title };
// }

export default async function Page({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  return <EditorWrapper id={params.id} session={session} />;
}
