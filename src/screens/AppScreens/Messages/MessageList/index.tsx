import { Alert } from "react-native";
import React, { useCallback, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import axios from "axios";
import { FlatList, Text, VStack } from "native-base";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import api from "@services/api";

import { THEME } from "@theme/theme";

import SystemRead from "@assets/system-read.svg";
import SystemUnread from "@assets/system-unread.svg";

import AdminRead from "@assets/admin-read.svg";
import AdminUnread from "@assets/admin-unread.svg";

import { useAuth } from "@hooks/authentication";
import { useCustomer } from "@hooks/customer";

import { Message } from "@components/Message";
import { MessageHeader } from "@components/MessageHeader";
import { LoadingSpinner } from "@components/LoadingSpinner";

import { IMessageType } from "./interfaces";
import { responses } from "./constants/responses";

export function MessageList() {
  const navigation = useNavigation();

  const { user } = useAuth();
  const { customer } = useCustomer();

  const { colors, fonts, fontSizes } = THEME;

  const messageType: IMessageType = {
    0: {
      read: {
        color: colors.gray[350],
        icon: <AdminRead />,
      },
      unread: {
        color: colors.blue[700],
        icon: <AdminUnread />,
      },
    },
    1: {
      read: {
        color: colors.gray[350],
        icon: (
          <MaterialCommunityIcons
            name="email-open-multiple-outline"
            size={29}
            color={colors.white}
          />
        ),
      },
      unread: {
        color: colors.orange[100],
        icon: (
          <MaterialCommunityIcons
            name="email-multiple-outline"
            size={29}
            color={colors.white}
          />
        ),
      },
    },
    2: {
      read: {
        icon: <SystemRead />,
        color: colors.gray[350],
      },
      unread: {
        icon: <SystemUnread />,
        color: colors.cyan[100],
      },
    },
  };

  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<IMessage[]>([]);

  const fetchMessages = async () => {
    try {
      setIsLoading(true);

      const response = await api.post("/Mensagem/ObterListaApp", {
        codigoUsuario: user?.codigoUsuario,
        codigoCliente: customer?.codigoCliente,
      });

      if (typeof response.data !== "string") {
        setMessages(response.data);
      } else {
        setMessages([]);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) Alert.alert(`${error}`, `${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleIndicateExclusion = useCallback(
    async (message: IMessage) => {
      try {
        const response = await api.put("/Mensagem/IndicarExclusao", {
          tipoMensagem: message.tipoMensagem,
          codigoMensagem: message.codigoMensagem,
          codigoUsuario: user?.codigoUsuario,
          codigoCliente: customer?.codigoCliente,
        });

        if (response.data === 0) {
          const filtered = messages.filter(
            (item) => item.codigoMensagem !== message.codigoMensagem,
          );

          setMessages(filtered);
        }

        Alert.alert(
          responses[response.data].subtitle,
          responses[response.data].subtitle,
        );
      } catch (error) {
        if (axios.isAxiosError(error)) Alert.alert(`${error}`, `${error}`);
      } finally {
      }
    },
    [messages],
  );

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      isActive && fetchMessages();

      return () => {
        isActive = false;
      };
    }, []),
  );

  return (
    <>
      <MessageHeader goback={() => navigation.goBack()} />
      <VStack flex={1} w="full" p={4} bg={colors.shape}>
        <Text fontFamily={fonts.Roboto_700Bold} fontSize={fontSizes.md} mb={3}>
          Mensagens
        </Text>

        {isLoading && <LoadingSpinner color={colors.blue[700]} />}

        {!isLoading && (
          <FlatList
            data={messages}
            keyExtractor={(item) => item.codigoMensagem.toString()}
            style={{ width: "100%" }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item: message }) => (
              <Message
                exclude={() => handleIndicateExclusion(message)}
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
        )}
      </VStack>
    </>
  );
}
