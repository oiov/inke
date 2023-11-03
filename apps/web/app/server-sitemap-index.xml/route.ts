import { getServerSideSitemapIndex } from "next-sitemap";

export async function GET(request: Request) {
  // Method to source urls from cms
  // const urls = await fetch('https//example.com/api')

  return getServerSideSitemapIndex([
    "https://inke.app/publish.xml",
    "https://inke.app/pricing.xml",
  ]);
}
