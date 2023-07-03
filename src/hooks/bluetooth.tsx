import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { PermissionsAndroid, Platform } from "react-native";

import * as ExpoDevice from "expo-device";

import { Buffer } from "buffer";

import {
  BleError,
  BleManager,
  Characteristic,
  Device,
  State,
  Subscription,
} from "react-native-ble-plx";

type BluetoothProviderProps = {
  children: ReactNode;
};

type BluetoothContextData = {
  bluetoothEnabled: boolean;
  bluetoothStateChanged: State;
  devices: Device[] | [];
  connectedDevice: Device | null;

  scanForDevices(): void;

  connectToDevice(id: string): Promise<void>;

  requestPermissions(): Promise<boolean>;

  disconnectDevice(id: string): Promise<void>;

  isDeviceConnected(id: string): Promise<boolean>;

  writeWithResponse(
    characteristic: Characteristic,
    payload: object
  ): Promise<void>;

  monitorCharacteristic: (
    characteristic: Characteristic
  ) => Promise<string | BleError>;

  findCharacteristic(
    id: string,
    serviceUUID: string,
    characteristicUUID: string
  ): Promise<Characteristic | undefined>;

  monitorCharacteristicForDevice(
    id: string,
    serviceUUID: string,
    characteristicUUID: string,
    onValueChange: (value: string | null | undefined) => void,
    onError: (error: BleError | null | unknown) => void
  ): Promise<Subscription | undefined>;

  writeCharacteristicWithResponseForDevice: (
    id: string,
    serviceUUID: string,
    characteristicUUID: string,
    payload: object
  ) => Promise<void>;

  // novoMonitoramento: (
  //   id: string,
  //   serviceUUID: string,
  //   characteristicUUID: string,
  //   onValueChange: (
  //     error: BleError | null,
  //     characteristic: Characteristic | null
  //   ) => void
  // ) => Subscription;
};

export const BluetoothContext = createContext<BluetoothContextData>(
  {} as BluetoothContextData
);

const manager = new BleManager();

const HEADER = [0x4d, 0x00, 0x00, 0x2c];

