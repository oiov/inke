import Nav from "@/ui/layout/nav";
import { EditorGuide, Welcome } from "./guide";
import Footer from "@/ui/layout/footer";

export default async function Page() {
  return (
    <div className="mt-16 flex flex-col items-center sm:mx-6 sm:px-3">
      {/* @ts-expect-error Server Component */}
      <Nav />
      <Welcome />
      <EditorGuide />
      <Footer />
    </div>
  );
}
