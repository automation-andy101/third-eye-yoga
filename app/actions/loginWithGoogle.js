"use client";

import { account } from "@/config/appwriteClient";

export const loginWithGoogle = async () => {
  await account.createOAuth2Session(
    "google",
    `${window.location.origin}/oauth`,
    `${window.location.origin}/login`
  );
};