const BluetoothProvider = ({ children }: BluetoothProviderProps) => {
  const [bluetoothEnabled, setBluetoothEnabled] = useState(false);
  const [bluetoothStateChanged, setBluetoothStateChanged] = useState<State>(
    State.Unknown
  );

  const [devices, setDevices] = useState<Device[] | []>([]);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);

  const isDeviceConnected = async (id: string) => {
    return await manager.isDeviceConnected(id);
  };

  const writeCharacteristicWithResponseForDevice = async (
    id: string,
    serviceUUID: string,
    characteristicUUID: string,
    payload: object
  ) => {
    try {
      const device =
        await manager.discoverAllServicesAndCharacteristicsForDevice(id);

      const services = await device.services();

      const service = services.find((service) => service.uuid === serviceUUID);

      if (!service) {
        return;
      }

      const characteristics = await service.characteristics();

      const characteristic = characteristics.find(
        (item) => item.uuid === characteristicUUID
      );

      if (!characteristic) {
        return;
      }

      let payloadString = JSON.stringify(payload);

      const payloadBuffer = Buffer.from(payloadString);

      const size = payloadString.length;

      HEADER[3] = size;

      const concatenatedBuffer = Buffer.concat([
        Buffer.from(HEADER),
        payloadBuffer,
      ]);

      const valueBase64 = concatenatedBuffer.toString("base64");

      await characteristic.writeWithResponse(valueBase64);
    } catch (error) {
      console.log("caiu Aqui");

      console.error(error);
    }
  };

  // const novoMonitoramento = (
  //   id: string,
  //   serviceUUID: string,
  //   characteristicUUID: string,
  //   onValueChange: (
  //     error: BleError | null,
  //     characteristic: Characteristic | null
  //   ) => void
  // ): Subscription => {
  //   const subscription = manager.monitorCharacteristicForDevice(
  //     id,
  //     serviceUUID,
  //     characteristicUUID,
  //     onValueChange = (error, characteristic) => {
  //       console.log(characteristic?.value);
  //       console.log(error);

  //     }
  //   );

  //   return subscription;
  // };

  // const novoMonitoramento = async (
  //   id: string,
  //   serviceUUID: string,
  //   characteristicUUID: string,
  //   onValueChange: (
  //     error: BleError | null,
  //     characteristic: Characteristic | null
  //   ) => void
  // ): Promise<Subscription> => {
  //   const characteristic = await manager.monitorCharacteristicForDevice(
  //     id,
  //     serviceUUID,
  //     characteristicUUID,
  //     onValueChange,
  //     (error) => {
  //       console.error('Erro de monitoramento:', error);
  //     }
  //   );

  //   // Retorne um objeto Subscription que fornece uma função para parar de monitorar
  //   return {
  //     unsubscribe: async () => {
  //       try {
  //         await characteristic.removeNotify();
  //       } catch (error) {
  //         console.error('Erro ao parar de monitorar:', error);
  //       }
  //     }
  //   };
  // };

  // const monitorCharacteristicForDevice = async (
  //   id: string,
  //   serviceUUID: string,
  //   characteristicUUID: string,
  //   onValueChange: (value: string | null | undefined) => void,
  //   onError: (error: BleError | null | unknown) => void
  // ): Promise<void> => {
  //   try {
  //     const discovered =
  //       await manager.discoverAllServicesAndCharacteristicsForDevice(id);

  //     const services = await discovered.services();

  //     const service = services.find((service) => service.uuid === serviceUUID);

  //     if (!service) {
  //       return;
  //     }

  //     const characteristics = await service.characteristics();

  //     const characteristic = characteristics.find(
  //       (item) => item.uuid === characteristicUUID
  //     );

  //     if (!characteristic) {
  //       return;
  //     }

  //     characteristic.monitor((error, characteristic) => {
  //       if (error) {
  //         onError(error);
  //       } else if (characteristic?.value) {
  //         onValueChange(characteristic.value);
  //       }
  //     });

  //   } catch (error) {
  //     onError(error);
  //   }
  // };

  const monitorCharacteristicForDevice = async (
    id: string,
    serviceUUID: string,
    characteristicUUID: string,
    onValueChange: (value: string | null | undefined) => void,
    onError: (error: BleError | null | unknown) => void
  ): Promise<Subscription | undefined> => {
    try {
      const discovered =
        await manager.discoverAllServicesAndCharacteristicsForDevice(id);

      const services = await discovered.services();

      const service = services.find((service) => service.uuid === serviceUUID);

      if (!service) {
        return;
      }

      const characteristics = await service.characteristics();

      const characteristic = characteristics.find(
        (item) => item.uuid === characteristicUUID
      );

      if (!characteristic) {
        return;
      }

      const subscription = characteristic.monitor((error, characteristic) => {
        if (error) {
          onError(error);
        } else if (characteristic?.value) {
          onValueChange(characteristic.value);
        }
      });

      return subscription;
    } catch (error) {
      onError(error);
    }
  };

  const findCharacteristic = async (
    id: string,
    serviceUUID: string,
    characteristicUUID: string
  ): Promise<Characteristic | undefined> => {
    try {
      const discovered =
        await manager.discoverAllServicesAndCharacteristicsForDevice(id);

      const services = await discovered.services();

      const service = services.find((service) => service.uuid === serviceUUID);

      if (!service) {
        return undefined;
      }

      const characteristics = await service.characteristics();

      const characteristic = characteristics.find(
        (item) => item.uuid === characteristicUUID
      );

      if (!characteristic) {
        return undefined;
      }

      return characteristic;
    } catch (error) {
      console.error("Erro ao encontrar a característica:", error);
      return undefined;
    }
  };

  const writeWithResponse = async (
    characteristic: Characteristic,
    payload: object
  ) => {
    let payloadString = JSON.stringify(payload);

    const payloadBuffer = Buffer.from(payloadString);

    const size = payloadString.length;

    HEADER[3] = size;

    const concatenated = Buffer.concat([Buffer.from(HEADER), payloadBuffer]);

    const valueBase64 = concatenated.toString("base64");

    await characteristic.writeWithResponse(valueBase64);
  };

  const connectToDevice = async (id: string) => {
    try {
      const dispositivoConectado = await manager.connectToDevice(id);
      await manager.requestMTUForDevice(id, 500);
      setConnectedDevice(dispositivoConectado);

      const { id: deviceIdentifier } = dispositivoConectado;
      console.log("serviceUUIDs ctx", deviceIdentifier);

      if (deviceIdentifier) {
        const isConnected = await isDeviceConnected(deviceIdentifier);
        console.log("isConnected ctx", isConnected);
      }
    } catch (error) {
      console.error("Failed to connect:", error);
    }
  };

  const monitorCharacteristic = async (
    characteristic: Characteristic
  ): Promise<string | BleError> => {
    return new Promise((resolve, reject) => {
      characteristic.monitor((error, updatedCharacteristic) => {
        if (error) {
          console.error("Error during monitoring:", error);
          reject(error);
          return;
        }

        if (updatedCharacteristic?.value) {
          resolve(updatedCharacteristic.value);
        }
      });
    });
  };

  const handleBluetoothStateChange = (state: State) => {
    setBluetoothStateChanged(state);
    setBluetoothEnabled(state === State.PoweredOn);
  };

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

  const isDuplicateDevice = (devices: Device[], newDevice: Device) =>
    devices.some((device) => device.id === newDevice.id);

  const scanForDevices = () => {
    try {
      manager.startDeviceScan(null, null, (error, device) => {
        if (error) {
          console.error("Error when trying to scan for devices", error);
          return;
        }

        if (device && device.name?.includes("B2K")) {
          setDevices((prevState: Device[] | []) => {
            if (!isDuplicateDevice(prevState, device)) {
              return [...prevState, device];
            }
            return prevState;
          });
          manager.stopDeviceScan();
        }
      });
    } catch (error) {
      console.error("Error when trying to scan for devices", error);
    }
  };

  const disconnectDevice = async (id: string) => {
    const device = await manager.cancelDeviceConnection(id);
    console.log("Device Desconectado:", device.id);
    setConnectedDevice(null);
  };

  useEffect(() => {
    const stateChangeListener = manager.onStateChange(
      handleBluetoothStateChange,
      true
    );

    return () => {
      stateChangeListener.remove();
      manager.destroy();
    };
  }, []);

  return (
    <BluetoothContext.Provider
      value={{
        bluetoothEnabled,
        bluetoothStateChanged,

        devices,
        connectedDevice,
        monitorCharacteristicForDevice,
        // novoMonitoramento,
        writeCharacteristicWithResponseForDevice,
        isDeviceConnected,
        requestPermissions,
        disconnectDevice,
        scanForDevices,
        connectToDevice,
        monitorCharacteristic,
        writeWithResponse,
        findCharacteristic,
      }}
    >
      {children}
    </BluetoothContext.Provider>
  );
};

function useBluetooth() {
  const context = useContext(BluetoothContext);
  return context;
}

export { BluetoothProvider, useBluetooth };
