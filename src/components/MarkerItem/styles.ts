import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

import { THEME } from "@theme/theme";

export const Container = styled.TouchableOpacity`
  width: 100%;
  height: ${RFValue(50)}px;

  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  padding: ${RFValue(12)}px;
  margin-bottom: ${RFValue(8)}px;

  border: ${RFValue(1)}px solid #e6e6e6;
  border-radius: ${RFValue(4)}px;
`;

export const OutsideBox = styled.View`
  width: ${RFValue(25)}px;
  height: ${RFValue(25)}px;

  align-items: center;
  justify-content: center;

  margin-right: ${RFValue(12)}px;

  background: #fff;
  border-radius: ${RFValue(5)}px;

  border: ${RFValue(1)}px solid ${THEME.colors.blue[700]};
`;

export const InsideBox = styled.View`
  width: ${RFValue(18)}px;
  height: ${RFValue(18)}px;

  background: ${THEME.colors.blue[700]};
  border-radius: ${RFValue(3)}px;

  border: ${RFValue(1)}px solid ${THEME.colors.blue[700]};
`;

export const Title = styled.Text`
  color: #717171;
  font-size: ${RFValue(14)}px;
  font-family: ${THEME.fonts.Roboto_400Regular};
`;
