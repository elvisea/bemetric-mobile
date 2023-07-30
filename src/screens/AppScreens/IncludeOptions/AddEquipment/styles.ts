import { THEME } from "@theme/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  containerSelect: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  buttonPlus: {
    alignItems: "center",
    justifyContent: "center",
  },

  containerButtons: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },

  buttonDate: {
    width: "100%",
    borderBottomColor: THEME.colors.blue[700],
    borderBottomWidth: 1,
  },
});

export { styles };
