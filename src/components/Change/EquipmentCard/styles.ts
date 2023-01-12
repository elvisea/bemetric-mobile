import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

import { THEME } from "@theme/theme";

export const Container = styled.TouchableOpacity`
  width: 100%;
  height: ${RFValue(76)}px;
  background: ${THEME.colors.white};
  padding: 0 ${RFValue(16)}px;
  align-items: center;
  border: ${RFValue(1)}px solid #d8d8d8;
  justify-content: flex-start;
  flex-direction: row;
  margin-bottom: ${RFValue(8)}px;
`;
