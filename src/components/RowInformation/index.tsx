import React from "react";
import { HStack, Text, VStack } from "native-base";

import { RFValue } from "react-native-responsive-fontsize";

import { THEME } from "@theme/theme";

type RowInformationProps = {
  mt?: number;
  mb?: number;

  primaryTitle: string;
  secondaryTitle?: string;

  primaryDescription: string;
  secondaryDescription?: string;
};

export function RowInformation({
  mt = 0,
  mb = 0,
  primaryTitle,
  secondaryTitle,
  primaryDescription,
  secondaryDescription,
}: RowInformationProps) {
  return (
    <HStack
      w="full"
      alignItems="center"
      justifyContent="space-between"
      mt={`${RFValue(mt)}px`}
      mb={`${RFValue(mb)}px`}
      px={`${RFValue(16)}px`}
    >
      <VStack w="50%">
        <Text
          color={THEME.colors.blue[700]}
          fontSize={`${RFValue(12)}px`}
          fontFamily={THEME.fonts.Roboto_400Regular}
          isTruncated
        >
          {primaryTitle}
        </Text>

        <Text
          color={THEME.colors.dark}
          fontSize={`${RFValue(13.5)}px`}
          fontFamily={THEME.fonts.Roboto_400Regular}
          isTruncated
        >
          {primaryDescription}
        </Text>
      </VStack>

      {secondaryTitle && (
        <VStack w="50%">
          <Text
            color={THEME.colors.blue[700]}
            fontSize={`${RFValue(12)}px`}
            fontFamily={THEME.fonts.Roboto_400Regular}
            isTruncated
          >
            {secondaryTitle}
          </Text>

          <Text
            color={THEME.colors.dark}
            fontSize={`${RFValue(13.5)}px`}
            fontFamily={THEME.fonts.Roboto_400Regular}
            isTruncated
          >
            {secondaryDescription}
          </Text>
        </VStack>
      )}
    </HStack>
  );
}
