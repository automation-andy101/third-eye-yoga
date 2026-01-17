"use client";

import { account } from "@/config/appwriteClient";

export const logout = async () => {
  try {
    await account.deleteSession("current");
  } catch {
    // OAuth users may already have expired sessions — safe to ignore
  }
};
