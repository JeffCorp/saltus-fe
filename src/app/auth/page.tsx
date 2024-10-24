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
      if (session?.user.isOnboarded) {
        router.push('/dashboard')
      } else {
        router.push('/onboard')
      }
    }
  }, [status, session, router]);

  console.log(session, status);

  return <Flex height="100vh" bg="gray.100" alignItems="center" justifyContent="center">
    <Spinner color="blue.500" />
  </Flex>
}

export default AuthPage;
