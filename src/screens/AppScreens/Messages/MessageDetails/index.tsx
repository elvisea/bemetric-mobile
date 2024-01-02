import * as React from "react";
import { Alert, StyleSheet } from "react-native";

import axios from "axios";
import WebView from "react-native-webview";
import { Text, VStack } from "native-base";

import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import api from "@services/api";
import { THEME } from "@theme/theme";

import { useAuth } from "@hooks/authentication";
import { useCustomer } from "@hooks/customer";

import { IParams, IMessage } from "./interfaces";

import { MessageHeader } from "@components/MessageHeader";
import { LoadingSpinner } from "@components/LoadingSpinner";

export function MessageDetails() {
  const { user } = useAuth();
  const { customer } = useCustomer();
  const navigation = useNavigation();

  const route = useRoute();
  const params = route.params as IParams;

  const { fonts } = THEME;

  const [message, setMessage] = React.useState<IMessage | null>(null);

  async function indicarLeitura() {
    try {
      await api.put("/Mensagem/IndicarLeitura", {
        tipoMensagem: params.tipoMensagem,
        codigoMensagem: params.codigoMensagem,
        codigoUsuario: user?.codigoUsuario,
        codigoCliente: customer?.codigoCliente,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) Alert.alert(`${error}`, `${error}`);
    } finally {
    }
  }

  async function fetchMessage() {
    try {
      const response = await api.post("/Mensagem/ObterDetalhes", {
        tipoMensagem: params.tipoMensagem,
        codigoMensagem: params.codigoMensagem,
      });

      setMessage(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) Alert.alert(`${error}`, `${error}`);
    } finally {
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      if (isActive) {
        fetchMessage();
        indicarLeitura();
      }

      return () => {
        isActive = false;
      };
    }, []),
  );

  return (
    <>
      <MessageHeader goback={() => navigation.goBack()} />
      <VStack w="full" bg="white" px="8px" pb="20px" pt="16px">
        <Text fontFamily={fonts.Roboto_700Bold} fontSize={"14px"} mb={1}>
          {message?.titulo}
        </Text>
        <Text fontFamily={fonts.Roboto_400Regular} fontSize={"12px"}>
          {message?.dataEnvio}
        </Text>
      </VStack>

      {!message && <LoadingSpinner color={THEME.colors.blue[700]} />}

      {message && (
        <WebView
          style={styles.container}
          originWhitelist={["*"]}
          scalesPageToFit={false}
          showsVerticalScrollIndicator={false}
          source={{ html: message.descricao }}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
