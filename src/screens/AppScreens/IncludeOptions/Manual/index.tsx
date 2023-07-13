import { Alert, FlatList } from "react-native";
import { useEffect, useState } from "react";

import {
  useNavigation,
  DrawerActions,
  useRoute,
} from "@react-navigation/native";

import axios from "axios";
import { Text, VStack } from "native-base";
import { RFValue } from "react-native-responsive-fontsize";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

import { Input } from "@components/Input";
import { ButtonFull } from "@components/ButtonFull";
import { LayoutDefault } from "@components/LayoutDefault";
import { HeaderDefault } from "@components/HeaderDefault";

import api from "@services/api";
import { THEME } from "@theme/theme";

import { useBluetooth } from "@hooks/bluetooth";
import { processResponses } from "@hooks/processResponse";

import {
  CHARACTERISTIC_UUID,
  SERVICE_UUID,
  MONITORED_FEATURE_UUID,
} from "@hooks/uuid";

import { IFormProps, IParams } from "./interfaces";

import { schema } from "./constants/schema";
import { response } from "./constants/response";
import { inputs } from "./constants/inputs";

export function Manual() {
  const route = useRoute();
  const navigation = useNavigation();

  const {
    disconnectDevice,
    connectAndMonitorCharacteristicForDevice,
    writeCharacteristicWithResponseForDevice,
  } = useBluetooth();

  const params = route.params as IParams;

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IFormProps>({
    defaultValues: {
      serial: params.serial,
      chave: params.chave ? params.chave : undefined,
    },
    resolver: yupResolver(schema),
  });

  const handleMenu = () => navigation.dispatch(DrawerActions.openDrawer());

  const [deviceValue, setDeviceValue] = useState<object | undefined>(undefined);

  console.log("deviceValue:", deviceValue);

  const onValueChange = (value: string | null | undefined) => {
    const respostaProcessada = processResponses(value);
    setDeviceValue(respostaProcessada);
  };

  const onError = (error: unknown) => console.error("Monitor error:", error);

  const chooseAnotherDevice = async () => {
    await disconnectDevice(params.id);
    setDeviceValue(undefined);
    navigation.goBack();
  };

  async function checkAvailability() {
    try {
      const chave = getValues("chave");
      const serial = getValues("serial");

      const { data } = await api.post("AppMobile/ValidarSerialChave", {
        chave,
        serial,
      });

      if (data === 0) {
        Alert.alert(
          "Equipamento conectado.",
          "Dispositivo liberado para ser associado. Continue seu cadastro.",
          [
            {
              text: "Continuar",
              onPress: () => navigation.navigate("ConfigureConnection"),
            },
          ]
        );
      }

      if (data !== 0) {
        Alert.alert(response[data].title, response[data].subtitle, [
          {
            text: "Tente outro dispositivo",
            onPress: () => chooseAnotherDevice(),
          },
        ]);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) Alert.alert(`${error}`, `${error}`);
    }
  }

  async function handleAdvance({ chave }: IFormProps) {
    const PAYLOAD = { BT_PASSWORD: chave, GET_SERIAL_KEY: "" };

    await writeCharacteristicWithResponseForDevice(
      SERVICE_UUID,
      CHARACTERISTIC_UUID,
      PAYLOAD
    );
  }

  const disconnect = async () => {
    await disconnectDevice(params.id);
    setDeviceValue(undefined);
  };

  useEffect(() => {
    const handleDeviceValueChange = () => {
      if (deviceValue) {
        if ("BTPASSWORD" in deviceValue) {
          Alert.alert(
            "Credenciais inválidas.",
            "Verifique se as credenciais de acesso estão corretas.",
            [
              {
                text: "Tentar Novamente",
                // onPress: () => chooseAnotherDevice(),
              },
            ]
          );
        } else {
          checkAvailability();
        }
      }
    };

    handleDeviceValueChange();
  }, [deviceValue]);

  useEffect(() => {
    const monitorDevice = async (): Promise<unknown> => {
      try {
        const subscription = await connectAndMonitorCharacteristicForDevice(
          params.id,
          SERVICE_UUID,
          MONITORED_FEATURE_UUID,
          onValueChange,
          onError
        );

        return () => subscription?.remove();
      } catch (error) {
        console.error(
          "Error when trying to connect and monitor feature",
          error
        );
      }
    };

    monitorDevice();
  }, []);

  return (
    <LayoutDefault
      bg={THEME.colors.shape}
      firstIcon="menu"
      handleFirstIcon={handleMenu}
    >
      <HeaderDefault title="Vincular ao dispositivo" />

      <VStack flex={1} w="full" paddingX="16px">
        <FlatList
          data={inputs}
          style={{ width: "100%" }}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: input }) => (
            <>
              <Text
                color="blue.700"
                fontFamily="Roboto_400Regular"
                fontSize="13px"
                mt={`${RFValue(16)}px`}
              >
                {input.title}
              </Text>

              <Controller
                control={control}
                name={input.name}
                render={({ field: { onChange, value } }) => (
                  <Input
                    borderBottomColor="blue.700"
                    _input={{
                      color: "#333333",
                      fontSize: "14px",
                      fontFamily: "Roboto_500Medium",
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

      <ButtonFull title="Desconectar" onPress={disconnect} />
      <ButtonFull title="AVANÇAR" onPress={handleSubmit(handleAdvance)} />
    </LayoutDefault>
  );
}
