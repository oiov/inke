"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";
import { isEmail } from "@/lib/utils";
import { Github, Google, LoadingDots } from "../shared/icons";
import { usePathname } from "next/navigation";

export default function EmailButton() {
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSendSuccess, setIsSendSuccess] = useState(false);
  const [signInGithubClicked, setSignInGithubClicked] = useState(false);
  const [signInGoogleClicked, setSignInGoogleClicked] = useState(false);

  const handleSubmit = async () => {
    if (email === "") {
      toast("Empty email", {
        icon: "😅",
      });
      return;
    }
    if (!isEmail(email)) {
      toast("Invalid email format", {
        icon: "😅",
      });
      return;
    }

    setIsSendSuccess(false);
    setLoading(true);

    const sign_req = await signIn("email", {
      email: email,
      callbackUrl: pathname,
      redirect: false,
    });
    setTimeout(() => {
      setLoading(false);
    }, 20000);
    if (sign_req?.ok) {
      setLoading(false);
      setIsSendSuccess(true);
    } else if (sign_req?.error) {
      toast("Sending failed, please try again", {
        icon: "😅",
      });
      setLoading(false);
      setIsSendSuccess(false);
    }
  };
  const handleKeydown = (key: string) => {
    if (key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <>
      <Toaster />
      {/* <input
        className="mb-4 rounded-md border border-slate-200 px-3 py-3 shadow-inner"
        type="text"
        placeholder="Enter your email"
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={(e) => handleKeydown(e.key)}
        disabled={true}
      />
      <button
        disabled={loading}
        onClick={handleSubmit}
        className={`
        ${
          loading
            ? "border-gray-300 bg-gray-200"
            : ` ${
                isSendSuccess
                  ? "border-blue-500 bg-blue-500 hover:text-blue-500"
                  : "border-black bg-black hover:text-black"
              } hover:bg-gray-100`
        } 
        h-10 w-full rounded-md border px-2 py-1 text-sm text-slate-100 transition-all `}
      >
        {loading ? (
          <LoadingDots color="gray" />
        ) : (
          <span className="font-medium">
            {isSendSuccess && !loading
              ? "Successfully sent! please check email"
              : "Sign in with email"}
          </span>
        )}
      </button>

      <div className="my-3 flex items-center justify-center">
        <span className="w-full border border-b-0"></span>
        <span className="px-3 text-gray-400">or</span>
        <span className="w-full border border-b-0"></span>
      </div> */}

{/*       <button
        disabled={signInGithubClicked}
        className={`${
          signInGithubClicked
            ? "cursor-not-allowed bg-gray-100"
            : "border text-black hover:bg-gray-50"
        } nice-border flex h-10 w-full items-center justify-center space-x-3 rounded-md border text-sm shadow transition-all duration-75 hover:border-gray-800 focus:outline-none`}
        onClick={() => {
          setSignInGithubClicked(true);
          signIn("github", { callbackUrl: pathname, redirect: false });
        }}
      >
        {signInGithubClicked ? (
          <LoadingDots color="#808080" />
        ) : (
          <>
            <Github className="h-5 w-5" />
            <p>Sign in with Github</p>
          </>
        )}
      </button> */}
      <button
        disabled={signInGoogleClicked}
        className={`${
          signInGoogleClicked
            ? "cursor-not-allowed bg-gray-100"
            : "border text-black hover:bg-gray-50"
        } nice-border flex h-10 w-full items-center justify-center space-x-3 rounded-md border text-sm shadow transition-all duration-75 hover:border-gray-800 focus:outline-none`}
        onClick={() => {
          setSignInGoogleClicked(true);
          signIn("google", { callbackUrl: pathname, redirect: false });
        }}
      >
        {signInGoogleClicked ? (
          <LoadingDots color="#808080" />
        ) : (
          <>
            <Google className="h-5 w-5" />
            <p>Sign in with Google</p>
          </>
        )}
      </button>
    </>
  );
}
