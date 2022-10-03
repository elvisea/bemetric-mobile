import React from 'react';
import { Box } from 'native-base';
import { useNavigation } from '@react-navigation/native';

import { Input } from '@components/Input';
import { ButtonFull } from '@components/ButtonFull';
import { LayoutDefault } from '@components/LayoutDefault';

export default function StepEmail() {
  const navigation = useNavigation();

  const handleNextPage = () => navigation.navigate('stepPassword');

  return (
    <LayoutDefault
      bg="blue.700"
      icon="chevron-left"
      functionIcon={() => navigation.goBack()}
      justifyContent="flex-start"
    >
      <Box
        px={8}
        flex={1}
        width="full"
        alignItems="center"
        justifyContent="center"
      >
        <Input placeholder="E-mail" />
      </Box>
      <ButtonFull title="Avançar" onPress={handleNextPage} />
    </LayoutDefault>
  );
}
