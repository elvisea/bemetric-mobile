import { StyleSheet } from "react-native";

import { THEME } from "@theme/theme";
import styled from "styled-components/native";

export const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});

export const Container = styled.View`
  flex: 1;
  width: 100%;
  background: ${THEME.colors.shape};
`;
