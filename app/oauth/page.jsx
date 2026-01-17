"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAuth } from "@/context/authContext";

export default function OAuthPage() {
    const router = useRouter();
    const { refreshAuth } = useAuth();
    const hasRun = useRef(false);

    useEffect(() => {
        if (hasRun.current) return;
        
        hasRun.current = true;

        const finishLogin = async () => {
            await refreshAuth();
            toast.success("Logged in with Google");
            router.replace("/");
        };

    finishLogin();
    }, []);

  return <p className="text-center mt-20">Signing you in…</p>;
}
