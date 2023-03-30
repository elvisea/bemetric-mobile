import * as React from "react";
import { Image, StyleSheet, View } from "react-native";

import WebView from "react-native-webview";
import { useFocusEffect, useRoute } from "@react-navigation/native";

import axios from "axios";

import api from "@services/api";
import { useAuth } from "@hooks/auth";
import { useCustomer } from "@hooks/customer";
import { Text, VStack } from "native-base";

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

  console.log("State Message Descricao:", message?.descricao);

  const text =
    "Recomendamos que você entre em contato imediatamente com a assistência técnica autorizada da marca para solucionar o problema o mais rápido possível. É importante que as máquinas sejam verificadas e reparadas por profissionais qualificados, a fim de evitar danos maiores e garantir a segurança de todos envolvidos. ";

  const image =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKkAAADYCAYAAACQq8NLAAAABHNCSVQICAgIfAhkiAAAABl0RVh0U29mdHdhcmUAZ25vbWUtc2NyZWVuc2hvdO8Dvz4AAAAmdEVYdENyZWF0aW9uIFRpbWUAc2VnIDA2IG1hciAyMDIzIDE1OjIxOjM4+wCrxgAAA8hJREFUeJzt2b+LXFUAhuGzwSLl2CmkSWe2mUmpIMbWUrBJ/gLZMjb+gM2CaBPttLM0ZRrBzjAgRMEmaVJaLyjMdBEMHAsJm0WIBiLzbnie7t7qg/ty4N67N+ecA8LO7XoA/BuRkidS8kRKnkjJEyl5IiVPpOSJlDyRkidS8kRKnkjJEyl5IiVPpOSJlDyRkidS8kRKnkjJEyl5IiVPpOSJlDyRkidS8kRKnkjJEyl5IiVPpOSJlDyRkidS8kRKnkjJEyl5IiVPpOSJlDyRkidS8kRKnkjJEyl5IiVPpOSJlDyRkidS8kRKnkjJEyl5IiVPpOSJlDyRkidS8kRKnkjJEyl5IiVPpOSJlDyRkidS8kRKnkjJEyl5IiVPpOSJlDyRkidS8kRKnkjJEyl557Y/fzGuvbk/9i/tj/1Lb4xrn98Z212v4rm6cePG2G7/+VS32+04OjrawaJndPXCxXn11q9zzjnnbz/M66tX5ru3NpMXw+Hh4RxjzNVqNTebk+e62WzmarWaY4x5eHi4u4H/wVi8dn3e/fPkxoPPXp+L976dD3e3iedos9nM5XJ5KtQnA10ul6fiLdo7f34xX73w8snR+ujheHjpk3H3+4NxcTeHO8/ZdrsdV65cGffv3x+r1WqMMca9e/fGcrkc6/V6LBaLHS98ur3F6uN555dPx+WXdj2F/9OToY4xzkygY4xx7p3fb4+vvjv+++rR8bj90bXxweNrXhiLxWKs1+uxXC7PVKBjjLG3+fHmPPjwm/HT8R9jPDo/Lr59MG5+eTAun439PKPHb/lnJdAxxtibc85dj4Cn8TGfPJGSJ1LyREqeSMkTKXkiJU+k5O2N99c+5nPK/PqtXU84xUlKnt+i5DlJyRMpeSIlT6TkiZQ8kZInUvJESp5IyRMpeSIlT6TkiZQ8kZInUvJESp5IyRMpeSIlT6TkiZQ8kZInUvJESp5IyRMpeSIlT6TkiZQ8kZInUvJESp5IyRMpeSIlT6TkiZQ8kZInUvJESp5IyRMpeSIlT6TkiZQ8kZInUvJESp5IyRMpeSIlT6TkiZQ8kZInUvJESp5IyRMpeSIlT6TkiZQ8kZInUvJESp5IyRMpeSIlT6TkiZQ8kZInUvJESp5IyRMpeSIlT6TkiZQ8kZInUvJESp5IyRMpeSIlT6TkiZQ8kZInUvJESp5IyRMpeSIlT6TkiZQ8kZInUvJESp5IyRMpeSIlT6TkiZQ8kZInUvJESp5IyRMpeSIlT6TkiZQ8kZInUvJESp5IyRMpeSIlT6TkiZQ8kZL3FycZdYhoeHC9AAAAAElFTkSuQmCC";

  const html = `<p><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKkAAADYCAYAAACQq8NLAAAABHNCSVQICAgIfAhkiAAAABl0RVh0U29mdHdhcmUAZ25vbWUtc2NyZWVuc2hvdO8Dvz4AAAAmdEVYdENyZWF0aW9uIFRpbWUAc2VnIDA2IG1hciAyMDIzIDE1OjIxOjM4+wCrxgAAA8hJREFUeJzt2b+LXFUAhuGzwSLl2CmkSWe2mUmpIMbWUrBJ/gLZMjb+gM2CaBPttLM0ZRrBzjAgRMEmaVJaLyjMdBEMHAsJm0WIBiLzbnie7t7qg/ty4N67N+ecA8LO7XoA/BuRkidS8kRKnkjJEyl5IiVPpOSJlDyRkidS8kRKnkjJEyl5IiVPpOSJlDyRkidS8kRKnkjJEyl5IiVPpOSJlDyRkidS8kRKnkjJEyl5IiVPpOSJlDyRkidS8kRKnkjJEyl5IiVPpOSJlDyRkidS8kRKnkjJEyl5IiVPpOSJlDyRkidS8kRKnkjJEyl5IiVPpOSJlDyRkidS8kRKnkjJEyl5IiVPpOSJlDyRkidS8kRKnkjJEyl5IiVPpOSJlDyRkidS8kRKnkjJEyl557Y/fzGuvbk/9i/tj/1Lb4xrn98Z212v4rm6cePG2G7/+VS32+04OjrawaJndPXCxXn11q9zzjnnbz/M66tX5ru3NpMXw+Hh4RxjzNVqNTebk+e62WzmarWaY4x5eHi4u4H/wVi8dn3e/fPkxoPPXp+L976dD3e3iedos9nM5XJ5KtQnA10ul6fiLdo7f34xX73w8snR+ujheHjpk3H3+4NxcTeHO8/ZdrsdV65cGffv3x+r1WqMMca9e/fGcrkc6/V6LBaLHS98ur3F6uN555dPx+WXdj2F/9OToY4xzkygY4xx7p3fb4+vvjv+++rR8bj90bXxweNrXhiLxWKs1+uxXC7PVKBjjLG3+fHmPPjwm/HT8R9jPDo/Lr59MG5+eTAun439PKPHb/lnJdAxxtibc85dj4Cn8TGfPJGSJ1LyREqeSMkTKXkiJU+k5O2N99c+5nPK/PqtXU84xUlKnt+i5DlJyRMpeSIlT6TkiZQ8kZInUvJESp5IyRMpeSIlT6TkiZQ8kZInUvJESp5IyRMpeSIlT6TkiZQ8kZInUvJESp5IyRMpeSIlT6TkiZQ8kZInUvJESp5IyRMpeSIlT6TkiZQ8kZInUvJESp5IyRMpeSIlT6TkiZQ8kZInUvJESp5IyRMpeSIlT6TkiZQ8kZInUvJESp5IyRMpeSIlT6TkiZQ8kZInUvJESp5IyRMpeSIlT6TkiZQ8kZInUvJESp5IyRMpeSIlT6TkiZQ8kZInUvJESp5IyRMpeSIlT6TkiZQ8kZInUvJESp5IyRMpeSIlT6TkiZQ8kZInUvJESp5IyRMpeSIlT6TkiZQ8kZInUvJESp5IyRMpeSIlT6TkiZQ8kZInUvJESp5IyRMpeSIlT6TkiZQ8kZL3FycZdYhoeHC9AAAAAElFTkSuQmCC" width="106" height="135"></p><h1>asasas</h1><p><strong style="font-size: 70px">TESTE</strong>a<em>assaa<u>asasas&nbsp; &nbsp;sadsadasd&nbsp; asddsads</u></em></p><p><em><u><br></u></em></p>`;

  async function indicarLeitura() {
    try {
      const response = await api.put("/Mensagem/IndicarLeitura", {
        tipoMensagem: params.tipoMensagem,
        codigoMensagem: params.codigoMensagem,
        codigoUsuario: user?.codigoUsuario,
        codigoCliente: customer?.codigoCliente,
      });

      console.log("Response Indicar Leitura:", response.data);
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
      source={{ html: message ? message.descricao : "undefined" }}
      // automaticallyAdjustContentInsets
      // source={{ uri: 'https://expo.dev' }}
    />
    // <VStack>

    // </VStack>

    // <View
    //   style={{
    //     flex: 1,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //   }}
    // >

    //   <Text fontSize="14px">{text}</Text>

    //   {/* <Image
    //     style={{ width: 106, height: 135 }}
    //     source={{ uri: image }}
    //   /> */}
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
});
