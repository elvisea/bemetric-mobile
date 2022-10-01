import React, { useState } from 'react';
import { Box, VStack, Select, FormControl, Heading } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import { THEME } from '@theme/theme';

import { Header } from '@components/Header';
import { ButtonFull } from '@components/ButtonFull';
import { HeaderWelcome } from '@components/HeaderWelcome';

export default function Welcome() {
  const navigation = useNavigation();

  const [service, setService] = useState('');

  const handleNextPage = () => navigation.navigate('stepEmail');

  return (
    <VStack
      w="full"
      bg="blue.700"
      flex={1}
      alignItems="center"
      justifyContent="flex-start"
    >
      <Header />
      <HeaderWelcome name="Paulo Castro" />
      <Box
        px={8}
        flex={1}
        width="full"
        alignItems="center"
        background={THEME.colors.shape}
      >
        <FormControl w="full" isInvalid style={{ marginTop: 32 }}>
          <Heading
            fontSize="xs"
            color="blue.700"
            fontFamily={THEME.fonts.Montserrat_300Light}
          >
            Cliente
          </Heading>

          <Select
            mt="1"
            minWidth="100%"
            placeholder="Selecione um Cliente"
            accessibilityLabel="Choose Consumer"
            fontFamily={THEME.fonts.Montserrat_400Regular}
            color={THEME.colors.dark}
            dropdownIcon={
              <Feather
                name="chevron-down"
                size={24}
                color={THEME.colors.blue[700]}
              />
            }
            borderTopWidth={0}
            borderLeftWidth={0}
            borderRightWidth={0}
            borderRadius={0}
            borderBottomColor="blue.700"
          >
            <Select.Item label="UX Research" value="ux" />
            <Select.Item label="Web Development" value="web" />
            <Select.Item label="Cross Platform Development" value="cross" />
            <Select.Item label="UI Designing" value="ui" />
            <Select.Item label="Backend Development" value="backend" />
          </Select>
        </FormControl>
      </Box>

      <ButtonFull title="Acessar" onPress={handleNextPage} />
    </VStack>
  );
}
