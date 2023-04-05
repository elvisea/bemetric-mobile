import React, { ReactNode } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { IconButton, Text, VStack } from "native-base";

import { Container } from "./styles";
import { THEME } from "@theme/theme";
import { TouchableOpacityProps } from "react-native";

interface IMessageProps extends TouchableOpacityProps {
  icon: ReactNode;
  exclude: () => void;
  date: string;
  color: string;
  title: string;
  description: string;
}

function Message({
  icon,
  exclude,
  date,
  color,
  title,
  description,
  ...rest
}: IMessageProps) {
  const { colors, fonts } = THEME;
  return (
    <Container activeOpacity={0.7} {...rest}>
      <VStack
        alignItems="center"
        justifyContent="center"
        borderRadius={2}
        px={2}
        bg={color}
      >
        {icon}
      </VStack>

      <VStack w="80%" p={3}>
        <Text
          fontFamily={fonts.Roboto_400Regular}
          fontSize="14px"
          color={color}
        >
          {title}
        </Text>
        <Text fontFamily={fonts.Roboto_400Regular} fontSize="12px" color="#333">
          {date}
        </Text>
        <Text
          fontFamily={fonts.Roboto_400Regular}
          fontSize="12px"
          color="#333"
          mt={2}
        >
          {description}
        </Text>
      </VStack>

      <VStack alignItems="center" justifyContent="flex-start">
        <IconButton
          onPress={exclude}
          icon={<FontAwesome size={22} name="trash" color={colors.blue[700]} />}
        />
      </VStack>
    </Container>
  );
}

export { Message };
