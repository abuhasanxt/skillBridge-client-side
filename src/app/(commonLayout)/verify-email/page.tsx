"use client";

import { Suspense, useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useSearchParams, useRouter } from "next/navigation";

function VerifyContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [message, setMessage] = useState("Verifying email...");

  useEffect(() => {
    if (!token) {
      setMessage("❌ Invalid verification link");
      return;
    }

    const verify = async () => {
      try {
        await authClient.verifyEmail({
          query: { token },
        });

        setMessage("✅ Email verified successfully!");

        setTimeout(() => router.push("/"), 2000);
      } catch (error) {
        console.error(error);
        setMessage("❌ Verification failed or link expired.");
      }
    };

    verify();
  }, [token, router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="rounded-lg border p-8 shadow-md">
        <h1 className="text-xl font-semibold">{message}</h1>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div>Verifying email...</div>}>
      <VerifyContent />
    </Suspense>
  );
}