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

import { AuthProvider } from '@hooks/auth';
import { CustomerProvider } from "@hooks/customer"

import { THEME } from '@theme/theme';
import { Routes } from '@routes/index';

import { Loading } from "@components/Loading";

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
        <AuthProvider>
          <CustomerProvider>
            {fontsLoaded ? <Routes /> : <Loading />}
          </CustomerProvider>
        </AuthProvider>
      </SafeAreaView>
    </NativeBaseProvider>
  );
}
