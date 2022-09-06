import React from 'react';
import { CaretLeft } from 'phosphor-react-native';
import { Box, Heading, HStack, IconButton } from 'native-base';
import { useNavigation } from '@react-navigation/native';

export function HeaderAuth() {
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack()
  }

  return (
    <HStack w="full" px={8} marginTop={8}>
      <IconButton
        icon={<CaretLeft color='white' />}
        onPress={handleGoBack}
      />

      <Box flex={1} alignItems="center">
        <Heading color="white">Bemetric</Heading>
      </Box>
    </HStack>
  );
}