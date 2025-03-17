"use client"

import Login from "@/components/login";
import { Flex, Spinner } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push(session?.user.isOnboarded ? '/dashboard' : '/onboard');
    }
  }, [status, session, router]);

  // Remove console.log in production
  if (process.env.NODE_ENV !== 'production') {
    console.log('Session:', session, 'Status:', status);
  }

  if (status === "loading") {
    return (
      <Flex height="100vh" bg="gray.100" alignItems="center" justifyContent="center">
        <Spinner color="blue.500" size="xl" thickness="4px" />
      </Flex>
    );
  }

  return <Login />;
}
