import React, { ReactNode } from "react";
import { Box, HStack, IBoxProps, Text } from "native-base";
import { RFValue } from "react-native-responsive-fontsize";

interface IProps extends IBoxProps {
  icon: ReactNode;
  title: string;
  total: string;
  hours: string;
  on: string;
  off: string;
}

function Permanencia({ icon, title, total, hours, on, off, ...rest }: IProps) {
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
          bg="#17C3C4"
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

      <HStack
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
          Total de horas
        </Text>
        <Text
          fontFamily="Roboto_400Regular"
          color="blue.700"
          fontSize={`${RFValue(16)}px`}
        >
          {total}
        </Text>
      </HStack>

      <HStack
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
          Horas trabalhadas
        </Text>
        <Text
          fontFamily="Roboto_400Regular"
          color="blue.700"
          fontSize={`${RFValue(16)}px`}
        >
          {hours}
        </Text>
      </HStack>

      <HStack
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
          Parado ignição ligada
        </Text>
        <Text
          fontFamily="Roboto_400Regular"
          color="blue.700"
          fontSize={`${RFValue(16)}px`}
        >
          {on}
        </Text>
      </HStack>

      <HStack
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
          Parado ignição desligada
        </Text>
        <Text
          fontFamily="Roboto_400Regular"
          color="blue.700"
          fontSize={`${RFValue(16)}px`}
        >
          {off}
        </Text>
      </HStack>
    </Box>
  );
}

export { Permanencia };
