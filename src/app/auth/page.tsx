'use client'

import { Flex, Spinner } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from 'react';

const AuthPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter()

  useEffect(() => {
    if (status === 'authenticated') {
      console.log("session", session)
      // router.push(session?.user.isOnboarded ? '/dashboard' : '/onboard');
    } else if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, session, router]);

  // Remove console.log in production
  if (process.env.NODE_ENV !== 'production') {
    console.log('Session:', session, 'Status:', status);
  }

  return (
    <Flex height="100vh" bg="gray.100" alignItems="center" justifyContent="center">
      <Spinner color="blue.500" size="xl" thickness="4px" />
    </Flex>
  );
}

export default AuthPage;
