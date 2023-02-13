import React, { ReactNode } from "react";
import { Box, HStack, IBoxProps, Text } from "native-base";

interface IProps extends IBoxProps {
  icon: ReactNode;
  title: string;
  total: number;
  hours: number;
  on: number;
  off: number;
}

function Permanencia({ icon, title, total, hours, on, off, ...rest }: IProps) {
  return (
    <Box
      mb="16px"
      bg="white"
      p="16px"
      borderRadius="8px"
      borderColor="#00000029"
      borderWidth={1}
      {...rest}
    >
      <HStack mb="8px" alignItems="center">
        <Box
          h="30px"
          w="30px"
          bg="#17C3C4"
          borderRadius="4px"
          alignItems="center"
          justifyContent="center"
        >
          {icon}
        </Box>
        <Text fontFamily="Montserrat_400Regular" ml="16px">
          {title}
        </Text>
      </HStack>

      <HStack
        h="36px"
        alignItems="center"
        w="full"
        justifyContent="space-between"
      >
        <Text
          fontFamily="Montserrat_400Regular"
          fontSize="13px"
          color="#878787"
        >
          Total de horas
        </Text>
        <Text
          fontFamily="Montserrat_400Regular"
          color="blue.700"
          fontSize="18px"
        >
          {total === 1 ? `${total} hora` : `${total} horas`}
        </Text>
      </HStack>

      <HStack
        h="36px"
        alignItems="center"
        w="full"
        justifyContent="space-between"
      >
        <Text
          fontFamily="Montserrat_400Regular"
          fontSize="13px"
          color="#878787"
        >
          Horas trabalhadas
        </Text>
        <Text
          fontFamily="Montserrat_400Regular"
          color="blue.700"
          fontSize="18px"
        >
          {hours === 1 ? `${hours} hora` : `${hours} horas`}
        </Text>
      </HStack>

      <HStack
        h="36px"
        alignItems="center"
        w="full"
        justifyContent="space-between"
      >
        <Text
          fontFamily="Montserrat_400Regular"
          fontSize="13px"
          color="#878787"
        >
          Parado ignição ligada
        </Text>
        <Text
          fontFamily="Montserrat_400Regular"
          color="blue.700"
          fontSize="18px"
        >
          {on === 1 ? `${on} hora` : `${on} horas`}
        </Text>
      </HStack>

      <HStack
        h="36px"
        alignItems="center"
        w="full"
        justifyContent="space-between"
      >
        <Text
          fontFamily="Montserrat_400Regular"
          fontSize="13px"
          color="#878787"
        >
          Parado ignição desligada
        </Text>
        <Text
          fontFamily="Montserrat_400Regular"
          color="blue.700"
          fontSize="18px"
        >
          {off === 1 ? `${off} hora` : `${off} horas`}
        </Text>
      </HStack>
    </Box>
  );
}

export { Permanencia };