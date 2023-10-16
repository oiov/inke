"use client";

import { createContext } from "react";

export const NovelContext = createContext<{
  completionApi: string;
  plan: string;
}>({
  completionApi: "/api/generate",
  plan: "5",
});
