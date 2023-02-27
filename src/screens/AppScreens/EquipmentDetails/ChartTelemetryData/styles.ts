import styled from "styled-components/native";
import { FontAwesome } from "@expo/vector-icons";

import { THEME } from "@theme/theme";

export const Icon = styled(FontAwesome).attrs(() => ({
  size: 24,
  color: THEME.colors.blue[700],
}))``;
