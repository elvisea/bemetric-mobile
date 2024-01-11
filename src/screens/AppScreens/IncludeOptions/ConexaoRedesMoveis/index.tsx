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

import { TypeAction, TypeForm } from "./types";
import { initialState, inputs, responses, schema } from "./constants";

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

  const resetState = () => setState(initialState);

  const sendCommand = async (command: object, time?: number) => {
    try {
      if (context.device) {
        setState({ isLoading: true, values: [] });

        setTimeout(async () => {
          await bluetoothManager.writeCharacteristic(command);
        }, time);
      }
    } catch (error) {
      resetState();
      console.error("Error when trying to write features.", error);
    }
  };

  const handleNextPage = async (data: TypeForm) => {
    const COMMAND = {
      BT_PASSWORD: params.chave,
      SET_MODEM_APN: data.ponto,
      SET_MODEM_USER: data.usuario,
      SET_MODEM_PWD: data.senha,
    };
    await sendCommand(COMMAND);
  };

  const getStatusConnection = async () => {
    const COMMAND = {
      BT_PASSWORD: params.chave.trim(),
      GET_MODEM_SIGNAL: "",
    };
    await sendCommand(COMMAND, 4000);
  };

  const handleGoToNextScreen = () => {
    navigation.navigate("EquipamentosDisponiveis", {
      chave: params.chave,
    });
  };

  const handleAction = ({ response, action }: TypeAction) => {
    resetState();
    Alert.alert(response.title, response.subtitle, [
      {
        text: response.text,
        onPress: () => (action ? action() : {}),
      },
    ]);
  };

  const onValueChange = () => {
    const response = generateResponse<{ [key: string]: string }>(state.values);

    switch (response.SET_TRANSM_MODE) {
      case "MODEM":
        getStatusConnection();
        break;
    }

    switch (response.GET_MODEM_SIGNAL) {
      case "OK":
        handleAction({
          response: responses[0],
          action: () => handleGoToNextScreen(),
        });
        break;

      case "NOK":
        handleAction({ response: responses[4] });
        break;

      case "BUSY":
        handleAction({ response: responses[5] });
        break;
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
            resetState();
          };
        }
      };

      startMonitoring();
    }, [context.device]),
  );

  useFocusEffect(
    useCallback(() => {
      const handleBackPress = () => {
        resetState();
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
