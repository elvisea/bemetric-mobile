import { Alert, FlatList } from "react-native";
import React, { useCallback, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import axios from "axios";
import { IconButton, VStack } from "native-base";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";

import api from "@services/api";
import { THEME } from "@theme/theme";
import { useCustomer } from "@hooks/customer";

import { MarkerCard } from "@components/MarkerCard";
import { HeaderDefault } from "@components/HeaderDefault";
import { LoadingSpinner } from "@components/LoadingSpinner";

interface IPointsInterest {
  descricao: string;
  nomePonto: string;
  codigoPontoInteresse: number;
}

export function PointsInterest() {
  const { colors } = THEME;

  const { customer } = useCustomer();
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [pointsInterest, setPointsInterest] = useState<IPointsInterest[]>([]);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      async function fetchData() {
        setIsLoading(true);

        try {
          if (customer) {
            const response = await api.post(
              "/PontoInteresse/ObterListaPontoInteresseApp",
              {
                codigoCliente: customer.codigoCliente,
              }
            );

            isActive && setPointsInterest(response.data);
          }
        } catch (error) {
          if (axios.isAxiosError(error)) Alert.alert(`${error}`, `${error}`);
        } finally {
          setIsLoading(false);
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
          onPress={() => navigation.navigate("CreatePointsInterest")}
        />
      </HeaderDefault>

      {isLoading && <LoadingSpinner color={colors.blue[700]} />}

      {pointsInterest.length > 0 && !isLoading && (
        <FlatList
          data={pointsInterest}
          keyExtractor={(item) => item.codigoPontoInteresse.toString()}
          style={{ width: "100%", padding: 16 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: point }) => (
            <MarkerCard
              title={point.nomePonto}
              icon={
                <FontAwesome5
                  name="dot-circle"
                  size={28}
                  color={colors.blue[700]}
                />
              }
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
