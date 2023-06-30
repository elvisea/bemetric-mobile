import { useCallback, useEffect, useMemo, useState } from "react";
import { PermissionsAndroid, Platform } from "react-native";

import { Buffer } from "buffer";
import * as ExpoDevice from "expo-device";
import { BleManager, Device, State } from "react-native-ble-plx";
import { IBluetoothManager } from "@interfaces/IBluetoothManager";

const SERVICE_UUID = "0000ffff-0000-1000-8000-00805f9b34fb";
const CHARACTERISTIC_UUID = "0000ff01-0000-1000-8000-00805f9b34fb";

const MONITORED_FEATURE_UUID = "0000ff02-0000-1000-8000-00805f9b34fb";

const HEADER = [0x4d, 0x00, 0x00, 0x2c];
const PAYLOAD = { BT_PASSWORD: "332428", GET_WIFI_LIST: "" };
// const PAYLOAD = { BT_PASSWORD: "332428", GET_SERIAL_KEY: "" };

function bluetoothManager(): IBluetoothManager {
  const bleManager = useMemo(() => new BleManager(), []);

  const [allDevices, setAllDevices] = useState<Device[]>(() => []);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);

  const [responses, setResponses] = useState<string[]>([]);
  console.log("responses state:", responses);

  console.log("Dispositivos [] =>", allDevices);

  const [monitoringResponse, setMonitoringResponse] = useState<{} | null>(null);
  console.log("Retorno Monitoramento =>", monitoringResponse);

  const [bluetoothEnabled, setBluetoothEnabled] = useState(false);

  console.log("bluetooth enabled ?", bluetoothEnabled);

  const checkBluetoothEnabled = async (): Promise<State> => {
    const isEnabled = await bleManager.state();
    return isEnabled;
  };

  const formatar = (value: string) => {
    const decoded = Buffer.from(value, "base64").toString("utf-8").slice(4);

    const unescapedString = decoded.replace(/\n/g, "").replace(/\t/g, "");

    console.log("unescapedString:", unescapedString);

    try {
      const parsedResponse = JSON.parse(unescapedString);
      setMonitoringResponse(parsedResponse);
    } catch (error) {
      console.log("Error parsing JSON:", error);
    }
  };

  const formatarRespostas = (value: string) => {
    const decoded = Buffer.from(value, "base64").toString("utf-8").slice(4);
    setResponses((prevResponses) => [...prevResponses, decoded]);

    const unescapedString = responses.join("").replace(/[\n\t�]/g, "");

    console.log("unescapedString:", unescapedString);

    try {
      const parsedResponse = JSON.parse(unescapedString);
      setMonitoringResponse(parsedResponse);
    } catch (error) {
      console.log("Error parsing JSON:", error);
    }
  };

  function extractValidJson(jsonString: string) {
    // Encontra a posição da primeira chave abrindo '{'
    const startIndex = jsonString.indexOf("{");
    // Encontra a posição da última chave fechando '}'
    const endIndex = jsonString.lastIndexOf("}");

    // Extrai o JSON válido entre as posições encontradas
    const validJson = jsonString.slice(startIndex, endIndex + 1);

    return validJson;
  }

  function isValidJson(jsonString: string) {
    try {
      JSON.parse(jsonString);
      return true;
    } catch (error) {
      return false;
    }
  }

  // Função para processar as respostas recebidas
  const processResponses = () => {
    const jsonValido = extractValidJson(responses.join(""));

    // const limpo = responses.join("").replace(/\n/g, "").replace(/\t/g, "").replace(/[^a-zA-Z0-9\-_{}:\".,[\]\s]/g, "").replace(/[^\x20-\x7E]/g, '')
    // responses.map(item => item.replace(/\n/g, "").replace(/\t/g, ""))

    // console.log("LIMPO", limpo);

    const value = jsonValido
      .replace(/^M\W/, "")
      .replace(/[^{}[\]:,"0-9a-zA-Z]+/g, "");

    console.log("Value", value);

    const isValidJSON = isValidJson(value);

    console.log("isValidJSON:", isValidJSON);

    // if (isValidJSON) {
    //   const parsedResponse = JSON.parse(value);
    //   setMonitoringResponse(parsedResponse);
    // } else {
    //   console.log("Ainda não é um JSON válido: ", value)
    // }

    // Combinar as respostas em um JSON válido e realizar o processamento final
    // const combinedResponse = limpo
    //   .join("")
    //   .replace(/[\n\t�]/g, "") // Remover quebras de linha, tabs e caracteres inválidos
    //   .replace(/\s*\"(\w+)\"\s*:\s*/g, '"$1": ') // Remover espaços antes e depois dos nomes das chaves
    //   .replace(/\s*:\s*\"(\w+)\"/g, ': "$1"') // Remover espaços antes e depois dos valores das chaves
    //   .replace(/([^\"])(\s*[,{}[\]])/g, "$1$2 ") // Adicionar um espaço após as vírgulas, colchetes e chaves
    //   .replace(/\"WIFI_AP_AUTH\":\s*\"\s*(\d+)\s*\"/g, '"WIFI_AP_AUTH": $1'); // Remover as aspas em torno dos valores numéricos das chaves

    try {
      const parsedResponse = JSON.parse(value);
      setMonitoringResponse(parsedResponse);
    } catch (error) {
      console.log("Não é um JSON válido. Error parsing JSON.", error);
    }
    // if (responses.length > 2) {
    // }
  };

  useEffect(() => {
    // Realizar ação desejada quando o estado monitoringResponse for atualizado
    // console.log("Novo valor de responses:", responses);

    // Realizar outras operações com o novo valor do estado, se necessário

    // Exemplo de chamada de função com o novo valor do estado
    if (responses.length > 0) {
      processResponses();
    }

    // Realizar ação de limpeza ou qualquer outra operação necessária quando o componente for desmontado
    return () => {
      // Realizar ação de limpeza, se necessário
    };
  }, [responses]); // Array de dependências, incluindo o estado monitoringResponse

  const requestAndroid31Permissions = async () => {
    const bluetoothScanPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires Location",
        buttonPositive: "OK",
      }
    );

    const bluetoothConnectPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires Location",
        buttonPositive: "OK",
      }
    );

    const fineLocationPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires Location",
        buttonPositive: "OK",
      }
    );

    return (
      bluetoothScanPermission === "granted" &&
      bluetoothConnectPermission === "granted" &&
      fineLocationPermission === "granted"
    );
  };

  const requestPermissions = async () => {
    if (Platform.OS === "android") {
      if ((ExpoDevice.platformApiLevel ?? -1) < 31) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message: "Bluetooth Low Energy requires Location",
            buttonPositive: "OK",
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        const isAndroid31PermissionsGranted =
          await requestAndroid31Permissions();
        return isAndroid31PermissionsGranted;
      }
    } else {
      return true;
    }
  };

  const isDuplicateDevice = (devices: Device[], nextDevice: Device) =>
    devices.findIndex((device) => nextDevice.id === device.id) > -1;

  const scanForDevices = () =>
    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) console.error("scanForDevices()", error);

      if (device && device.name?.includes("B2K")) {
        setAllDevices((prevState: Device[]) => {
          if (!isDuplicateDevice(prevState, device)) {
            return [...prevState, device];
          }
          return prevState;
        });
        bleManager.stopDeviceScan();
      }
    });

  const connectToDevice = async (device: Device) => {
    try {
      const connectedDevice = await bleManager.connectToDevice(device.id);

      await bleManager.requestMTUForDevice(device.id, 500);
      setConnectedDevice(connectedDevice);

      await subscription(device);

      await writeWithResponse(device);
    } catch (error) {
      console.error("Failed to connect:", error);
    }
  };

  const findCharacteristic = async (
    device: Device,
    service_UUID: string,
    characteristic_UUID: string
  ) => {
    try {
      console.log("Params", device.id, service_UUID, characteristic_UUID);

      const discovered = await device.discoverAllServicesAndCharacteristics();

      console.log("discovered", discovered.id);

      const services = await discovered.services();

      console.log("Services", services.length);

      const service = services.find((service) => service.uuid === service_UUID);

      if (!service) {
        return;
      }

      const characteristics = await service.characteristics();

      console.log("Characteristics", characteristics.length);

      const characteristic = characteristics.find(
        (item) => item.uuid === characteristic_UUID
      );

      console.log("Characteristics", characteristic?.id);

      if (!characteristic) {
        return;
      }

      return characteristic;
    } catch (error) {
      console.error("Error discovering services and characteristics:", error);
    }
  };

  const buscarCaracteristica = async (
    device: Device,
    service_UUID: string,
    characteristic_UUID: string
  ) => {
    try {
      const discovered = await device.discoverAllServicesAndCharacteristics();

      const services = await discovered.services();

      const service = services.find((service) => service.uuid === service_UUID);

      if (!service) {
        return;
      }

      const characteristics = await service.characteristics();

      const characteristic = characteristics.find(
        (item) => item.uuid === characteristic_UUID
      );

      if (!characteristic) {
        return;
      }

      return characteristic;
    } catch (error) {
      console.error("Error discovering services and characteristics:", error);
    }
  };

  const writeWithResponse = async (device: Device) => {
    const characteristic = await buscarCaracteristica(
      device,
      SERVICE_UUID,
      CHARACTERISTIC_UUID
    );

    if (characteristic) {
      let payloadString = JSON.stringify(PAYLOAD);

      const payloadBuffer = Buffer.from(payloadString);

      const size = payloadString.length;

      HEADER[3] = size;

      const concatenatedBuffer = Buffer.concat([
        Buffer.from(HEADER),
        payloadBuffer,
      ]);

      const valueBase64 = concatenatedBuffer.toString("base64");

      await characteristic.writeWithResponse(valueBase64);
    }

    if (!characteristic) {
      console.error("Characteristic not found!");
    }
  };

  const subscription = async (device: Device) => {
    const characteristic = await buscarCaracteristica(
      device,
      SERVICE_UUID,
      MONITORED_FEATURE_UUID
    );

    if (characteristic) {
      if (characteristic) {
        characteristic.monitor((error, updatedCharacteristic) => {
          if (error) {
            console.error("Error during monitoring:", error);
            return;
          }

          if (updatedCharacteristic) {
            if (updatedCharacteristic.value) {
              // const array: string[] = []
              // const response = updatedCharacteristic.value;
              let response = Buffer.from(
                updatedCharacteristic.value,
                "base64"
              ).toString("utf8");
              setResponses((prevResponses) => [...prevResponses, response]);

              // array.push(response)

              // setResponses(prevResponses => [...prevResponses, response]);

              // console.log("?????", array.length);

              // formatarRespostas(updatedCharacteristic.value)
              // formatar(updatedCharacteristic.value);

              // console.log("ARRAY:", array);
            }
          }
        });
      }
    }

    if (!characteristic) {
      console.error("Characteristic not found!");
    }
  };

  const disconnectFromDevice = () => {
    if (connectedDevice) {
      bleManager.cancelDeviceConnection(connectedDevice.id);
      setConnectedDevice(null);
      setMonitoringResponse(null);
      setResponses([]);
    }
  };

  return {
    checkBluetoothEnabled,
    scanForDevices,
    requestPermissions,
    connectToDevice,
    subscription,
    allDevices,
    connectedDevice,
    disconnectFromDevice,
  };
}

export { bluetoothManager };
