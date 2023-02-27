import React, { ReactNode, useCallback, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import axios from "axios";
import { FlatList, Text, VStack } from "native-base";

import api from "@services/api";

import { THEME } from "@theme/theme";

import SistemaLido from "@assets/sistema-lido.svg";
import SistemaNaoLido from "@assets/sistema-nao-lido.svg";
import MensagemNaoLido from "@assets/mensagem-aviso-nao-lido.svg";

import { useAuth } from "@hooks/auth";
import { useCustomer } from "@hooks/customer";

import { Message } from "@components/Message";

interface IMessageType {
  [index: number]: {
    read: {
      color: string;
      icon: ReactNode;
    };
    unread: {
      color: string;
      icon: ReactNode;
    };
  };
}

export function MessageList() {
  const navigation = useNavigation();

  const { user } = useAuth();
  const { customer } = useCustomer();

  const { colors, fonts, fontSizes } = THEME;

  const messageType: IMessageType = {
    0: {
      read: {
        color: colors.blue[700],
        icon: <MensagemNaoLido />,
      },
      unread: {
        color: colors.blue[700],
        icon: <MensagemNaoLido />,
      },
    },
    1: {
      read: {
        color: colors.cyan[100],
        icon: <SistemaLido />,
      },
      unread: {
        color: colors.cyan[100],
        icon: <SistemaLido />,
      },
    },
    2: {
      read: {
        color: colors.orange[100],
        icon: <SistemaNaoLido />,
      },
      unread: {
        color: colors.orange[100],
        icon: <SistemaNaoLido />,
      },
    },
  };

  const [messages, setMessages] = useState<IMessage[] | null>(null);

  console.log("messages:", messages);

  const fetchMessages = async () => {
    try {
      const response = await api.post("/Mensagem/ObterListaApp", {
        codigoUsuario: user?.codigoUsuario,
        codigoCliente: customer?.codigoCliente,
      });

      console.log("=>", response.data);
      setMessages(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) console.log("Error:", error);
    }
  };

  async function handleIndicateExclusion() {
    try {
      const response = await api.put("/Mensagem/IndicarExclusao", {
        tipoMensagem: "number",
        codigoMensagem: "number",
        codigoUsuario: "number",
        codigoCliente: "number",
      });

      console.log(response.data);
    } catch (error) {
    } finally {
    }
  }

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      isActive && fetchMessages();

      return () => {
        isActive = false;
      };
    }, [])
  );

  return (
    <VStack flex={1} w="full" p={4} bg={colors.shape}>
      <Text fontFamily={fonts.Roboto_700Bold} fontSize={fontSizes.md} mb={3}>
        Mensagens
      </Text>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.codigoMensagem.toString()}
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: message }) => (
          <Message
            icon={
              message.mensagemLida
                ? messageType[message.tipoMensagem].read.icon
                : messageType[message.tipoMensagem].unread.icon
            }
            date={message.dataEnvio}
            color={
              message.mensagemLida
                ? messageType[message.tipoMensagem].read.color
                : messageType[message.tipoMensagem].unread.color
            }
            title={message.titulo}
            description={message.descricaosemhtml}
            onPress={() =>
              navigation.navigate("MessageDetails", {
                tipoMensagem: message.tipoMensagem,
                codigoMensagem: message.codigoMensagem,
              })
            }
          />
        )}
      />
    </VStack>
  );
}
