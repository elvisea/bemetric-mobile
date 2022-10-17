import React from 'react';
import { Box } from 'native-base';
import { RFValue } from 'react-native-responsive-fontsize';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RectButtonProps } from 'react-native-gesture-handler';

import { THEME } from '@theme/theme';
import Icone from '@assets/icone-40.svg';

import { Button, Container, Description, Title } from './styles';

interface Props extends RectButtonProps {
  title: string;
  expanded: boolean;
  description: string;
}

export function AccordionList({
  title,
  expanded,
  description,
  ...rest
}: Props) {
  return (
    <Container>
      <Button {...rest}>
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
        >
          <Icone />

          <Box
            ml={`${RFValue(12)}px`}
            alignItems="flex-start"
            justifyContent="center"
          >
            <Title>{title}</Title>

            <Description>{description}</Description>

          </Box>
        </Box>

        <MaterialCommunityIcons
          size={30}
          color={THEME.colors.blue[700]}
          name={expanded ? 'arrow-down' : 'arrow-right'}
        />
      </Button>

    </Container>
  );
}