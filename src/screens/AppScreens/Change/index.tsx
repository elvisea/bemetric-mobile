import { Alert } from "react-native";
import { useCallback, useState } from "react";
import { Center, FlatList, HStack, Text, VStack } from "native-base";

import {
  useNavigation,
  DrawerActions,
  useFocusEffect,
} from "@react-navigation/native";

import { FontAwesome } from "@expo/vector-icons";

import axios from "axios";
import { RFValue } from "react-native-responsive-fontsize";

import api from "@services/api";

import { THEME } from "@theme/theme";
import { useCustomer } from "@hooks/customer";

import { Button } from "@components/Button";
import { GenericModal } from "@components/GenericModal";

import { initialState } from "./constants";

import { LayoutDefault } from "@components/LayoutDefault";
import { HeaderDefault } from "@components/HeaderDefault";
import { LoadingSpinner } from "@components/LoadingSpinner";
import { EquipmentCard } from "@components/Change/EquipmentCard";

export function Change() {
  const navigation = useNavigation();
  const { customer } = useCustomer();

  const handleMenu = () => navigation.dispatch(DrawerActions.openDrawer());

  const [state, setState] = useState(initialState);

  const handleSelectEquipment = (equipment: typeof state.selected) => {
    setState((prevState) => ({
      ...prevState,
      selected: equipment,
      isOpenModal: true,
    }));
  };

  const closeModal = () => {
    setState((prevState) => ({ ...prevState, isOpenModal: false }))
  }

  const unlinkEquipment = async () => {
    try {
      setState((prevState) => ({ ...prevState, isLoading: true }));
      const response = await api.put(
        "/AppMobile/DesvincularDispositivoEquipamento",
        {
          codigoEquipamento: state.selected?.codigoEquipamento,
        },
      );

      if (response.data === 0) {
        setState((prevState) => ({ ...prevState, action: "vincular" }));
      }

      if (response.data === 1) {
        Alert.alert(
          state.messages[response.data].title,
          state.messages[response.data].subtitle,
        );
      }

      if (response.data === 2) {
        Alert.alert(
          state.messages[response.data].title,
          state.messages[response.data].subtitle,
        );
      }
    } catch (error) {
      Alert.alert(state.messages[3].title, state.messages[3].subtitle);
    } finally {
      setState((prevState) => ({ ...prevState, isLoading: false }));
    }
  };

  const linkEquipment = () => {
    navigation.navigate("ConfigurarConexaoBluetooth");
  };

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      async function fetchData() {
        try {
          if (customer) {
            setState((prevState) => ({ ...prevState, isLoading: true }));
            const response = await api.post(
              "/AppMobile/ObterListaEquipamentosAssociados",
              {
                codigoCliente: customer.codigoCliente,
              },
            );

            isActive &&
              setState((prevState) => ({
                ...prevState,
                equipments: response.data,
              }));
          }
        } catch (error) {
          Alert.alert(state.messages[3].title, state.messages[3].subtitle);
        } finally {
          setState((prevState) => ({ ...prevState, isLoading: false }));
        }
      }

      fetchData();

      return () => {
        isActive = false;
      };
    }, []),
  );

  return (
    <>
      <GenericModal
        title={
          state.action === "desvincular"
            ? "Desvincular Equipamento"
            : "Vincular Equipamento"
        }
        isOpen={state.isOpenModal}
        closeModal={closeModal}
      >
        <Center w="full">
          <Text
            mb={`${RFValue(24)}px`}
            fontSize={`${RFValue(14)}px`}
            fontFamily={THEME.fonts.Roboto_400Regular}
          >
            {state.action === "desvincular"
              ? `O dispositivo ${state.selected?.dispositivoSerial.toUpperCase()} está vinculado ao equipamento ${state.selected?.nomeEquipamento.toUpperCase()}`
              : "Equipamento desvinculado com sucesso!"}
          </Text>

          <Text
            fontSize={`${RFValue(14)}px`}
            fontFamily={THEME.fonts.Roboto_400Regular}
          >
            {state.action === "desvincular"
              ? "Deseja Desvincular?"
              : `Deseja vincular um novo dispositivo para o equipamento ${state.selected?.nomeEquipamento.toUpperCase()}?`}
          </Text>
        </Center>

        <HStack w="full" mt={`${RFValue(28)}px`} justifyContent="space-between">
          <Button
            title="SIM"
            width="48%"
            isLoading={state.isLoading}
            isDisabled={state.isLoading}
            onPress={
              state.action === "desvincular" ? unlinkEquipment : linkEquipment
            }
            h={`${RFValue(50)}px`}
            _pressed={{
              background: THEME.colors.blue[700],
            }}
          />

          <Button
            title="NÃO"
            width="48%"
            isDisabled={state.isLoading}
            bg={THEME.colors.white}
            borderWidth={`${RFValue(1)}px`}
            borderColor={THEME.colors.blue[700]}
            color={THEME.colors.blue[700]}
            onPress={closeModal}
            h={`${RFValue(50)}px`}
            _pressed={{
              background: "white",
            }}
          />
        </HStack>
      </GenericModal>

      <LayoutDefault
        bg={THEME.colors.shape}
        firstIcon="menu"
        handleFirstIcon={handleMenu}
      >
        <HeaderDefault title="Selecione o equipamento" />

        {state.isLoading && <LoadingSpinner color={THEME.colors.blue[700]} />}

        {!state.isLoading && (
          <VStack py={`${RFValue(16)}px`} px={`${RFValue(16)}px`} width="full">
            <FlatList
              data={state.equipments}
              style={{ width: "100%" }}
              keyExtractor={(item) => item.codigoEquipamento.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <EquipmentCard
                  onPress={() => handleSelectEquipment(item)}
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
        )}
      </LayoutDefault>
    </>
  );
}
