import { Alert } from "react-native";
import React, { useCallback, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { FlatList, Text, VStack } from "native-base";

import api from "@services/api";

import { THEME } from "@theme/theme";

import { useCustomer } from "@hooks/customer";
import { useAuth } from "@hooks/authentication";

import { Message } from "@components/Message";
import { MessageHeader } from "@components/MessageHeader";
import { LoadingSpinner } from "@components/LoadingSpinner";

import { initialState } from "./constants";
import { NormalizedMessages } from "./types";
import { normalizeMessages } from "./functions";

export function MessageList() {
  const navigation = useNavigation();

  const { user } = useAuth();
  const { customer } = useCustomer();

  const { colors, fonts, fontSizes } = THEME;

  const [state, setState] = useState(initialState);

  const fetchMessages = async () => {
    if (user && customer) {
      try {
        setState((prevState) => ({ ...prevState, isLoading: true }));

        const response = await api.post("/Mensagem/ObterListaApp", {
          codigoUsuario: user.codigoUsuario,
          codigoCliente: customer.codigoCliente,
        });

        const normalized = normalizeMessages(response.data);
        setState((prevState) => ({ ...prevState, messages: normalized }));
      } catch (error) {
        Alert.alert(
          "Erro de Comunicação",
          "Não foi possível completar a solicitação. Por favor, tente novamente mais tarde.",
        );
      } finally {
        setState((prevState) => ({ ...prevState, isLoading: false }));
      }
    }
  };

  const handleIndicateExclusion = useCallback(
    async (message: NormalizedMessages) => {
      if (user && customer) {
        try {
          const response = await api.put("/Mensagem/IndicarExclusao", {
            tipoMensagem: message.type,
            codigoMensagem: message.code,
            codigoUsuario: user.codigoUsuario,
            codigoCliente: customer.codigoCliente,
          });

          if (response.data === 0) {
            const filtered = state.messages.filter(
              (item) => item.code !== message.code,
            );

            setState((prevState) => ({ ...prevState, messages: filtered }));
          } else {
            Alert.alert(
              state.responses[response.data].title,
              state.responses[response.data].subtitle,
            );
          }
        } catch (error) {
          Alert.alert(
            "Erro de Comunicação",
            "Não foi possível completar a solicitação. Por favor, tente novamente mais tarde.",
          );
        }
      }
    },
    [state.messages],
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

        {state.isLoading && <LoadingSpinner color={colors.blue[700]} />}

        {!state.isLoading && (
          <FlatList
            data={state.messages}
            keyExtractor={(item) => item.id}
            style={{ width: "100%" }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item: message }) => (
              <Message
                exclude={() => handleIndicateExclusion(message)}
                icon={
                  message.read
                    ? state.types[message.type].read.icon
                    : state.types[message.type].unread.icon
                }
                date={message.date}
                color={
                  message.read
                    ? state.types[message.type].read.color
                    : state.types[message.type].unread.color
                }
                title={message.title}
                description={message.html}
                onPress={() =>
                  navigation.navigate("MessageDetails", {
                    tipoMensagem: message.type,
                    codigoMensagem: message.code,
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
