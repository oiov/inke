/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "avatars.githubusercontent.com",
      "vercel.com",
      "api.dicebear.com",
    ],
  },
  redirects: async () => {
    return [
      {
        source: "/github",
        destination: "https://github.com/yesmore/inke",
        permanent: true,
      },
      {
        source: "/sdk",
        destination: "https://www.npmjs.com/package/inke",
        permanent: true,
      },
      // {
      //   source: "/discord",
      //   destination: "https://discord.gg/utuNdj35vr",
      //   permanent: true,
      // },
    ];
  },
  productionBrowserSourceMaps: true,
};

module.exports = nextConfig;
