import { useCallback, useState } from "react";
import { Alert, FlatList } from "react-native";

import {
  useRoute,
  useNavigation,
  DrawerActions,
  useFocusEffect,
} from "@react-navigation/native";

import api from "@services/api";
import { THEME } from "@theme/theme";

import { useCustomer } from "@hooks/customer";
import { useBluetooth } from "@hooks/bluetooth";

import { ListTitle } from "./styles";

import { response } from "./constants";
import { TypeEquipment } from "./types";

import { adicionarChaveParaCadaEquipamento } from "./utils";

import { ButtonFull } from "@components/ButtonFull";
import { LayoutDefault } from "@components/LayoutDefault";
import { HeaderDefault } from "@components/HeaderDefault";
import { EquipmentCard } from "@components/EquipmentCard";

export function EquipamentosDisponiveis() {
  const { customer } = useCustomer();
  const { navigate, dispatch } = useNavigation();

  const context = useBluetooth();

  const route = useRoute();
  const params = route.params as { chave: string };

  const [equipmentList, setEquipmentList] = useState<TypeEquipment[]>([]);
  const [selectedEquipment, setSelectedEquipment] =
    useState<TypeEquipment | null>(null);

  const handleMenu = () => dispatch(DrawerActions.openDrawer());

  const handleSelectedEquipment = (item: TypeEquipment) => {
    if (item.codigoEquipamento === selectedEquipment?.codigoEquipamento) {
      setSelectedEquipment(null);
    } else {
      setSelectedEquipment(item);
    }
  };

  const handleAdvance = () => {
    if (selectedEquipment) {
      navigate("ChooseGrouping");
    } else {
      navigate("AddEquipment", {
        chave: params.chave,
        serial: context.device?.name || "",
      });
    }
  };

  async function handleSaveEquipment() {
    if (selectedEquipment) {
      try {
        const { data } = await api.post("/AppMobile/Gravar", {
          codigoCliente: customer?.codigoCliente,
          incluirAgrupamento: false,

          incluirEquipamento: false,
          codigoEquipamento: selectedEquipment.codigoEquipamento,
          tipoEquipamento: selectedEquipment.tipoEquipamento,
          nomeEquipamento: selectedEquipment.nomeEquipamento,
          identificadorEquipamento: selectedEquipment.identificador,
          modeloEquipamento: selectedEquipment.modelo,
          placaEquipamento: selectedEquipment.placa,
          anoEquipamento: selectedEquipment.ano,
          serialDispositivo: context.device && context.device.name,
          chaveDispositivo: params.chave,
          horimetroIncialEquipamento: selectedEquipment.horimetroIncial,
          hodometroIncialEquipamento: selectedEquipment.hodometroIncial,
          dataAquisicaoEquipamento: selectedEquipment.dataAquisicao,

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
        Alert.alert(
          "Erro de Comunicação",
          "Não foi possível completar a solicitação. Por favor, tente novamente mais tarde.",
        );
      }
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

      setEquipmentList(adicionarChaveParaCadaEquipamento(response.data));
    } catch (error) {
      Alert.alert(
        "Erro de Comunicação",
        "Não foi possível completar a solicitação. Por favor, tente novamente mais tarde.",
      );
    }
  };

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
        data={equipmentList}
        contentContainerStyle={{ padding: 16, width: "100%" }}
        ListHeaderComponent={<ListTitle>Selecione um Equipamento</ListTitle>}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.key}
        style={{ width: "100%" }}
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
        onPress={selectedEquipment ? handleSaveEquipment : handleAdvance}
      />
    </LayoutDefault>
  );
}
