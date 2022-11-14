import React from "react";
import { Box, Heading } from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";

import { ButtonFull } from "@components/ButtonFull";
import { LayoutDefault } from "@components/LayoutDefault";

interface Params {
  name: string;
  email: string;
}

export function AcceptTerms() {
  const navigation = useNavigation();

  const route = useRoute();
  const { name, email } = route.params as Params;

  const handleNextPage = () => navigation.navigate("Choose", { name, email });

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
