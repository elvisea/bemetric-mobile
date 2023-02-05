import styled from "styled-components/native";

import { THEME } from "@theme/theme";
import { RFValue } from "react-native-responsive-fontsize";

export const Button = styled.TouchableOpacity`
  width: 49.2%;
  height: ${RFValue(48)}px;
  padding: 0 ${RFValue(8)}px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  background: ${THEME.colors.white};

  border-color: #e6e6e6;
  border-bottom-width: ${RFValue(1)}px;
`;
