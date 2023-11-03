import Providers from "@/app/providers";
import { siteConfig } from "@/config/site";
import "@/styles/globals.css";

import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Setting | Inke",
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: siteConfig.authors,
  creator: siteConfig.creator,
  themeColor: siteConfig.themeColor,
  icons: siteConfig.icons,
  metadataBase: siteConfig.metadataBase,
  openGraph: siteConfig.openGraph,
  twitter: siteConfig.twitter,
  manifest: siteConfig.manifest,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Providers>{children}</Providers>
    </>
  );
}
