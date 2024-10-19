"use client"

import Login from "@/components/login";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter()

  if (session) {
    router.push('/auth')
  }

  return <Login />;
}