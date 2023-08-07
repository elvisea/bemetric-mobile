import { extendTheme } from "native-base";

export const THEME = extendTheme({
  colors: {
    primary: {
      700: "#996DFF",
    },
    secondary: {
      700: "#FBA94C",
    },
    green: {
      700: "#00875F",
      600: "#00B37E",
      500: "#00C020",
      400: "#0FD33D",
      350: "#0FD329",
      300: "#04D361",
    },
    cyan: {
      200: "#0FD3BC",
      100: "#0FD3BD",
    },
    orange: {
      100: "#FE9C51",
    },
    gray: {
      700: "#121214",
      600: "#202024",
      500: "#29292E",
      400: "#323238",
      350: "#BCBCBC",
      300: "#7C7C8A",
      250: "#717171",
      200: "#C4C4CC",
      100: "#E1E1E6",
      50: "#A4A4A4",
    },
    blue: {
      700: "#0069C0",
      600: "#2187E0",
    },
    red: {
      700: "#FF0000",
      600: "#E43232",
    },
    dark: "#000",
    white: "#FFFFFF",
    shape: "#F3F3F3",
  },
  fonts: {
    Roboto_400Regular: "Roboto_400Regular",
    Roboto_500Medium: "Roboto_500Medium",
    Roboto_700Bold: "Roboto_700Bold",

    Montserrat_300Light: "Montserrat_300Light",
    Montserrat_400Regular: "Montserrat_400Regular",
    Montserrat_600SemiBold: "Montserrat_600SemiBold",

    RobotoSlab_400Regular: "RobotoSlab_400Regular",
    RobotoSlab_500Medium: "RobotoSlab_500Medium",
    RobotoSlab_600SemiBold: "RobotoSlab_600SemiBold",
    RobotoSlab_700Bold: "RobotoSlab_700Bold",
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
  },
  sizes: {
    14: 56,
  },
});
