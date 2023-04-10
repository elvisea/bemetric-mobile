import React, { useCallback, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import axios from "axios";
import { IconButton, VStack } from "native-base";

import { HeaderDefault } from "@components/HeaderDefault";

import api from "@services/api";
import { THEME } from "@theme/theme";

import { LoadingSpinner } from "@components/LoadingSpinner";
import { useCustomer } from "@hooks/customer";
import { FlatList } from "react-native";
import { GeofenceCard } from "@components/GeofenceCard";

interface IPointsInterest {
  descricao: string;
  nomePonto: string;
  codigoPontoInteresse: number;
}

export function PointsInterest() {
  const { customer } = useCustomer();
  const navigation = useNavigation();

  const { colors } = THEME;

  const [list, setList] = useState<IPointsInterest[] | null>(null);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      async function fetchData() {
        try {
          if (customer) {
            const response = await api.post(
              "/PontoInteresse/ObterListaPontoInteresseApp",
              {
                codigoCliente: customer.codigoCliente,
              }
            );

            isActive && setList(response.data);
          }
        } catch (error) {
          if (axios.isAxiosError(error)) console.log(error);
        } finally {
        }
      }

      fetchData();

      return () => {
        isActive = false;
      };
    }, [])
  );

  return (
    <VStack flex={1} width="full" bg={colors.shape}>
      <HeaderDefault title="Ponto de interesse">
        <IconButton
          icon={
            <MaterialCommunityIcons
              name="map-marker-plus-outline"
              size={26}
              color={colors.blue[700]}
            />
          }
          onPress={() => console.log("Add Ponto de interesse")}
        />
      </HeaderDefault>

      {!list && <LoadingSpinner color={colors.blue[700]} />}

      {list && (
        <FlatList
          data={list}
          keyExtractor={(item) => item.codigoPontoInteresse.toString()}
          style={{ width: "100%", padding: 16 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: point }) => (
            <GeofenceCard
              title={point.nomePonto}
              description={point.descricao}
              onPress={() =>
                navigation.navigate("UpdatePointsInterest", {
                  codigoPontoInteresse: point.codigoPontoInteresse,
                })
              }
            />
          )}
        />
      )}
    </VStack>
  );
}
