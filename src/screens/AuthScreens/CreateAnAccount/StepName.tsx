import React from "react";
import { Box, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";

import { Input } from "../../../components/Input";
import { ButtonFull } from "../../../components/ButtonFull";
// import { HeaderAuth } from '../../../components/HeaderAuth';

export default function StepName() {
  const navigation = useNavigation();

  const handleNextPage = () => navigation.navigate("stepEmail");

  return (
    <VStack
      w="full"
      bg="blue.700"
      flex={1}
      alignItems="center"
      justifyContent="space-between"
    >
      {/* <HeaderAuth /> */}

      <Box width="full" px={8} alignItems="center">
        <Input placeholder="Nome" />
      </Box>

      <ButtonFull title="Avançar" onPress={handleNextPage} />
    </VStack>
  );
}
