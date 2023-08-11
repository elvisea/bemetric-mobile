import styled from "styled-components/native";

import { THEME } from "@theme/theme";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const Description = styled.Text`
  color: #a4a4a4;
  font-size: ${RFValue(14)}px;
  font-family: ${THEME.fonts.Roboto_400Regular};
`;

export const ValueText = styled.Text`
  font-size: ${RFValue(16)}px;
  color: ${THEME.colors.blue[700]};
  font-family: ${THEME.fonts.Roboto_400Regular};
  margin-right: ${RFValue(16)}px;
`;

export const Title = styled.Text`
  color: #363636;
  font-size: ${RFValue(14)}px;
  margin-left: ${RFValue(45)}px;
  font-family: ${THEME.fonts.Roboto_500Medium};
`;

export const ImageContainer = styled.View`
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  top: ${RFValue(-18)}px;
  width: ${RFValue(36)}px;
  height: ${RFValue(36)}px;
  border-radius: ${RFValue(6)}px;
  background-color: ${THEME.colors.cyan[200]};
`;

export const HeaderView = styled.View`
  position: relative;
  flex-direction: row;
  align-items: baseline;
  margin-bottom: ${RFValue(16)}px;
`;

export const Row = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-bottom: ${RFValue(8)}px;
`;

export const StackView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Content = styled.View`
  margin-top: ${RFValue(20)}px;
  margin-bottom: ${RFValue(10)}px;
  padding: ${RFValue(6)}px ${RFValue(14)}px ${RFValue(10)}px ${RFValue(14)}px;
  border-radius: ${RFValue(6)}px;
  width: 100%;
  background-color: ${THEME.colors.white};
  border: ${RFValue(1)}px solid #e6e6e6;
`;
