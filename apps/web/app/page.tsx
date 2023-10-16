import Nav from "@/ui/layout/nav";
import { EditorGuide, Welcome } from "./guide";
import Footer from "@/ui/layout/footer";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Page() {
  const session = await getServerSession(authOptions);
  return (
    <div className="mt-16 flex flex-col items-center sm:mx-6 sm:px-3">
      {/* @ts-expect-error Server Component */}
      <Nav />
      <Welcome />
      <EditorGuide session={session} />
      <Footer />
    </div>
  );
}
