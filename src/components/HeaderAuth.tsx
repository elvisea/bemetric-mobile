import React from "react";
import { CaretLeft } from "phosphor-react-native";
import { Box, IconButton } from "native-base";
import { useNavigation } from "@react-navigation/native";

export function HeaderAuth() {
  const navigation = useNavigation();

  const handleGoBack = () => navigation.goBack();

  return (
    <Box
      w="full"
      h={76}
      px={8}
      bg="blue.700"
      marginTop={8}
      alignItems="center"
      justifyContent="center"
    >
      <IconButton icon={<CaretLeft color="white" />} onPress={handleGoBack} />
    </Box>
  );
}
