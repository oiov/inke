/* eslint-disable @next/next/no-img-element */
// import Pill from "@/components/shared/icons/pill";
import { ImageResponse } from "next/server";

export const runtime = "edge";
export const alt = "";
export const contentType = "image/png";

export default async function OG() {
  // const sfPro = await fetch(
  //   new URL("../styles/fonts/SF-Pro-Display-Medium.otf", import.meta.url),
  // ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          backgroundImage:
            "linear-gradient(to bottom right, #E0E7FF 25%, #ffffff 50%, #CFFAFE 75%)",
        }}
      >
        {/* <Pill className="h-5 w-5" /> */}
        <h1
          style={{
            fontSize: "100px",
            fontFamily: "SF Pro",
            background:
              "linear-gradient(to bottom right, #000000 21.66%, #78716c 86.47%)",
            backgroundClip: "text",
            color: "transparent",
            lineHeight: "5rem",
            letterSpacing: "-0.02em",
          }}
        >
          INKE
        </h1>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      // fonts: [
      //   {
      //     name: "SF Pro",
      //     data: sfPro,
      //   },
      // ],
    },
  );
}
