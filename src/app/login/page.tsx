"use client"

import Login from "@/components/login";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/auth');
    }
  }, [session, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return <Login />;
}
