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

import { IEquipamento } from "./types";
import { responses } from "./constants";

import { LayoutDefault } from "@components/LayoutDefault";
import { HeaderDefault } from "@components/HeaderDefault";
import { LoadingSpinner } from "@components/LoadingSpinner";
import { EquipmentCard } from "@components/Change/EquipmentCard";

export function Change() {
  const navigation = useNavigation();
  const { customer } = useCustomer();

  const handleMenu = () => navigation.dispatch(DrawerActions.openDrawer());

  const [isLoading, setIsLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [equipments, setEquipments] = useState<IEquipamento[] | null>(null);

  const [selectedEquipment, setSelectedEquipment] =
    useState<IEquipamento | null>(null);

  const [action, setAction] = useState<"vincular" | "desvincular">(
    "desvincular"
  );

  const handleSelectEquipment = (equipment: IEquipamento) => {
    setSelectedEquipment(equipment);
    setIsOpenModal(true);
  };

  const desvincular = async () => {
    try {
      setIsLoading(true);
      const response = await api.put(
        "/AppMobile/DesvincularDispositivoEquipamento",
        {
          codigoEquipamento: selectedEquipment?.codigoEquipamento,
        }
      );

      if (response.data === 0) {
        setAction("vincular");
      }

      if (response.data === 1) {
        Alert.alert(
          responses[response.data].title,
          responses[response.data].subtitle
        );
      }

      if (response.data === 2) {
        Alert.alert(
          responses[response.data].title,
          responses[response.data].subtitle
        );
      }

      console.log(response.data);
    } catch (error) {
      console.log(error);

      if (axios.isAxiosError(error)) Alert.alert(`${error}`, `${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const vincular = () => {
    navigation.navigate("ConfigurarConexaoBluetooth");
  };

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      async function fetchData() {
        try {
          if (customer) {
            setIsLoading(true);
            const response = await api.post(
              "/AppMobile/ObterListaEquipamentosAssociados",
              {
                codigoCliente: customer.codigoCliente,
              }
            );

            isActive && setEquipments(response.data);
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
    <>
      <GenericModal
        title={
          action === "desvincular"
            ? "Desvincular Equipamento"
            : "Vincular Equipamento"
        }
        isOpen={isOpenModal}
        closeModal={() => setIsOpenModal(false)}
      >
        <Center w="full">
          <Text
            mb={`${RFValue(24)}px`}
            fontSize={`${RFValue(14)}px`}
            fontFamily={THEME.fonts.Roboto_400Regular}
          >
            {action === "desvincular"
              ? `O dispositivo ${selectedEquipment?.dispositivoSerial.toUpperCase()} está vinculado ao equipamento ${selectedEquipment?.nomeEquipamento.toUpperCase()}`
              : "Equipamento desvinculado com sucesso!"}
          </Text>

          <Text
            fontSize={`${RFValue(14)}px`}
            fontFamily={THEME.fonts.Roboto_400Regular}
          >
            {action === "desvincular"
              ? "Deseja Desvincular?"
              : `Deseja vincular um novo dispositivo para o equipamento ${selectedEquipment?.nomeEquipamento.toUpperCase()}?`}
          </Text>
        </Center>

        <HStack w="full" mt={`${RFValue(28)}px`} justifyContent="space-between">
          <Button
            title="SIM"
            width="48%"
            isLoading={isLoading}
            isDisabled={isLoading}
            onPress={action === "desvincular" ? desvincular : vincular}
            h={`${RFValue(50)}px`}
            _pressed={{
              background: THEME.colors.blue[700],
            }}
          />

          <Button
            title="NÃO"
            width="48%"
            isDisabled={isLoading}
            bg={THEME.colors.white}
            borderWidth={`${RFValue(1)}px`}
            borderColor={THEME.colors.blue[700]}
            color={THEME.colors.blue[700]}
            onPress={() => setIsOpenModal(false)}
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

        {isLoading && <LoadingSpinner color={THEME.colors.blue[700]} />}

        {!isLoading && (
          <VStack py={`${RFValue(16)}px`} px={`${RFValue(16)}px`} width="full">
            <FlatList
              data={equipments}
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
