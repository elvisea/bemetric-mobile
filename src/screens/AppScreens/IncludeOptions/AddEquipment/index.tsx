import { useCallback, useState } from "react";
import { Alert, TouchableOpacity, View } from "react-native";

import uuid from "react-native-uuid";

import {
  useRoute,
  useNavigation,
  DrawerActions,
  useFocusEffect,
} from "@react-navigation/native";

import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { ScrollView, Select, Text, VStack } from "native-base";

import DateTimePickerModal from "react-native-modal-datetime-picker";

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
import { inputs, resposta, schema } from "./constants";

import {
  Agrupamento,
  TypeForm,
  Typeparams,
  TypeGrouping,
  Data,
  ListaEquipamento,
} from "./types";

import { formatDate } from "@utils/formatDate";

import {
  adicionarChaveParaCadaAgrupamento,
  adicionarChaveParaCadaEquipamento,
} from "./utils";

export function AddEquipment() {
  const { user } = useAuth();
  const { customer } = useCustomer();

  const navigation = useNavigation();

  const route = useRoute();
  const params = route.params as Typeparams;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TypeForm>({
    defaultValues: { deviceSerial: params.serial, devicekey: params.chave },
    resolver: yupResolver(schema),
  });

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectDate, setSelectDate] = useState(false);

  const [acquisitionDate, setDataAquisicao] = useState<Date>(new Date());

  const [data, setData] = useState<Data>({
    agrupamentos: [],
    equipamentos: [],
  });

  const [typeSelected, setTypeSelected] = useState("");
  const [novoAgrupamento, setNovoAgrupamento] = useState("");

  const [agrupamentoSelecionado, setAgrupamentoSelecionado] =
    useState<Agrupamento>({} as Agrupamento);

  const handleMenu = () => navigation.dispatch(DrawerActions.openDrawer());

  const handleSelectAcquisitionDate = (date: Date) => {
    setSelectDate(false);
    setDataAquisicao(date);
  };

  const fetchData = async () => {
    try {
      const response = await Promise.all([
        api.post<TypeGrouping[]>("/Agrupamento/ObterLista", {
          localDashboard: 3,
          codigoUsuario: user?.codigoUsuario,
          codigoCliente: customer?.codigoCliente,
        }),

        api.post<ListaEquipamento[]>("/Equipamento/ObterListaFiltroTipo", {
          codigoCliente: customer?.codigoCliente,
        }),
      ]);

      const agrupamentos = adicionarChaveParaCadaAgrupamento(response[0].data);
      const equipamentos = adicionarChaveParaCadaEquipamento(response[1].data);

      setData({ agrupamentos, equipamentos });
    } catch (error) {
      Alert.alert(
        "Erro de Comunicação",
        "Não foi possível completar a solicitação. Por favor, tente novamente mais tarde.",
      );
    }
  };

  const selecionarAgrupamento = (selected: string) => {
    const agrupamentoEncontrado = data.agrupamentos.find(
      (item) => item.nome.toLowerCase() === selected.toLowerCase(),
    );
    if (agrupamentoEncontrado) {
      setAgrupamentoSelecionado(agrupamentoEncontrado);
    }
  };

  const salvarNovoAgrupamento = () => {
    setIsOpenModal(!isOpenModal);

    const agrupamentos = [...data.agrupamentos];

    const itemEncontrado = agrupamentos.find(
      (item) => item.nome.toLowerCase() === novoAgrupamento.toLowerCase(),
    );

    if (!itemEncontrado) {
      const item = {
        nome: novoAgrupamento.toLowerCase(),
        novo: true,
        codigo: Math.floor(Math.random() * 1000),
        key: uuid.v4().toString(),
      };

      agrupamentos.push(item);

      setData((oldState) => ({ ...oldState, agrupamentos: agrupamentos }));

      setAgrupamentoSelecionado(item);
    }
  };

  const handleCancelNewGrouping = () => {
    setNovoAgrupamento("");
    setIsOpenModal(!isOpenModal);
  };

  const handleSelectTypeEquipment = (selected: string) => {
    const selectedType = data.equipamentos.find(
      (item) => item.tipo.toLowerCase() === selected.toLowerCase(),
    );
    if (selectedType) setTypeSelected(selectedType.tipo.toLowerCase());
  };

  async function handleSaveEquipment(form: TypeForm) {
    try {
      const { data } = await api.post("/AppMobile/Gravar", {
        codigoCliente: customer?.codigoCliente,
        incluirAgrupamento: agrupamentoSelecionado.novo === true ? true : false,

        nomeAgrupamento: agrupamentoSelecionado.nome.trim(),

        codigoAgrupamento:
          agrupamentoSelecionado.novo === true
            ? 0
            : agrupamentoSelecionado.codigo,

        incluirEquipamento: true,
        tipoEquipamento: typeSelected.trim(),
        nomeEquipamento: form.equipmentName.trim(),
        identificadorEquipamento: form.equipmentIdentifier.trim(),
        modeloEquipamento: form.equipmentModel.trim(),
        placaEquipamento: form.equipmentPlate.trim(),
        anoEquipamento: form.equipmentYear.trim(),
        serialDispositivo: form.deviceSerial.trim(),
        chaveDispositivo: form.devicekey.trim(),
        horimetroIncialEquipamento: Number(form.initialHourMeter),
        hodometroIncialEquipamento: Number(form.initialOdometer),
        dataAquisicaoEquipamento: formatDate(acquisitionDate).send,
      });

      if (data.erro === 0) {
        Alert.alert(
          `${resposta[data.erro].title}`,
          `${resposta[data.erro].subtitle}`,
          [
            {
              text: "Mostrar Equipamentos",
              onPress: () => navigation.navigate("Equipments"),
            },
          ],
        );
      } else {
        Alert.alert(
          `${resposta[data.erro].title}`,
          `${resposta[data.erro].subtitle}`,
        );
      }
    } catch (error) {
      Alert.alert(
        "Erro de Comunicação",
        "Não foi possível completar a solicitação. Por favor, tente novamente mais tarde.",
      );
    }
  }

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      if (isActive) {
        fetchData();
      }

      return () => {
        isActive = false;
      };
    }, []),
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
          value={novoAgrupamento}
          onChangeText={(text) => setNovoAgrupamento(text)}
          color={"#363636"}
          _focus={{ borderColor: "blue.700", bg: "white" }}
          variant="outline"
          placeholder="Nome"
          fontSize={`${RFValue(14)}px`}
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
            onPress={salvarNovoAgrupamento}
          />
        </View>
      </GenericModal>

      <LayoutDefault
        bg={THEME.colors.shape}
        firstIcon="menu"
        handleFirstIcon={handleMenu}
      >
        <HeaderDefault title="Adicionar Equipamento" />

        <ScrollView w="full" showsVerticalScrollIndicator={false}>
          <VStack
            flex={1}
            w="full"
            px={`${RFValue(16)}px`}
            py={`${RFValue(24)}px`}
          >
            <Text
              color="blue.700"
              fontFamily="Roboto_400Regular"
              fontSize={`${RFValue(14)}px`}
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
                fontSize={`${RFValue(14)}px`}
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
                onValueChange={(selected) => selecionarAgrupamento(selected)}
              >
                {data.agrupamentos.length > 0 &&
                  data.agrupamentos.map((item) => (
                    <Select.Item
                      key={item.key}
                      value={item.nome.toLowerCase()}
                      label={item.nome.toUpperCase()}
                      alignItems="center"
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
              mt={`${RFValue(16)}px`}
              color="blue.700"
              fontSize={`${RFValue(14)}px`}
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
              fontSize={`${RFValue(14)}px`}
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
              {data.equipamentos.length > 0 &&
                data.equipamentos.map((item) => (
                  <Select.Item
                    key={item.key}
                    value={item.tipo.toLowerCase()}
                    label={item.tipo.toUpperCase()}
                    alignItems="center"
                  />
                ))}
            </Select>

            {inputs.map((input) => (
              <VStack width={"full"} key={input.id}>
                <Text
                  mt={`${RFValue(16)}px`}
                  color="blue.700"
                  fontSize={`${RFValue(14)}px`}
                  fontFamily="Roboto_400Regular"
                  marginBottom={`${RFValue(8)}px`}
                >
                  {input.title}
                </Text>

                <Controller
                  control={control}
                  name={input.name}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      py={0}
                      borderBottomColor="blue.700"
                      _input={{
                        color: "#333333",
                        fontSize: `${RFValue(14)}px`,
                        fontFamily: "Roboto_400Regular",
                      }}
                      value={value}
                      onChangeText={onChange}
                      keyboardType={input.keyboardType}
                      errorMessage={errors[input.name]?.message}
                    />
                  )}
                />
              </VStack>
            ))}

            <Text
              mt={`${RFValue(16)}px`}
              color="blue.700"
              fontSize={`${RFValue(14)}px`}
              fontFamily="Roboto_400Regular"
              marginBottom={`${RFValue(8)}px`}
            >
              Data Aquisição
            </Text>

            <TouchableOpacity
              activeOpacity={0.75}
              style={styles.buttonDate}
              onPress={() => setSelectDate(true)}
            >
              <Text
                color="#363636"
                fontSize={`${RFValue(14)}px`}
                fontFamily="Roboto_400Regular"
              >
                {formatDate(acquisitionDate).show}
              </Text>
            </TouchableOpacity>

            <DateTimePickerModal
              isVisible={selectDate}
              mode="date"
              date={acquisitionDate}
              maximumDate={new Date()}
              onCancel={() => setSelectDate(false)}
              onConfirm={handleSelectAcquisitionDate}
            />
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
