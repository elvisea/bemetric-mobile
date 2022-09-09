import React from "react";
import { NativeBaseProvider } from "native-base";

import {
  useFonts,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';

import {
  Montserrat_400Regular,
  Montserrat_600SemiBold,
  Montserrat_300Light
} from '@expo-google-fonts/montserrat';

import { Routes } from "./src/routes";
import { THEME } from "./src/theme/theme";
import { Loading } from "./src/components/Loading";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {

  let [fontsLoaded] = useFonts({
    Montserrat_600SemiBold,
    Montserrat_400Regular,
    Montserrat_300Light,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  return (
    <NativeBaseProvider theme={THEME}>
      <SafeAreaView style={{ flex: 1 }}>
        {fontsLoaded ? <Routes /> : <Loading />}
      </SafeAreaView>
    </NativeBaseProvider>
  );
}
