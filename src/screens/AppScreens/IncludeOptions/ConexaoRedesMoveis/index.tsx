import { useCallback, useState } from "react";
import { Alert, BackHandler, FlatList } from "react-native";

import {
  useRoute,
  useNavigation,
  DrawerActions,
  useFocusEffect,
} from "@react-navigation/native";

import { Text, VStack } from "native-base";
import { RFValue } from "react-native-responsive-fontsize";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

import { THEME } from "@theme/theme";
import { generateResponse } from "@utils/bluetooth";

import { useBluetooth } from "@hooks/bluetooth";
import BluetoothManager from "@manager/bluetooth";

import { Input } from "@components/Input";
import { ButtonFull } from "@components/ButtonFull";
import { LayoutDefault } from "@components/LayoutDefault";
import { HeaderDefault } from "@components/HeaderDefault";
import { LoadingSpinner } from "@components/LoadingSpinner";

import { TypeForm } from "./types";
import { initialState, inputs, schema } from "./constants";

const bluetoothManager = BluetoothManager.getInstance();

export function ConexaoRedesMoveis() {
  const route = useRoute();
  const navigation = useNavigation();

  const context = useBluetooth();

  const params = route.params as { chave: string };

  const [state, setState] = useState(initialState);

  const handleMenu = () => navigation.dispatch(DrawerActions.openDrawer());

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TypeForm>({
    resolver: yupResolver(schema),
  });

  const handleNextPage = async (data: TypeForm) => {
    if (context.device) {
      setState((previousState) => ({ ...previousState, isLoading: true }));

      const COMMAND = {
        BT_PASSWORD: params.chave,
        SET_MODEM_APN: data.ponto,
        SET_MODEM_USER: data.usuario,
        SET_MODEM_PWD: data.senha,
      };

      await bluetoothManager.writeCharacteristic(COMMAND);
    }
  };

  const handleGoToNextScreen = () => {
    navigation.navigate("EquipamentosDisponiveis", {
      chave: params.chave,
    });

    setState(initialState);
  };

  const onValueChange = () => {
    const response = generateResponse(state.values);

    if (Object.entries(response).length > 0) {
      setState((previousState) => ({ ...previousState, isLoading: false }));
      Alert.alert("Conectado com Sucesso.", "Conectado com Sucesso.", [
        {
          text: "Continuar cadastro.",
          onPress: () => handleGoToNextScreen(),
        },
      ]);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (state.values.length > 0) onValueChange();
    }, [state.values]),
  );

  const addValueReceived = (value: string) => {
    setState((previousState) => ({
      ...previousState,
      values: [...previousState.values, value],
    }));
  };

  useFocusEffect(
    useCallback(() => {
      const startMonitoring = async () => {
        if (context.device) {
          const subscription =
            await bluetoothManager.monitorCharacteristic(addValueReceived);

          return () => {
            subscription?.remove();
          };
        }
      };

      startMonitoring();
    }, [context.device]),
  );

  useFocusEffect(
    useCallback(() => {
      const handleBackPress = () => {
        setState(initialState);
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

  return (
    <LayoutDefault
      bg={THEME.colors.shape}
      firstIcon="menu"
      handleFirstIcon={handleMenu}
    >
      {state.isLoading && <HeaderDefault title="Conexão Redes Móveis" />}

      {state.isLoading && <LoadingSpinner color={THEME.colors.blue[700]} />}

      {!state.isLoading && (
        <VStack flex={1} w="full" px={`${RFValue(16)}px`}>
          <FlatList
            data={inputs}
            style={{ width: "100%" }}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item: input }) => (
              <>
                <Text
                  mt={`${RFValue(16)}px`}
                  color="blue.700"
                  fontSize={`${RFValue(13)}px`}
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
                        fontSize: "16px",
                        fontFamily: "Roboto_400Regular",
                      }}
                      value={value}
                      onChangeText={onChange}
                      keyboardType={input.keyboardType}
                      errorMessage={errors[input.name]?.message}
                    />
                  )}
                />
              </>
            )}
          />
        </VStack>
      )}

      {!state.isLoading && (
        <ButtonFull title="Salvar" onPress={handleSubmit(handleNextPage)} />
      )}
    </LayoutDefault>
  );
}
