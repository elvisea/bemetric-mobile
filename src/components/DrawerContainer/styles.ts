import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

import { THEME } from "@theme/theme";

export const Container = styled.ScrollView`
  flex: 1;
  width: 100%;
  background: ${THEME.colors.blue[700]};
  padding: 0 ${RFValue(16)}px;
`;
