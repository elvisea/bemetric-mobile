import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

import { THEME } from "@theme/theme";

export const Container = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${RFValue(8)}px;
  padding: ${RFValue(8)}px;
  height: ${RFValue(65)}px;
  border: ${RFValue(1)}px solid ${THEME.colors.blue[700]};
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
  color: #a4a4a4;
`;
