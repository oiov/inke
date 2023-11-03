/**
 * @type {import('next-sitemap').IConfig}
 * @see https://github.com/iamvishnusankar/next-sitemap#readme
 */
const fs = require("fs");
const path = require("path");
module.exports = {
  siteUrl: "https://inke.app",
  changefreq: "daily",
  priority: 0.7,
  exclude: ["/server-sitemap-index.xml"],
  generateRobotsTxt: true,
  sitemapSize: 5000, // 站点超过5000个，拆分到多个文件
  robotsTxtOptions: {
    additionalSitemaps: ["https://inke.app/server-sitemap-index.xml"],
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "AhrefsBot",
        disallow: ["/"],
      },
      {
        userAgent: "SemrushBot",
        disallow: ["/"],
      },
      {
        userAgent: "MJ12bot",
        disallow: ["/"],
      },
      {
        userAgent: "DotBot",
        disallow: ["/"],
      },
    ],
  },
};
