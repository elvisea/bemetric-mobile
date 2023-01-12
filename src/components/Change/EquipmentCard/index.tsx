import React, { ReactNode } from "react";
import { Text, VStack } from "native-base";

import { Container } from "./styles";
import { TouchableProps } from "react-native-svg";

type Props = TouchableProps & {
  icon: ReactNode;
  title: string;
  description: string;
};

export function EquipmentCard({ icon, title, description, ...rest }: Props) {
  return (
    <Container activeOpacity={0.5} {...rest}>
      {icon}
      <VStack
        ml="24px"
        h="full"
        alignItems="flex-start"
        justifyContent="center"
      >
        <Text
          color="#686868"
          fontSize="16px"
          fontFamily="Montserrat_400Regular"
          isTruncated
        >
          {title}
        </Text>

        <Text
          color="#686868"
          fontSize="10px"
          fontFamily="Montserrat_400Regular"
          isTruncated
        >
          {description}
        </Text>
      </VStack>
    </Container>
  );
}
