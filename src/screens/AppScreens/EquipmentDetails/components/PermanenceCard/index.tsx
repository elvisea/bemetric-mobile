import React, { ReactNode } from "react";
import { Box, HStack, IBoxProps, Text } from "native-base";
import { RFValue } from "react-native-responsive-fontsize";

import { THEME } from "@theme/theme";

interface IProps extends IBoxProps {
  icon: ReactNode;
  title: string;
  total: string;
  hours: string;
  on: string;
  off: string;
}

function PermanenceCard({
  icon,
  title,
  total,
  hours,
  on,
  off,
  ...rest
}: IProps) {
  const rows = Object.values({ total, hours, on, off });

  const titles = [
    "Total de horas",
    "Horas trabalhadas",
    "Parado ignição ligada",
    "Parado ignição desligada",
  ];

  return (
    <Box
      mb={`${RFValue(16)}px`}
      bg="white"
      p={`${RFValue(16)}px`}
      borderRadius={`${RFValue(8)}px`}
      borderColor="#00000029"
      borderWidth={1}
      {...rest}
    >
      <HStack mb={`${RFValue(8)}px`} alignItems="center">
        <Box
          h={`${RFValue(30)}px`}
          w={`${RFValue(30)}px`}
          bg={THEME.colors.cyan[300]}
          borderRadius={`${RFValue(4)}px`}
          alignItems="center"
          justifyContent="center"
        >
          {icon}
        </Box>
        <Text
          fontFamily="Roboto_400Regular"
          color="#373435"
          fontSize={`${RFValue(14)}px`}
          ml={`${RFValue(16)}px`}
        >
          {title}
        </Text>
      </HStack>

      {rows.map((row, index) => (
        <HStack
          key={`${index}-${row}`}
          h={`${RFValue(30)}px`}
          alignItems="center"
          w="full"
          justifyContent="space-between"
        >
          <Text
            fontFamily="Roboto_400Regular"
            fontSize={`${RFValue(14)}px`}
            color="#717171"
          >
            {titles[index]}
          </Text>
          <Text
            fontFamily="Roboto_400Regular"
            color="blue.700"
            fontSize={`${RFValue(16)}px`}
          >
            {row}
          </Text>
        </HStack>
      ))}
    </Box>
  );
}

export { PermanenceCard };
