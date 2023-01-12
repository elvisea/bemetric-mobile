import { useCallback, useState } from "react";
import { FlatList, VStack } from "native-base";

import {
  useNavigation,
  DrawerActions,
  useFocusEffect,
} from "@react-navigation/native";

import { FontAwesome } from "@expo/vector-icons";

import axios from "axios";

import api from "@services/api";

import { THEME } from "@theme/theme";
import { useCustomer } from "@hooks/customer";

import { LayoutDefault } from "@components/LayoutDefault";
import { EquipmentCard } from "@components/Change/EquipmentCard";
import { DetailsHeader } from "@components/EquipmentDetails/DetailsHeader";

interface IEquipamento {
  nomeEquipamento: string;
  dispositivoSerial: string;
  codigoEquipamento: number;
}

export function Change() {
  const navigation = useNavigation();
  const { customer } = useCustomer();

  const handleMenu = () => navigation.dispatch(DrawerActions.openDrawer());

  const [equipments, setEquipments] = useState<IEquipamento[] | null>(null);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      async function fetchData() {
        try {
          if (customer) {
            const response = await api.post(
              "/AppMobile/ObterListaEquipamentosAssociados",
              {
                codigoCliente: customer.codigoCliente,
              }
            );

            setEquipments(response.data);
          }
        } catch (error) {
          if (axios.isAxiosError(error)) console.log("Error:", error);
        }
      }

      fetchData();

      return () => {
        isActive = false;
      };
    }, [])
  );

  return (
    <LayoutDefault
      bg={THEME.colors.shape}
      firstIcon="menu"
      handleFirstIcon={handleMenu}
    >
      <DetailsHeader title="Selecione o equipamento" />

      <VStack paddingY="16px" paddingX="16px" width="full">
        <FlatList
          data={equipments}
          style={{ width: "100%" }}
          keyExtractor={(item) => item.codigoEquipamento.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <EquipmentCard
              icon={
                <FontAwesome
                  name="gears"
                  color={THEME.colors.blue[700]}
                  size={30}
                />
              }
              title={item.nomeEquipamento}
              description={item.dispositivoSerial}
            />
          )}
        />
      </VStack>
    </LayoutDefault>
  );
}
