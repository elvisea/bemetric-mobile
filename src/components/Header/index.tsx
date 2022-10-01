import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import { Container } from './styles';
import { IconButton } from 'native-base';

export function Header() {
  const navigation = useNavigation();

  const handleGoBack = () => navigation.goBack();

  return (
    <Container>
      <IconButton
        icon={<Feather name="chevron-left" size={24} color="#FFF" />}
        onPress={handleGoBack}
      />
    </Container>
  );
}
