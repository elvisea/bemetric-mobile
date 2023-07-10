import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

import { THEME } from "@theme/theme";

export const TitleHeader = styled.Text`
  color: ${THEME.colors.gray[250]};
  font-size: ${RFValue(16)}px;
  margin-top: ${RFValue(16)}px;
  margin-bottom: ${RFValue(8)}px;
  font-family: ${THEME.fonts.Roboto_400Regular};
`;

export const Content = styled.View`
  padding: ${RFValue(24)}px ${RFValue(24)}px 0 ${RFValue(24)}px;
  align-items: center;
  justify-content: center;
`;

export const Row = styled.View`
  align-items: center;
  justify-content: center;

  flex-direction: row;
`;

export const Warning = styled.Text`
  color: ${THEME.colors.gray[250]};
  font-family: ${THEME.fonts.Roboto_400Regular};
  margin-bottom: ${RFValue(24)}px;
  font-size: ${RFValue(16)}px;
  line-height: ${RFValue(20.8)}px;
  text-align: center;
`;

export const Status = styled.Text`
  color: ${THEME.colors.gray[250]};
  font-family: ${THEME.fonts.Roboto_400Regular};
  margin-top: ${RFValue(16)}px;
  font-size: ${RFValue(16)}px;
`;
