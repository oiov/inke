import "@/styles/globals.css";

import { Metadata } from "next";
import { ReactNode } from "react";
import Providers from "./providers";
import Script from "next/script";

const title = "Inke – Simple, Markdown-like and AI-Powered editor";
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
    creator: "@",
  },
  metadataBase: new URL("https://inke.app"),
  themeColor: "#ffffff",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          async
          id="googletagmanager-a"
          src="https://www.googletagmanager.com/gtag/js?id=G-YK9MQYLLLR"
        ></Script>
        <Script
          async
          id="googletagmanager-b"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YK9MQYLLLR');
              `,
          }}
        ></Script>
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
