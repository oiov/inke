/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.producthunt.com",
      },
    ],
    domains: [
      "lh3.googleusercontent.com",
      "avatars.githubusercontent.com",
      "vercel.com",
      "api.dicebear.com",
      "api.producthunt.com",
      "gcloud-1303456836.cos.ap-chengdu.myqcloud.com",
      "img.shields.io",
    ],
  },
  redirects: async () => {
    return [
      {
        source: "/document",
        destination:
          "https://inke.app/publish/0e1be533-ae66-4ffa-9725-bd6b84899e78",
        permanent: true,
      },
      {
        source: "/collaboration",
        destination:
          "https://inke.app/publish/5f099bdd-b2a1-4f88-bbcb-eb2292447d2c",
        permanent: true,
      },
      {
        source: "/shortcuts",
        destination:
          "https://inke.app/publish/b842b60f-29be-49b5-9c7e-44860c8d2df3",
        permanent: true,
      },
    ];
  },
  productionBrowserSourceMaps: true,
};

module.exports = nextConfig;
