import styled from "styled-components/native";

import { THEME } from "@theme/theme";
import { RFValue } from "react-native-responsive-fontsize";

export const GrayText = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${THEME.fonts.Roboto_400Regular};
  color: ${THEME.colors.gray[50]};
`;

export const ViewBox = styled.View`
  width: 100%;
  background-color: ${THEME.colors.white};
  padding: ${RFValue(6)}px;
  margin-bottom: ${RFValue(8)}px;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${RFValue(8)}px;
`;

export const ValueText = styled.Text`
  color: ${THEME.colors.blue[700]};
  font-size: ${RFValue(18)}px;
  font-weight: bold;
  font-family: ${THEME.fonts.Roboto_400Regular};
`;
