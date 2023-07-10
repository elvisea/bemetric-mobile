import { Alert, TouchableOpacity, View } from "react-native";

import { useCallback, useState } from "react";

import {
  useNavigation,
  DrawerActions,
  useFocusEffect,
} from "@react-navigation/native";

import axios from "axios";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { ScrollView, Select, Text, VStack } from "native-base";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

import api from "@services/api";
import { THEME } from "@theme/theme";

import { useAuth } from "@hooks/authentication";
import { useCustomer } from "@hooks/customer";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { ButtonFull } from "@components/ButtonFull";
import { GenericModal } from "@components/GenericModal";
import { HeaderDefault } from "@components/HeaderDefault";
import { LayoutDefault } from "@components/LayoutDefault";

import { styles } from "./styles";

import { inputs } from "./constants/inputs";
import { schema } from "./constants/schema";
import { response } from "./constants/response";

import { IGrouping, ITypeForm, ITypesEquipment } from "./types";

export function AddEquipment() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ITypeForm>({
    resolver: yupResolver(schema),
  });

  const navigation = useNavigation();

  const { user } = useAuth();
  const { customer } = useCustomer();

  const [isOpenModal, setIsOpenModal] = useState(false);

  const [groupings, setGroupings] = useState<IGrouping[]>([]);
  const [typesEquipment, setTypesEquipment] = useState<ITypesEquipment[]>([]);

  const [newGrouping, setNewGrouping] = useState("");
  const [typeSelected, setTypeSelected] = useState("");

  const [selectedGrouping, setSelectedGrouping] = useState<IGrouping>(
    {} as IGrouping
  );

  const handleMenu = () => navigation.dispatch(DrawerActions.openDrawer());

  const fetchGrouping = async () => {
    try {
      const response = await api.post("/Agrupamento/ObterLista", {
        codigoUsuario: user?.codigoUsuario,
        codigoCliente: customer?.codigoCliente,
        localDashboard: 3,
      });

      setGroupings(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) Alert.alert(`${error}`, `${error}`);
    }
  };

  const fetchTypesEquipment = async () => {
    try {
      const response = await api.post("/Equipamento/ObterListaFiltroTipo", {
        codigoCliente: customer?.codigoCliente,
      });

      setTypesEquipment(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) Alert.alert(`${error}`, `${error}`);
    }
  };

  const handleSelectGrouping = (selected: string) => {
    const selectedGrouping = groupings.find(
      (grouping) => grouping.nomeAgrupamento === selected
    );
    if (selectedGrouping) setSelectedGrouping(selectedGrouping);
  };

  const handleSaveNewGrouping = () => {
    setIsOpenModal(!isOpenModal);

    const lista = groupings;

    lista.push({ nomeAgrupamento: newGrouping });
    setGroupings(lista);

    setSelectedGrouping({
      nomeAgrupamento: newGrouping,
      codigoAgrupamento: 200,
    });
  };

  const handleCancelNewGrouping = () => {
    setNewGrouping("");
    setIsOpenModal(!isOpenModal);
  };

  const handleSelectTypeEquipment = (selected: string) => {
    const selectedType = typesEquipment.find(
      (type) => type.tipoEquipamento === selected
    );
    if (selectedType) setTypeSelected(selectedType.tipoEquipamento);
  };

  async function handleSaveEquipment(form: ITypeForm) {
    try {
      const { data } = await api.post("/AppMobile/Gravar", {
        codigoCliente: customer?.codigoCliente,
        incluirAgrupamento: newGrouping === "" ? false : true,

        incluirEquipamento: true,
        tipoEquipamento: typeSelected,
        nomeEquipamento: form.equipmentName,
        identificadorEquipamento: form.equipmentIdentifier,
        modeloEquipamento: form.equipmentModel,
        placaEquipamento: form.equipmentPlate,
        anoEquipamento: form.equipmentYear,
        serialDispositivo: form.deviceSerial,
        chaveDispositivo: form.devicekey,
        horimetroIncialEquipamento: Number(form.initialHourMeter),
        hodometroIncialEquipamento: Number(form.initialOdometer),
        dataAquisicaoEquipamento: "2023-06-28T14:00",

        codigoAgrupamento:
          newGrouping === "" ? 0 : selectedGrouping.codigoAgrupamento, // APENAS se estiver SELECIONANDO o Agrupamento. Se nao 0
        nomeAgrupamento: newGrouping === "" ? "" : newGrouping, // APENAS na INCLUSÃO de Agrupamento.
      });

      if (data.erro === 0) {
        Alert.alert(
          `${response[data.erro].title}`,
          `${response[data.erro].subtitle}`,
          [
            {
              text: "Mostrar Equipamentos",
              onPress: () => navigation.navigate("Equipments"),
            },
          ]
        );
      } else {
        Alert.alert(
          `${response[data.erro].title}`,
          `${response[data.erro].subtitle}`
        );
      }
    } catch (error) {
      if (axios.isAxiosError(error)) Alert.alert(`${error}`, `${error}`);
    }
  }

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      if (isActive) {
        fetchGrouping();
        fetchTypesEquipment();
      }

      return () => {
        isActive = false;
      };
    }, [])
  );

  return (
    <>
      <GenericModal
        title="Criar Agrupamento"
        isOpen={isOpenModal}
        closeModal={() => setIsOpenModal(!isOpenModal)}
      >
        <Input
          mb={4}
          value={newGrouping}
          onChangeText={(text) => setNewGrouping(text)}
          color={"#363636"}
          _focus={{ borderColor: "blue.700", bg: "white" }}
          variant="outline"
          placeholder="Nome"
          fontSize="14px"
          borderBottomColor="blue.700"
          placeholderTextColor={"blue.700"}
        />

        <View style={styles.containerButtons}>
          <Button
            h={`${RFValue(48)}px`}
            bg={THEME.colors.white}
            borderWidth={"1px"}
            borderColor={THEME.colors.red[600]}
            title="Cancelar"
            width="48%"
            onPress={handleCancelNewGrouping}
            color={THEME.colors.red[600]}
          />

          <Button
            h={`${RFValue(48)}px`}
            title="Salvar"
            width="48%"
            onPress={handleSaveNewGrouping}
          />
        </View>
      </GenericModal>

      <LayoutDefault
        bg={THEME.colors.shape}
        firstIcon="menu"
        handleFirstIcon={handleMenu}
      >
        <HeaderDefault title="Adicionar Equipamento" />

        <ScrollView w="full">
          <VStack
            flex={1}
            w="full"
            px={`${RFValue(16)}px`}
            py={`${RFValue(24)}px`}
          >
            <Text
              color="blue.700"
              fontFamily="Roboto_400Regular"
              fontSize={`${RFValue(13)}px`}
              marginBottom={`${RFValue(12)}px`}
            >
              Escolher Agrupamento
            </Text>

            <View style={styles.containerSelect}>
              <Select
                p="0"
                h={`${RFValue(30)}px`}
                minWidth="84%"
                accessibilityLabel="Escolher agrupamento"
                fontSize={`${RFValue(16)}px`}
                fontFamily={THEME.fonts.Roboto_400Regular}
                color={"#333333"}
                dropdownIcon={
                  <Feather
                    name="chevron-down"
                    size={24}
                    color={THEME.colors.blue[700]}
                  />
                }
                borderRadius={0}
                borderTopWidth={0}
                borderLeftWidth={0}
                borderRightWidth={0}
                borderBottomColor="blue.700"
                onValueChange={(selected) => handleSelectGrouping(selected)}
              >
                {typesEquipment.length > 0 &&
                  groupings.map((grouping) => (
                    <Select.Item
                      key={grouping.codigoAgrupamento}
                      alignItems="center"
                      value={grouping.nomeAgrupamento.toString()}
                      label={grouping.nomeAgrupamento}
                    />
                  ))}
              </Select>

              <TouchableOpacity
                style={styles.buttonPlus}
                onPress={() => setIsOpenModal(!isOpenModal)}
              >
                <Feather
                  name="plus-circle"
                  size={40}
                  color={THEME.colors.blue[700]}
                />
              </TouchableOpacity>
            </View>

            <Text
              mt={`${RFValue(24)}px`}
              color="blue.700"
              fontSize={`${RFValue(13)}px`}
              fontFamily="Roboto_400Regular"
              marginBottom={`${RFValue(12)}px`}
            >
              Tipo
            </Text>

            <Select
              p="0"
              h="30px"
              minWidth="100%"
              accessibilityLabel="Escolher tipo equipamento"
              fontSize="16px"
              fontFamily={THEME.fonts.Roboto_400Regular}
              color={"#333333"}
              dropdownIcon={
                <Feather
                  name="chevron-down"
                  size={24}
                  color={THEME.colors.blue[700]}
                />
              }
              borderTopWidth={0}
              borderLeftWidth={0}
              borderRightWidth={0}
              borderRadius={0}
              borderBottomColor="blue.700"
              onValueChange={(selected) => handleSelectTypeEquipment(selected)}
            >
              {typesEquipment.length > 0 &&
                typesEquipment.map((customer) => (
                  <Select.Item
                    key={customer.tipoEquipamento}
                    alignItems="center"
                    value={customer.tipoEquipamento.toString()}
                    label={customer.tipoEquipamento}
                  />
                ))}
            </Select>

            {inputs.map((input) => (
              <>
                <Text
                  key={input.id}
                  mt={`${RFValue(24)}px`}
                  color="blue.700"
                  fontSize="13px"
                  marginBottom="12px"
                  fontFamily="Roboto_400Regular"
                >
                  {input.title}
                </Text>

                <Controller
                  control={control}
                  name={input.name}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      py={0}
                      keyboardType={input.keyboardType}
                      borderBottomColor="blue.700"
                      _input={{
                        color: "#333333",
                        fontSize: "16px",
                        fontFamily: "Roboto_400Regular",
                      }}
                      value={value}
                      onChangeText={onChange}
                      errorMessage={errors[input.name]?.message}
                    />
                  )}
                />
              </>
            ))}
          </VStack>
        </ScrollView>

        <ButtonFull
          title="AVANÇAR"
          onPress={handleSubmit(handleSaveEquipment)}
        />
      </LayoutDefault>
    </>
  );
}
