import 'react-native-gesture-handler';

import React from "react";

import { NativeBaseProvider } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  useFonts,
  Roboto_500Medium,
  Roboto_700Bold,
  Roboto_400Regular
} from '@expo-google-fonts/roboto';

import {
  Montserrat_400Regular,
  Montserrat_600SemiBold,
  Montserrat_300Light
} from '@expo-google-fonts/montserrat';

import { CustomerProvider } from "./src/hooks/customer"

import { Routes } from "./src/routes";
import { THEME } from "./src/theme/theme";

import { Loading } from "./src/components/Loading";

export default function App() {

  let [fontsLoaded] = useFonts({
    Montserrat_600SemiBold,
    Montserrat_400Regular,
    Montserrat_300Light,
    Roboto_500Medium,
    Roboto_700Bold,
    Roboto_400Regular
  });

  return (
    <NativeBaseProvider theme={THEME}>
      <SafeAreaView style={{ flex: 1 }}>
        <CustomerProvider>
          {fontsLoaded ? <Routes /> : <Loading />}
        </CustomerProvider>
      </SafeAreaView>
    </NativeBaseProvider>
  );
}
