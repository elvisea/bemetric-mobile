import { FlatList } from "react-native";
import { useCallback, useState } from "react";

import { useFocusEffect } from "@react-navigation/native";

import axios from "axios";
import { Text, VStack } from "native-base";
import { RFValue } from "react-native-responsive-fontsize";

import api from "@services/api";
import { THEME } from "@theme/theme";
import { useCustomer } from "@hooks/customer";
import { GeofenceCard } from "@components/GeofenceCard";
import { LoadingSpinner } from "@components/LoadingSpinner";

interface IPointsInterest {
  descricao: string;
  nomeGeocerca: string;
  codigoGeocerca: number;
}

export function PointsInterest() {
  const { customer } = useCustomer();
  const { colors, fonts, fontSizes } = THEME;

  const [list, setList] = useState<IPointsInterest[] | null>(null);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      async function fetchData() {
        try {
          if (customer) {
            const response = await api.post("/ObterListaPontoInteresseApp", {
              codigoCliente: customer.codigoCliente,
            });

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

  function TextFlatlist() {
    return (
      <Text fontFamily={fonts.Roboto_700Bold} fontSize={fontSizes.md} mb={3}>
        pointsInterest
      </Text>
    );
  }

  return (
    <VStack flex={1} w="full" p={`${RFValue(16)}px`}>
      {!list && <LoadingSpinner color={colors.blue[700]} />}

      {list && (
        <FlatList
          data={list}
          ListHeaderComponent={() => <TextFlatlist />}
          keyExtractor={(item) => item.codigoGeocerca.toString()}
          style={{ width: "100%" }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: pointInterest }) => (
            <GeofenceCard
              title={pointInterest.nomeGeocerca}
              description={pointInterest.descricao}
            />
          )}
        />
      )}
    </VStack>
  );
}
