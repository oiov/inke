import Providers from "@/app/providers";
import "@/styles/globals.css";

import { Metadata } from "next";
import { ReactNode } from "react";
// import Providers from "./providers";

const title = "Inke | Public Note";
const description =
  "Inke is a Notion-style WYSIWYG editor with AI-powered autocompletions. Built with Tiptap, OpenAI, and Vercel AI SDK.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
  },
  twitter: {
    title,
    description,
    card: "summary_large_image",
    creator: "@yesmorecc",
  },
  metadataBase: new URL("https://inke.app"),
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Providers>{children}</Providers>
    </>
  );
}
