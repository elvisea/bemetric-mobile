import styled from 'styled-components/native';

import { THEME } from '@theme/theme';
import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  width: 100%;
  height: ${RFValue(73)}px;
  align-items: center;
  justify-content: center;
  margin-top: ${RFValue(8)}px;
  border-left-color: ${THEME.colors.blue[700]};
  border-left-width: ${RFValue(1)}px;
  flex-direction: row;
`;

export const Line = styled.View`
  width: 30px;
  align-items: flex-end;
  border-bottom-width: ${RFValue(1)}px;
  border-left-color: ${THEME.colors.blue[700]};
`;

export const Content = styled.View`
  /* flex: 1; */
  width: 100%;
  height: ${RFValue(65)}px;
  margin-top: ${RFValue(8)}px;
  border-top-color: #E6E6E6;
  border-right-color: #E6E6E6;
  border-bottom-color: #E6E6E6;
  border-left-color: ${THEME.colors.blue[700]};
  border-top-width: ${RFValue(1)}px;
  border-right-width: ${RFValue(1)}px;
  border-bottom-width: ${RFValue(1)}px;
  border-left-width: ${RFValue(4)}px;
`;

export const Button = styled(RectButton)`
  width: 100%;
  height: ${RFValue(65)}px;
  flex-direction: row;
  padding: 0 ${RFValue(16)}px;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${THEME.fonts.Roboto_500Medium};
  margin-bottom: ${RFValue(2)}px;
  color: #363636;
`;

export const Description = styled.Text`
  font-size: ${RFValue(12)}px;
  font-family: ${THEME.fonts.Roboto_400Regular};
  color: #A4A4A4;
`;
