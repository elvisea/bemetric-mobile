import { Alert } from "react-native";
import { Text, VStack } from "native-base";
import {
  useNavigation,
  DrawerActions,
  useRoute,
} from "@react-navigation/native";

import axios from "axios";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

import { RFValue } from "react-native-responsive-fontsize";

import { Input } from "@components/Input";
import { ButtonFull } from "@components/ButtonFull";
import { LayoutDefault } from "@components/LayoutDefault";
import { HeaderDefault } from "@components/HeaderDefault";

import api from "@services/api";
import { THEME } from "@theme/theme";
import { useBluetooth } from "@hooks/bluetooth";
import { IResponse } from "@interfaces/IResponse";
import {
  CHARACTERISTIC_UUID,
  MONITORED_FEATURE_UUID,
  SERVICE_UUID,
} from "@hooks/uuid";
import { useEffect, useState } from "react";
import { BleError, Characteristic } from "react-native-ble-plx";
import { processResponses } from "@hooks/processResponse";

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
    title: "Dispositivo liberado para ser associado",
    subtitle: "Dispositivo liberado para ser associado",
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
    connectedDevice,
    findCharacteristic,
    disconnectDevice,
    isDeviceConnected,
    monitorCharacteristicForDevice,
    // novoMonitoramento,
    writeCharacteristicWithResponseForDevice,
  } = useBluetooth();

  console.log("connectToDevice =>", connectedDevice?.id);

  const params = route.params as IParams;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormProps>({
    defaultValues: { serial: params.serial },
    resolver: yupResolver(schema),
  });

  const handleMenu = () => navigation.dispatch(DrawerActions.openDrawer());

  const [deviceValue, setDeviceValue] = useState<string | null | undefined>(
    null
  );

  const [responses, setResponses] = useState<unknown[]>([]);

  console.log("Device Value:", deviceValue);
  console.log("responses []", responses);

  const onValueChange = (value: string | null | undefined) => {
    setDeviceValue(value);
    console.log(processResponses(value));
    if (value) {

    }

    setResponses((prevResponses) => [...prevResponses, value]);
  };

  // const onValueChange = (error: BleError | null, characteristic: Characteristic | null) => {
  //   console.log(characteristic);
  //   console.log("onValueChange()", error);

  //   if (characteristic?.value) {
  //     setDeviceValue(characteristic?.value);
  //   }
  //   setResponses((prevResponses) => [...prevResponses, characteristic?.value]);
  // };

  const onError = (error: unknown) => {
    console.error("Monitor error:", error);
  };

  const [conectado, setConectado] = useState(false);

  async function writeCharacteristic() {
    console.log("Wait a moment...");

    const PAYLOAD = { BT_PASSWORD: "332428", GET_SERIAL_KEY: "" };
    await writeCharacteristicWithResponseForDevice(
      params.id,
      SERVICE_UUID,
      CHARACTERISTIC_UUID,
      PAYLOAD
    );
  }

  async function canUse({ chave, serial }: IFormProps) {
    try {
      const { data } = await api.post("AppMobile/ValidarSerialChave", {
        chave,
        serial,
      });

      console.log(data);

      Alert.alert(response[data].title, response[data].subtitle);
    } catch (error) {
      if (axios.isAxiosError(error)) Alert.alert(`${error}`, `${error}`);
    }
  }

  async function handleAdvance({ chave, serial }: IFormProps) {
    await connectToDevice(params.id);

    const isConnected = await isDeviceConnected(params.id);
    console.log("Esta Conectado?", isConnected);

    setConectado(isConnected);

    if (isConnected) await writeCharacteristic();

    // await canUse({ chave, serial })

    // const PAYLOAD = { BT_PASSWORD: "332428", GET_SERIAL_KEY: "" };

    // await writeCharacteristicWithResponseForDevice(
    //   params.id,
    //   SERVICE_UUID,
    //   MONITORED_FEATURE_UUID,
    //   PAYLOAD
    // )

    // try {
    //   const { data } = await api.post("AppMobile/ValidarSerialChave", {
    //     chave,
    //     serial,
    //   });

    //   console.log(data);

    //   Alert.alert(response[data].title, response[data].subtitle);
    // } catch (error) {
    //   if (axios.isAxiosError(error)) Alert.alert(`${error}`, `${error}`);
    // }
  }

  const handleDisconnect = () => {
    if (connectedDevice) {
      disconnectDevice(connectedDevice.id);
      setResponses([]);
      setDeviceValue("");
    }
  };

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

        return () => subscription?.remove()


      } catch (error) {
        console.error("Monitor error:", error);
      }
    };

    return () => {
      monitorDevice()
    }

    // monitorDevice();
    // conectado && monitorDevice();
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

      <ButtonFull
        title="teste"
        // onPress={() =>
        //   connectedDevice ? disconnectDevice(connectedDevice.id) : {}
        // }
        onPress={writeCharacteristic}
      />

      <ButtonFull
        title="Desconectar"
        onPress={handleDisconnect}
      // onPress={writeCharacteristic}
      />
      <ButtonFull title="AVANÇAR" onPress={handleSubmit(handleAdvance)} />
      {/* <ButtonFull
        title="Avançar"
        onPress={() =>
          navigation.navigate("IncludeStackRoutes", {
            screen: "ConfigureConnection",
          })
        }
      /> */}
    </LayoutDefault>
  );
}
