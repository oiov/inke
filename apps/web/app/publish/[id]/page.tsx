import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Wrapper from "./wrapper";
import Nav from "@/ui/layout/nav";
import Footer from "@/ui/layout/footer";

// export async function generateMetadata({ params, searchParams }): Metadata {
//   const data = await getDetail(params.slug);
//   return { title: data.title };
// }

export default async function Page({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  return (
    <div className="mt-16 flex flex-col items-center sm:mx-6 sm:px-3">
      {/* @ts-expect-error Server Component */}
      <Nav />
      <Wrapper id={params.id} session={session} />
      <Footer />
    </div>
  );
}
