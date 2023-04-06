import React from "react";
import { Spinner, VStack } from "native-base";

interface ILoadingSpinner {
  color: string;
}

function LoadingSpinner({ color }: ILoadingSpinner) {
  return (
    <VStack flex={1} alignItems="center" justifyContent="center">
      <Spinner size={30} color={color} />
    </VStack>
  );
}

export { LoadingSpinner };
