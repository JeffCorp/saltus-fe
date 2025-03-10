import { Spinner } from "@chakra-ui/react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <Spinner />
    </div>
  )
}

export default LoadingSpinner;