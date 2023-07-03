import { useCallback, useState } from "react";
import { Alert, FlatList, StyleSheet } from "react-native";

import {
  useNavigation,
  DrawerActions,
  useFocusEffect,
} from "@react-navigation/native";

import axios from "axios";
import { RFValue } from "react-native-responsive-fontsize";

import api from "@services/api";
import { THEME } from "@theme/theme";

import { useCustomer } from "@hooks/customer";

import { ButtonFull } from "@components/ButtonFull";
import { LayoutDefault } from "@components/LayoutDefault";
import { HeaderDefault } from "@components/HeaderDefault";
import { EquipmentCard } from "@components/EquipmentCard";

import { ListTitle } from "./styles";

type IEquipment = {
  placa: string;
  identificador: string;
  tipoEquipamento: string;
  nomeEquipamento: string;
  codigoEquipamento: number;
};

export function ChooseEquipment() {
  const navigation = useNavigation();

  const { customer } = useCustomer();

  console.log("Código Cliente:", customer?.codigoCliente);

  const [equipment, setEquipment] = useState<IEquipment[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<IEquipment | null>(
    null
  );

  const handleMenu = () => navigation.dispatch(DrawerActions.openDrawer());

  const handleSelectedEquipment = (item: IEquipment) => {
    if (item.codigoEquipamento === selectedEquipment?.codigoEquipamento) {
      setSelectedEquipment(null);
    } else {
      setSelectedEquipment(item);
    }
  };

  const handleAdvance = () => {
    if (selectedEquipment) {
      navigation.navigate("ChooseGrouping");
    } else {
      navigation.navigate("AddEquipment");
    }
  };

  const fetchEquipment = async () => {
    try {
      const response = await api.post("/Equipamento/ObterLista", {
        codigoCliente: customer?.codigoCliente,
      });

      setEquipment(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) Alert.alert(`${error}`, `${error}`);
    }
  };

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      if (isActive) fetchEquipment();

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
      <HeaderDefault title="Equipamentos disponíveis" />

      <FlatList
        data={equipment}
        ListHeaderComponent={<ListTitle>Selecione um Equipamento</ListTitle>}
        keyExtractor={(item) => item.codigoEquipamento.toString()}
        style={styles.container}
        renderItem={({ item }) => (
          <EquipmentCard
            isSelected={
              item.codigoEquipamento === selectedEquipment?.codigoEquipamento
            }
            placa={item.placa}
            identificador={item.identificador}
            nomeEquipamento={item.nomeEquipamento}
            tipoEquipamento={item.tipoEquipamento}
            onPress={() => handleSelectedEquipment(item)}
          />
        )}
      />

      <ButtonFull
        title={selectedEquipment ? "Avançar" : "Adicionar equipamento"}
        onPress={handleAdvance}
      />
    </LayoutDefault>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: RFValue(16),
  },
});
