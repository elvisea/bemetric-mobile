import React from 'react';
import { Box, VStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';

import { Input } from '@components/Input';
import { Header } from '@components/Header';
import { ButtonFull } from '@components/ButtonFull';

export default function StepConfirmPassword() {
  const navigation = useNavigation();

  const handleNextPage = () => navigation.navigate('signIn');

  return (
    <VStack
      w="full"
      bg="blue.700"
      flex={1}
      alignItems="center"
      justifyContent="space-between"
    >
      <Header />
      <Box width="full" px={8} alignItems="center">
        <Input placeholder="Confirme sua senha" secureTextEntry />
      </Box>

      <ButtonFull title="Avançar" onPress={handleNextPage} />
    </VStack>
  );
}
