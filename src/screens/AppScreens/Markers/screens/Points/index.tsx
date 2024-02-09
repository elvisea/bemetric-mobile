import { Alert, FlatList } from "react-native";
import React, { useCallback, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { IconButton, VStack } from "native-base";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";

import api from "@services/api";
import { THEME } from "@theme/theme";
import { useCustomer } from "@hooks/customer";

import { initialState } from "./constants";
import { normalizePoints } from "../../functions";

import { MarkerCard } from "@components/MarkerCard";
import { HeaderDefault } from "@components/HeaderDefault";
import { LoadingSpinner } from "@components/LoadingSpinner";

export function Points() {
  const { colors } = THEME;

  const { customer } = useCustomer();
  const navigation = useNavigation();

  const [state, setState] = useState(initialState);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      async function fetchData() {
        try {
          setState((prevState) => ({ ...prevState, isLoading: true }));

          if (customer) {
            const response = await api.post(
              "/PontoInteresse/ObterListaPontoInteresseApp",
              {
                codigoCliente: customer.codigoCliente,
              },
            );

            const points = normalizePoints(response.data);

            setState((prevState) => ({ ...prevState, points: points }));
          }
        } catch (error) {
          Alert.alert(
            "Erro de Comunicação",
            "Não foi possível completar a solicitação. Por favor, tente novamente mais tarde.",
          );
        } finally {
          setState((prevState) => ({ ...prevState, isLoading: false }));
        }
      }

      isActive && fetchData();

      return () => {
        isActive = false;
      };
    }, []),
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
          onPress={() => navigation.navigate("CreatePoint")}
        />
      </HeaderDefault>

      {state.isLoading && <LoadingSpinner color={colors.blue[700]} />}

      {!state.isLoading && (
        <FlatList
          data={state.points}
          keyExtractor={(item) => item.id}
          style={{ width: "100%", padding: 16 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: point }) => (
            <MarkerCard
              title={point.name}
              icon={
                <FontAwesome5
                  name="dot-circle"
                  size={28}
                  color={colors.blue[700]}
                />
              }
              description={point.description}
              onPress={() =>
                navigation.navigate("Point", {
                  codigoPontoInteresse: point.code,
                })
              }
            />
          )}
        />
      )}
    </VStack>
  );
}
