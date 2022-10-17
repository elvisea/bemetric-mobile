import React from 'react';
import { Box } from 'native-base';
import { RFValue } from 'react-native-responsive-fontsize';
import { RectButtonProps } from 'react-native-gesture-handler';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import { THEME } from '@theme/theme';

import { Button, Content, Description, Title } from './styles';

interface Props extends RectButtonProps {
  title: string;
  expanded: boolean;
  description: string;
}

export function AccordionItem({
  title,
  expanded,
  description,
  ...rest
}: Props) {
  return (
    <Content>
      <Button {...rest}>
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
        >
          <MaterialIcons
            size={30}
            color={THEME.colors.blue[700]}
            name="settings"
          />

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
          name='arrow-right'
        />
      </Button>

    </Content>
  );
}