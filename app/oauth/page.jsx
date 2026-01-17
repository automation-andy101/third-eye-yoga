"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAuth } from "/context/authContext";

const OAuthPage = () => {
  const router = useRouter();
  const { refreshAuth } = useAuth();

  useEffect(() => {
    const finishLogin = async () => {
      await refreshAuth();
      toast.success("Logged in with Google");
      router.push("/");
    };

    finishLogin();
  }, []);

  return <p className="text-center mt-20">Signing you in…</p>;
};

export default OAuthPage;
