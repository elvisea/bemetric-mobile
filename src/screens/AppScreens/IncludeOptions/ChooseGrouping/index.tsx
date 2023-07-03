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

import { useAuth } from "@hooks/auth";
import { useCustomer } from "@hooks/customer";

import { ButtonFull } from "@components/ButtonFull";
import { LayoutDefault } from "@components/LayoutDefault";
import { HeaderDefault } from "@components/HeaderDefault";
import { EquipmentCard } from "@components/EquipmentCard";

import { ListTitle } from "./styles";

type IGrouping = {
  codigoAgrupamento: number;
  nomeAgrupamento: string;
  nomeCliente: string;
  nomeParceiro: string;
  criadoEmFormatado: string;
};

export function ChooseGrouping() {
  const navigation = useNavigation();

  const { user } = useAuth();
  const { customer } = useCustomer();

  const [grouping, setGrouping] = useState<IGrouping[]>([]);
  const [selectedGrouping, setSelectedGrouping] = useState<IGrouping | null>(
    null
  );

  const handleMenu = () => navigation.dispatch(DrawerActions.openDrawer());

  const handleSelectedGrouping = (item: IGrouping) => {
    if (item.codigoAgrupamento === selectedGrouping?.codigoAgrupamento) {
      setSelectedGrouping(null);
    } else {
      setSelectedGrouping(item);
    }
  };

  const handleAdvance = () => {
    if (selectedGrouping) {
      console.log("Salvar");
    } else {
      navigation.navigate("AddGrouping");
    }
  };

  const fetchGrouping = async () => {
    try {
      const response = await api.post("/Agrupamento/ObterLista", {
        codigoUsuario: user?.codigoUsuario,
        codigoCliente: customer?.codigoCliente,
      });

      console.log("Response Fetch Grouping:", response.data);

      setGrouping(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) Alert.alert(`${error}`, `${error}`);
    }
  };

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      if (isActive) fetchGrouping();

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
      <HeaderDefault title="Agrupamentos disponíveis" />

      <FlatList
        data={grouping}
        ListHeaderComponent={<ListTitle>Selecione um Agrupamento</ListTitle>}
        keyExtractor={(item) => item.codigoAgrupamento.toString()}
        style={styles.container}
        renderItem={({ item }) => (
          <EquipmentCard
            isSelected={
              item.codigoAgrupamento === selectedGrouping?.codigoAgrupamento
            }
            placa={item.nomeCliente}
            identificador={item.nomeCliente}
            nomeEquipamento={item.nomeAgrupamento}
            tipoEquipamento={item.nomeParceiro}
            onPress={() => handleSelectedGrouping(item)}
          />
        )}
      />

      <ButtonFull
        title={selectedGrouping ? "Avançar" : "Adicionar Agrupamento"}
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
