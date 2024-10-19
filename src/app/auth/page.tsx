'use client'

import { Flex, Spinner } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const AuthPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter()
  console.log(session, status);

  if (status === 'authenticated') {
    if (session?.user.isOnboarded) {
      router.push('/dashboard')
    } else {
      router.push('/onboard')
    }
  }

  return <Flex height="100vh" bg="gray.100" alignItems="center" justifyContent="center">
    <Spinner color="blue.500" />
  </Flex>
}

export default AuthPage;