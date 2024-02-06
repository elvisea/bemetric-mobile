import { useCallback, useState } from "react";
import { Alert, BackHandler, FlatList } from "react-native";

import {
  useNavigation,
  DrawerActions,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";

import { Text, VStack } from "native-base";
import { RFValue } from "react-native-responsive-fontsize";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

import { Input } from "@components/Input";
import { ButtonFull } from "@components/ButtonFull";
import { LayoutDefault } from "@components/LayoutDefault";
import { HeaderDefault } from "@components/HeaderDefault";
import { LoadingSpinner } from "@components/LoadingSpinner";

import api from "@services/api";
import { THEME } from "@theme/theme";

import { useBluetooth } from "@hooks/bluetooth";

import { requestPermissions } from "@manager/permissions";

import { inputs, responses, schema } from "./constants";
import { TypeAction, TypeForm, TypeParams } from "./types";

export function VincularDispositivo() {
  const context = useBluetooth();
  const navigation = useNavigation();

  const route = useRoute();
  const params = route.params as TypeParams;

  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<TypeForm>({
    defaultValues: {
      chave: params?.chave ? params.chave : undefined,
      serial: params?.serial ? params.serial : undefined,
    },
    resolver: yupResolver(schema),
  });

  const handleMenu = () => navigation.dispatch(DrawerActions.openDrawer());

  const sendCommand = async () => {
    const command = {
      BT_PASSWORD: getValues("chave").trim(),
      GET_SERIAL_KEY: "",
    };
    await context.sendCommand(command, 2);
  };

  const checkCredentials = async () => {
    const device = findDevice();

    if (device) {
      const result = await context.connectToDevice(device.id);

      if (result) {
        const isConnected = await result.isConnected();

        if (isConnected) {
          context.setDevice(result);
          sendCommand();
        }
      } else {
        setIsLoading(false);
        handleAction({ response: responses[7] });
      }
    } else {
      setIsLoading(false);
      handleAction({ response: responses[4] });
    }
  };

  const findDevice = () => {
    return context.devices.find(
      (device) => device.name === getValues("serial").trim().toUpperCase(),
    );
  };

  const continueRegistration = () => {
    navigation.navigate("ConfigurarConexaoDados", {
      chave: getValues("chave").trim(),
    });
    context.clearReceivedValues();
  };

  const chooseAnotherDevice = async () => {
    navigation.goBack();
    context.clearReceivedValues();
    await context.disconnectToDevice();
  };

  const checkDevice = async ({ chave, serial }: TypeForm) => {
    try {
      setIsLoading(true);

      const { data } = await api.post("AppMobile/ValidarSerialChave", {
        chave: chave.trim(),
        serial: serial.trim().toUpperCase(),
      });

      if (data === 0) {
        checkCredentials();
      }

      if (data !== 0) {
        handleAction({
          response: responses[data],
          action: () => chooseAnotherDevice(),
        });
      }
    } catch (error) {
      setIsLoading(false);
      Alert.alert(
        "Erro de Comunicação",
        "Não foi possível completar a solicitação. Por favor, tente novamente mais tarde.",
      );
    }
  };

  const requestUsagePermissions = async () => {
    const isGranted = await requestPermissions();
    context.setPermissions(isGranted);
  };

  const handleAction = ({ response, action }: TypeAction) => {
    setIsLoading(false);

    Alert.alert(response.title, response.subtitle, [
      {
        text: response.text,
        onPress: () => (action ? action() : {}),
      },
    ]);
  };

  const verificarResposta = () => {
    const condition = `${getValues("serial")}:${getValues("chave")}`;

    switch (context.response.BT_PASSWORD) {
      case "NOK":
        handleAction({
          response: responses[6],
          action: () => context.clearReceivedValues(),
        });
        break;
    }

    switch (context.response.GET_SERIAL_KEY) {
      case condition:
        handleAction({
          response: responses[0],
          action: () => continueRegistration(),
        });
        break;
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (Object.values(context.response).length > 0) {
        verificarResposta();
      }
    }, [context.response]),
  );

  useFocusEffect(
    useCallback(() => {
      requestUsagePermissions();
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      const handleBackPress = () => {
        setIsLoading(false);
        context.disconnectToDevice();
        context.clearReceivedValues();
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
      <HeaderDefault title="Vincular ao dispositivo" />

      {isLoading && <LoadingSpinner color={THEME.colors.blue[700]} />}

      {!isLoading && (
        <VStack flex={1} w="full" paddingX="16px">
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

      {!isLoading && (
        <ButtonFull
          title="Avançar"
          isLoading={isLoading}
          onPress={handleSubmit(checkDevice)}
        />
      )}
    </LayoutDefault>
  );
}
