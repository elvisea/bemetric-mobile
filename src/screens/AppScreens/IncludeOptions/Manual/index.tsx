import { Alert } from "react-native";
import { useEffect, useState } from "react";

import {
  useNavigation,
  DrawerActions,
  useRoute,
} from "@react-navigation/native";

import axios from "axios";
import { Text, VStack } from "native-base";
import { RFValue } from "react-native-responsive-fontsize";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

import { Input } from "@components/Input";
import { ButtonFull } from "@components/ButtonFull";
import { LayoutDefault } from "@components/LayoutDefault";
import { HeaderDefault } from "@components/HeaderDefault";

import api from "@services/api";
import { THEME } from "@theme/theme";
import { IResponse } from "@interfaces/IResponse";

import { useBluetooth } from "@hooks/bluetooth";
import { processResponses } from "@hooks/processResponse";

import {
  CHARACTERISTIC_UUID,
  MONITORED_FEATURE_UUID,
  SERVICE_UUID,
} from "@hooks/uuid";

interface IFormProps {
  chave: string;
  serial: string;
}

interface IParams {
  id: string;
  serial: string;
}

const schema = yup.object({
  serial: yup.string().required("Informe o serial"),
  chave: yup.string().required("Informe a chave"),
});

const response: IResponse = {
  0: {
    title: "Dispositivo liberado para ser associado.",
    subtitle: "Continue o processo de cadastro.",
  },
  1: {
    title: "Dispositivo não localizado",
    subtitle: "Dispositivo não localizado",
  },
  2: {
    title: "Dispositivo não liberado para ser associado",
    subtitle: "Dispositivo não liberado para ser associado",
  },
  3: {
    title: "Falha na verificação",
    subtitle: "Falha na verificação",
  },
};

export function Manual() {
  const route = useRoute();
  const navigation = useNavigation();

  const {
    connectToDevice,
    disconnectDevice,
    isDeviceConnected,
    monitorCharacteristicForDevice,
    writeCharacteristicWithResponseForDevice,
  } = useBluetooth();

  const params = route.params as IParams;

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IFormProps>({
    defaultValues: { serial: params.serial },
    resolver: yupResolver(schema),
  });

  const handleMenu = () => navigation.dispatch(DrawerActions.openDrawer());

  const [conectado, setConectado] = useState(false);
  const [deviceValue, setDeviceValue] = useState<object | undefined>(undefined);

  const onValueChange = (value: string | null | undefined) => {
    const respostaProcessada = processResponses(value);
    setDeviceValue(respostaProcessada);
  };

  const onError = (error: unknown) => console.error("Monitor error:", error);

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
        Alert.alert(response[data].title, response[data].subtitle);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) Alert.alert(`${error}`, `${error}`);
    }
  }

  async function writeCharacteristic(chave: string) {
    const PAYLOAD = { BT_PASSWORD: chave, GET_SERIAL_KEY: "" };

    await writeCharacteristicWithResponseForDevice(
      params.id,
      SERVICE_UUID,
      CHARACTERISTIC_UUID,
      PAYLOAD
    );
  }

  const conectar = async () => {
    await connectToDevice(params.id);
    const isConnected = await isDeviceConnected(params.id);
    setConectado(isConnected);
  };

  async function handleAdvance({ chave }: IFormProps) {
    await conectar();
    await writeCharacteristic(chave);
  }

  const tryAgain = async () => {
    await disconnectDevice(params.id);
    setDeviceValue(undefined);
    setConectado(false);
  };

  const disconnect = async () => {
    await disconnectDevice(params.id);
    setDeviceValue(undefined);
    setConectado(false);
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
                onPress: () => tryAgain(),
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
        const subscription = await monitorCharacteristicForDevice(
          params.id,
          SERVICE_UUID,
          MONITORED_FEATURE_UUID,
          onValueChange,
          onError
        );

        return () => subscription?.remove();
      } catch (error) {
        console.error("Monitor error:", error);
      }
    };

    return () => {
      monitorDevice();
    };
  }, [conectado]);

  return (
    <LayoutDefault
      bg={THEME.colors.shape}
      firstIcon="menu"
      handleFirstIcon={handleMenu}
    >
      <HeaderDefault title="Vincular ao dispositivo" />

      <VStack flex={1} w="full" paddingX="16px">
        <Text
          color="blue.700"
          fontFamily="Roboto_400Regular"
          fontSize="13px"
          mt={`${RFValue(16)}px`}
        >
          Serial
        </Text>

        <Controller
          control={control}
          name="serial"
          render={({ field: { onChange, value } }) => (
            <Input
              borderBottomColor="blue.700"
              _input={{
                color: "#333333",
                fontSize: "14px",
                fontFamily: "Roboto_500Medium",
              }}
              onChangeText={onChange}
              value={value}
              errorMessage={errors.serial?.message}
            />
          )}
        />

        <Text
          color="blue.700"
          fontFamily="Roboto_400Regular"
          fontSize="13px"
          mt={`${RFValue(16)}px`}
        >
          Chave
        </Text>

        <Controller
          control={control}
          name="chave"
          render={({ field: { onChange, value } }) => (
            <Input
              borderBottomColor="blue.700"
              _input={{
                color: "#333333",
                fontSize: "14px",
                fontFamily: "Roboto_500Medium",
              }}
              onChangeText={onChange}
              value={value}
              errorMessage={errors.chave?.message}
            />
          )}
        />
      </VStack>

      <ButtonFull title="Desconectar" onPress={disconnect} />
      <ButtonFull title="AVANÇAR" onPress={handleSubmit(handleAdvance)} />
    </LayoutDefault>
  );
}
