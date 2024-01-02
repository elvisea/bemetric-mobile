import { useCallback, useState } from "react";
import { Alert, BackHandler, FlatList } from "react-native";

import {
  useRoute,
  useNavigation,
  DrawerActions,
  useFocusEffect,
} from "@react-navigation/native";

import axios from "axios";

import api from "@services/api";
import { THEME } from "@theme/theme";

import { useCustomer } from "@hooks/customer";
import { useBluetooth } from "@hooks/bluetooth";

import { ListTitle } from "./styles";

import { IEquipment } from "./types";
import { response } from "./constants";
import { removerEquipamentosDuplicados } from "./utils";

import { ButtonFull } from "@components/ButtonFull";
import { LayoutDefault } from "@components/LayoutDefault";
import { HeaderDefault } from "@components/HeaderDefault";
import { EquipmentCard } from "@components/EquipmentCard";

export function EquipamentosDisponiveis() {
  const { customer } = useCustomer();
  const { navigate, dispatch } = useNavigation();

  const { connectedDevice, removeValues } = useBluetooth();

  const route = useRoute();
  const params = route.params as { chave: string };

  const [equipment, setEquipment] = useState<IEquipment[]>([]);
  const [selected, setSelected] = useState<IEquipment | null>(null);

  const handleMenu = () => dispatch(DrawerActions.openDrawer());

  const handleSelectedEquipment = (item: IEquipment) => {
    if (item.codigoEquipamento === selected?.codigoEquipamento) {
      setSelected(null);
    } else {
      setSelected(item);
    }
  };

  const handleAdvance = () => {
    if (selected) {
      navigate("ChooseGrouping");
    } else {
      navigate("AddEquipment", {
        chave: params.chave,
        serial: connectedDevice?.name || "",
      });
    }
  };

  async function handleSaveEquipment() {
    try {
      const { data } = await api.post("/AppMobile/Gravar", {
        codigoCliente: customer?.codigoCliente,
        incluirAgrupamento: false,

        incluirEquipamento: false,
        codigoEquipamento: selected?.codigoEquipamento,
        tipoEquipamento: selected?.tipoEquipamento,
        nomeEquipamento: selected?.nomeEquipamento,
        identificadorEquipamento: selected?.identificador,
        modeloEquipamento: selected?.modelo,
        placaEquipamento: selected?.placa,
        anoEquipamento: selected?.ano,
        serialDispositivo: connectedDevice && connectedDevice.name,
        chaveDispositivo: params.chave,
        horimetroIncialEquipamento: selected?.horimetroIncial,
        hodometroIncialEquipamento: selected?.hodometroIncial,
        dataAquisicaoEquipamento: selected?.dataAquisicao,

        codigoAgrupamento: 0, // APENAS se estiver SELECIONANDO o Agrupamento. Se nao 0
        nomeAgrupamento: "", // APENAS na INCLUSÃO de Agrupamento.
      });

      if (data.erro === 0) {
        Alert.alert(
          `${response[data.erro].title}`,
          `${response[data.erro].subtitle}`,
          [
            {
              text: "Mostrar Agrupamentos",
              onPress: () => navigate("Equipments"),
            },
          ],
        );
      } else {
        Alert.alert(
          `${response[data.erro].title}`,
          `${response[data.erro].subtitle}`,
        );
      }
    } catch (error) {
      if (axios.isAxiosError(error)) Alert.alert(`${error}`, `${error}`);
    }
  }

  const fetchEquipment = async () => {
    try {
      const response = await api.post(
        "/AppMobile/ObterListaEquipamentosNaoAssociados",
        {
          codigoCliente: customer?.codigoCliente,
        },
      );

      setEquipment(removerEquipamentosDuplicados(response.data));
    } catch (error) {
      if (axios.isAxiosError(error)) Alert.alert(`${error}`, `${error}`);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const handleBackPress = () => {
        removeValues();
        return false;
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        handleBackPress,
      );

      return () => {
        backHandler.remove();
      };
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      if (isActive) fetchEquipment();

      return () => {
        isActive = false;
      };
    }, []),
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
        contentContainerStyle={{ padding: 16, width: "100%" }}
        ListHeaderComponent={<ListTitle>Selecione um Equipamento</ListTitle>}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.codigoEquipamento.toString()}
        style={{ width: "100%" }}
        renderItem={({ item }) => (
          <EquipmentCard
            isSelected={item.codigoEquipamento === selected?.codigoEquipamento}
            placa={item.placa}
            identificador={item.identificador}
            nomeEquipamento={item.nomeEquipamento}
            tipoEquipamento={item.tipoEquipamento}
            onPress={() => handleSelectedEquipment(item)}
          />
        )}
      />

      <ButtonFull
        title={selected ? "Avançar" : "Adicionar equipamento"}
        onPress={selected ? handleSaveEquipment : handleAdvance}
      />
    </LayoutDefault>
  );
}
