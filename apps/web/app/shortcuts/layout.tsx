import Providers from "@/app/providers";
import "@/styles/globals.css";

import { Metadata } from "next";
import { ReactNode } from "react";

const title = "Inke | Keyboard shortcuts";
const description =
  "Inke is a WYSIWYG editor with AI-powered autocompletions. Built with Tiptap, OpenAI, and Vercel AI SDK.";

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
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Providers>{children}</Providers>
    </>
  );
}
