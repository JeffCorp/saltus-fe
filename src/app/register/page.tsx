"use client"

import Register from "@/components/register";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const { data: session } = useSession();
  const router = useRouter()

  if (session) {
    router.push('/dashboard')
  }

  return <Register />;
}