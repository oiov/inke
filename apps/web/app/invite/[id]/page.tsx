import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Nav from "@/ui/layout/nav";
import Wrapper from "./wrapper";
import Footer from "@/ui/layout/footer";

export default async function Page({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  return (
    <>
      <div className="pt-16">
        {/* @ts-expect-error Server Component */}
        <Nav />
        <Wrapper session={session} id={params.id} />
        <Footer />
      </div>
    </>
  );
}
