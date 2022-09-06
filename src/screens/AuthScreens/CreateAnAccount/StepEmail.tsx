import React from 'react';
import { Box, VStack } from "native-base";
import { useNavigation } from '@react-navigation/native';

import { Input } from '../../../components/Input';
import { ButtonFull } from '../../../components/ButtonFull';
// import { HeaderAuth } from '../../../components/HeaderAuth';

export default function StepEmail() {
  const navigation = useNavigation();

  const handleNextPage = () => {
    navigation.navigate("stepPassword");
  }

  return (
    <VStack
      w="full"
      bg="blue.700"
      flex={1}
      alignItems="center"
      justifyContent="space-between"
    >

      {/* <HeaderAuth /> */}

      <Box width="full" px={8} alignItems="center" >
        <Input placeholder="E-mail" />
      </Box>

      <ButtonFull title='Avançar' onPress={handleNextPage} />

    </VStack>
  )
}