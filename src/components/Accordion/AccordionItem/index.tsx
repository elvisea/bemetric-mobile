import React from "react";
import { Box, Text, VStack } from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { RectButtonProps } from "react-native-gesture-handler";

import { THEME } from "@theme/theme";

import { Button, Content, Description, Title } from "./styles";

interface Props extends RectButtonProps {
  title: string;
  velocity: number;
  status: string;
}

export function AccordionItem({ title, velocity, status, ...rest }: Props) {
  return (
    <Content>
      <Button {...rest}>
        <Box flexDirection="row" alignItems="center" justifyContent="center">
          <FontAwesome size={30} color={THEME.colors.blue[700]} name="gears" />

          <Box
            ml={`${RFValue(12)}px`}
            alignItems="flex-start"
            justifyContent="center"
          >
            <Title>{title}</Title>

            <Description>{status}</Description>
          </Box>
        </Box>

        <VStack
          w={`${RFValue(48)}px`}
          h={`${RFValue(48)}px`}
          borderWidth={3}
          borderRadius={`${RFValue(24)}px`}
          borderColor="#e2e2e2"
          alignItems="center"
          justifyContent="center"
        >
          <Text
            fontSize={`${RFValue(14)}px`}
            fontFamily={THEME.fonts.Roboto_700Bold}
            color="#878787"
          >
            {velocity}
          </Text>
          <Text
            fontSize={`${RFValue(8)}px`}
            fontFamily={THEME.fonts.Roboto_400Regular}
            marginTop={-1}
            color="#888888"
          >
            km/h
          </Text>
        </VStack>
      </Button>
    </Content>
  );
}
