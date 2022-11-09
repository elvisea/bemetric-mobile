import React from "react";
import { Box, Heading } from "native-base";
import { useNavigation } from "@react-navigation/native";

import { ButtonFull } from "@components/ButtonFull";
import { LayoutDefault } from "@components/LayoutDefault";

export function AcceptTerms() {
  const navigation = useNavigation();

  const handleNextPage = () => navigation.navigate("Choose");

  return (
    <LayoutDefault
      bg="blue.700"
      icon="chevron-left"
      functionIcon={() => navigation.goBack()}
      justifyContent="flex-start"
    >
      <Box
        px={8}
        flex={1}
        width="full"
        alignItems="center"
        justifyContent="center"
      >
        <Heading color="white">Accept Terms</Heading>
      </Box>
      <ButtonFull title="Avançar" onPress={handleNextPage} />
    </LayoutDefault>
  );
}
