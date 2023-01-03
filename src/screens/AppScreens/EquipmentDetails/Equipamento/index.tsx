import * as React from "react";
import { Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import axios from "axios";

import api from "@services/api";

export function Equipamento() {
  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      async function fetchData() {
        try {
          const response = await api.post("/Equipamento/ObterLista", {
            codigoEquipamento: 8,
          });

          console.log("LOG:", response.data);
        } catch (error) {
          if (axios.isAxiosError(error)) console.log("ERROR:", error);
        }
      }

      fetchData();

      return () => {
        isActive = false;
      };
    }, [])
  );

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Equipamento!</Text>
    </View>
  );
}
