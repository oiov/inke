"use client";

import { Session } from "next-auth";
import Giscus from "@giscus/react";

export default function Wrapper({ session }: { session: Session | null }) {
  return (
    <>
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-lg font-bold"> Privacy Policy</h2>
        If you choose to use the services I provide, it means you agree to the
        collection and use of information related to this policy. The personal
        information I collect is used to provide and improve the services.
        Unless otherwise stated in this privacy policy, I will not use or share
        your information with anyone else. Unless otherwise specified in this
        privacy policy, the terms used in this privacy policy have the same
        meaning as our terms and conditions, which can be accessed in Inke.
        <h2 className="mt-2 text-lg font-bold">
          Information Collection and Use
        </h2>
        In order to provide a better experience, when using our services, I may
        ask you to provide certain personal identity information, including but
        not limited to email, avatar. The information I request will be retained
        on your device and will not be collected by me in any way.
        <h2 className="mt-2 text-lg font-bold">Other</h2>
        It is strictly prohibited to upload notes with illegal or pornographic
        content. We will take strict measures to permanently ban violators.
        <h2 className="mt-2 text-lg font-bold">Contact Us </h2>
        If you have any questions or suggestions regarding my privacy policy,
        please feel free to contact me at{" "}
        <a className="text-blue-400" href="/feedback" target="_blank">
          feedback
        </a>
        .
      </div>
    </>
  );
}
