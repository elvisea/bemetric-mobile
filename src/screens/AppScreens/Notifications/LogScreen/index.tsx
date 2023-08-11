import React, { useCallback, useState } from "react";
import { Alert, FlatList } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import CustomBoxDetail from "./components/customBoxDetail";
import axios from "axios";
import api from "@services/api";
import { LoadingSpinner } from "@components/LoadingSpinner";
import { THEME } from "@theme/theme";

export function LogScreen() {
  const navigation = useNavigation();

  const [data, setData] = useState<any | null>()
  
  async function fetchData() {
    const data = {
      // "codigoCliente": customer?.codigoCliente,
      "codigoCliente": -1,
      "tipoIntervalo": 3
    };

    try {
      const response = await api.post("/Evento/ObterLista", data);

      setData(response.data.listaEventos);
    } catch (error) {
      if (axios.isAxiosError(error)) Alert.alert(`${error}`, `${error}`);
    }
  }

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      isActive && fetchData();

      return () => {
        isActive = false;
      };
    }, [])
  );

  function handleNextPage(codigoEvento: number) {
    navigation.navigate("NotificationDetailing", { screen: "DetailingScreen",  params: { codigoEvento: codigoEvento }});
  }

  return (
    <>
    {data?
      <FlatList
        data={data}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          width: "100%",
        }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.codigoEvento.toString()}
        style={{ width: "100%" }}
        renderItem={({ item }) => (
          <CustomBoxDetail
            func={() => handleNextPage(item.codigoEvento)}
            Icon={item.tipoEvento === 0 ? "bell" : "flag"}
            Html={item.mensagemHtml}
            date={item.criadoEmFormatado}
          />
        )}
      />
      :
      <LoadingSpinner color={THEME.colors.blue[700]} />
    }
    </>
  );
}
