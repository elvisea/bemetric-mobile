import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

import { THEME } from "@theme/theme";

export const Container = styled.TouchableOpacity`
  width: 100%;
  height: ${RFValue(65)}px;
  border: ${RFValue(1)}px solid ${THEME.colors.blue[700]};
  flex-direction: row;
  padding: 0 ${RFValue(16)}px;
  align-items: center;
  margin-bottom: ${RFValue(12)}px;
`;

export const Content = styled.View`
  flex: 1;
  margin-left: ${RFValue(12)}px;
`;

export const Title = styled.Text`
  font-family: ${THEME.fonts.Roboto_500Medium};
  font-size: ${RFValue(15)}px;
`;

export const Subtitle = styled.Text`
  color: ${THEME.colors.gray[50]};
  font-family: ${THEME.fonts.Roboto_500Medium};
  font-size: ${RFValue(12)}px;
`;
