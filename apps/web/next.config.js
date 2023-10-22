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
    ];
  },
  productionBrowserSourceMaps: true,
};

module.exports = nextConfig;
