import React from "react";
import { Box, Heading } from "native-base";
import { useNavigation } from "@react-navigation/native";

import { THEME } from "@theme/theme";

import { Button } from "@components/Button";
import { LayoutDefault } from "@components/LayoutDefault";

export function VerifyToken() {
  const navigation = useNavigation();

  const handleNextPage = () => navigation.navigate("SignIn");

  return (
    <LayoutDefault
      bg="blue.700"
      icon="chevron-left"
      functionIcon={() => navigation.goBack()}
      justifyContent="space-between"
    >
      <Box px={4} width="full" alignItems="center" justifyContent="center">
        <Heading
          size={"sm"}
          mb={8}
          textAlign="center"
          color={THEME.colors.white}
        >
          Lorem ipsum is placeholder text commonly used in the graphic, print,
          and publishing industries for previewing layouts and visual mockups.
        </Heading>

        <Heading
          size={"sm"}
          mb={8}
          textAlign="center"
          color={THEME.colors.white}
        >
          Lorem ipsum is placeholder text commonly used in the graphic, print,
          and publishing industries for previewing layouts and visual mockups.
          Lorem ipsum is placeholder text commonly used in the graphic, print,
          and publishing industries for previewing layouts and visual mockups.
        </Heading>

        <Heading size={"sm"} textAlign="center" color={THEME.colors.white}>
          Lorem ipsum is placeholder text commonly used in the graphic, print,
          and publishing industries for previewing layouts and visual mockups.
        </Heading>
      </Box>

      <Box w="full" px={4} mb={8}>
        <Button
          title="Reenviar Código"
          h={52}
          w="full"
          mb={4}
          onPress={() => {}}
        />

        <Button title="Enviar" h={52} w="full" onPress={handleNextPage} />
      </Box>
    </LayoutDefault>
  );
}
