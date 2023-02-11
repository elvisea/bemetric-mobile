import React, { useCallback, useState } from "react";
import { Text, View } from "react-native";

import axios from "axios";
import api from "@services/api";

import { useAuth } from "@hooks/auth";
import { useCustomer } from "@hooks/customer";
import { useFocusEffect } from "@react-navigation/native";

export function MessageList() {
  const { user } = useAuth();
  const { customer } = useCustomer();

  const [messages, setMessages] = useState();

  console.log("messages:", messages);

  const fetchData = async () => {
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

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      if (isActive) fetchData();

      return () => {
        isActive = false;
      };
    }, [])
  );

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Message List!</Text>
    </View>
  );
}
