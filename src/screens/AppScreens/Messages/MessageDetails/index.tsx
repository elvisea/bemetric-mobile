import * as React from "react";
import { StyleSheet } from "react-native";

import WebView from "react-native-webview";
import { useFocusEffect, useRoute } from "@react-navigation/native";

import axios from "axios";

import api from "@services/api";
import { useAuth } from "@hooks/auth";
import { useCustomer } from "@hooks/customer";

interface IMessage {
  codigoParceiro: number;
  dataEnvio: string;
  descricao: string;
  listaClientes: null;
  nomeParceiro: string;
  titulo: string;
  todosClientes: number;
}

interface IParams {
  tipoMensagem: number;
  codigoMensagem: number;
}

export function MessageDetails() {
  const { user } = useAuth();
  const { customer } = useCustomer();

  const route = useRoute();
  const params = route.params as IParams;

  const [message, setMessage] = React.useState<IMessage | null>(null);

  console.log(message?.descricao);

  async function indicarLeitura() {
    try {
      const response = await api.put("/Mensagem/IndicarLeitura", {
        tipoMensagem: params.tipoMensagem,
        codigoMensagem: params.codigoMensagem,
        codigoUsuario: user?.codigoUsuario,
        codigoCliente: customer?.codigoCliente,
      });

      console.log("Response:", response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) console.log(error);
    } finally {
    }
  }

  async function fetchMessage() {
    try {
      const response = await api.post("/Mensagem/ObterDetalhes", {
        tipoMensagem: params.tipoMensagem,
        codigoMensagem: params.codigoMensagem,
      });

      console.log("MESSAGE", response.data);

      setMessage(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) console.log(error);
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
    }, [])
  );

  return (
    <WebView
      style={styles.container}
      originWhitelist={["*"]}
      source={{ html: message?.descricao }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
});
