import React, { createContext, useContext, useEffect, useReducer } from "react";

import { Buffer } from "buffer";

import * as ExpoDevice from "expo-device";
import { PermissionsAndroid, Platform } from "react-native";

import {
  State,
  Device,
  BleManager,
  BleError,
  Subscription,
} from "react-native-ble-plx";

import { reducer } from "./reducer";
import { initialState } from "./initial-state";
import { BluetoothContextData, BluetoothProviderProps } from "./types";

import { processResponses } from "@hooks/processResponse";

export const BluetoothContext = createContext<BluetoothContextData>(
  {} as BluetoothContextData
);

const manager = new BleManager();

const HEADER = [0x4d, 0x00, 0x00, 0x2c];

const BluetoothProvider = ({ children }: BluetoothProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log("state bluetooth 👹", state);

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

  const changeGrantedPermissions = (granted: boolean) => {
    dispatch({ type: "PERMISSIONS_GRANTED", payload: granted });
  };

  const handleBluetoothStateChange = (state: State) => {
    const isPoweredOn = state === State.PoweredOn;

    dispatch({ type: "BLUETOOTH_STATE", payload: state });
    dispatch({ type: "ENABLE_BLUETOOTH", payload: isPoweredOn });
  };

  const isDuplicateDevice = (devices: Device[], newDevice: Device) =>
    devices.some((device) => device.id === newDevice.id);

  const scanForDevices = () => {
    try {
      if (!state.bluetoothEnabled) {
        console.log("Bluetooth is turned off. Stopping device scan.");
        return;
      }

      manager.startDeviceScan(null, null, (error, device) => {
        if (error) {
          console.error("Error when trying to scan for devices", error);
          return;
        }

        if (device && device.name?.includes("B2K")) {
          if (!isDuplicateDevice(state.devices, device)) {
            dispatch({
              type: "SET_DEVICE_LIST",
              payload: [...state.devices, device],
            });
          }

          manager.stopDeviceScan();
        }
      });
    } catch (error) {
      console.error("Error when trying to scan for devices", error);
    }
  };

  const disconnectDevice = async (id: string) => {
    await manager.cancelDeviceConnection(id);

    dispatch({ type: "REMOVE_DEVICE" });
    dispatch({ type: "CONNECT_DEVICE", payload: false });
  };

  const writeCharacteristicWithResponseForDevice = async (
    serviceUUID: string,
    characteristicUUID: string,
    command: object
  ) => {
    if (state.connectedDevice) {
      console.log("Device is connected and can write to a feature");

      try {
        const discovered =
          await state.connectedDevice.discoverAllServicesAndCharacteristics();

        const services = await discovered.services();

        const service = services.find(
          (service) => service.uuid === serviceUUID
        );

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

        let commandString = JSON.stringify(command);

        const commandBuffer = Buffer.from(commandString);

        const size = commandString.length;

        HEADER[3] = size;

        const concatenatedBuffer = Buffer.concat([
          Buffer.from(HEADER),
          commandBuffer,
        ]);

        const valueBase64 = concatenatedBuffer.toString("base64");

        await characteristic.writeWithResponse(valueBase64);
      } catch (error) {
        console.error("Failed when trying to write", error);
      }
    }

    console.log("Device is not connected and cannot write to a feature");
  };

  const monitorCharacteristicForDevice = async (
    serviceUUID: string,
    characteristicUUID: string,
    onValueChange: (value: string | null | undefined) => void,
    onError: (error: BleError | null | unknown) => void
  ): Promise<Subscription | undefined> => {
    if (state.connectedDevice) {
      console.log("Device is connected and can monitor features");
      try {
        const discovered =
          await state.connectedDevice.discoverAllServicesAndCharacteristics();

        const services = await discovered.services();

        const service = services.find(
          (service) => service.uuid === serviceUUID
        );

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
    }

    console.log("Device is not connected and cannot monitor features");
  };

  const connectToDevice = async (id: string) => {
    if (state.deviceIsConnected) {
      return console.error("Device is already connected");
    }

    try {
      const dispositivoConectado = await manager.connectToDevice(id, {
        requestMTU: 500,
      });

      dispatch({ type: "CONNECT_DEVICE", payload: true });
      dispatch({ type: "SET_DEVICE", payload: dispositivoConectado });
    } catch (error) {
      console.error("Failed when trying to connect:", error);
    }
  };

  const connectDevice = async (id: string): Promise<Device> => {
    const dispositivoConectado = await manager.connectToDevice(id, {
      requestMTU: 500,
    });

    dispatch({ type: "CONNECT_DEVICE", payload: true });
    dispatch({ type: "SET_DEVICE", payload: dispositivoConectado });

    return dispositivoConectado;
  };

  const connectAndMonitorCharacteristicForDevice = async (
    id: string,
    serviceUUID: string,
    characteristicUUID: string,
    onValueChange: (value: string | null | undefined) => void,
    onError: (error: BleError | null | unknown) => void
  ): Promise<Subscription | undefined> => {
    try {
      const dispositivo = await connectDevice(id);

      const discovered =
        await dispositivo.discoverAllServicesAndCharacteristics();

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

  const setServiceUUID = (serviceUUID: string) => {
    dispatch({ type: "SET_SERVICE_UUID", payload: serviceUUID });
  };

  const resetServiceUUID = () => {
    dispatch({ type: "RESET_SERVICE_UUID" });
  };

  const setCharacteristicUUID = (characteristicUUID: string) => {
    dispatch({ type: "SET_CHARACTERISTIC_UUID", payload: characteristicUUID });
  };

  const resetCharacteristicUUID = () => {
    dispatch({ type: "RESET_CHARACTERISTIC_UUID" });
  };

  const setCommand = (command: object) => {
    dispatch({ type: "SET_COMMAND", payload: command });
  };

  const onValueChange = (value: string | null | undefined) => {
    const response = processResponses(value);
    dispatch({ type: "SET_DEVICE_RESPONSE", payload: response });
  };

  const onError = (error: BleError | null | unknown) => {
    console.error("Error when trying to monitor feature.", error);
  };

  const resetBluetooth = async () => {
    if (state.connectedDevice) {
      await disconnectDevice(state.connectedDevice.id);
    }

    dispatch({ type: "RESET_BLUETOOTH" });
  };

  useEffect(() => {
    const stateChangeListener = manager.onStateChange(
      handleBluetoothStateChange,
      true
    );

    return () => {
      if (manager) {
        stateChangeListener.remove();
        manager.destroy();
      }
    };
  }, []);

  useEffect(() => {
    let subscription: Subscription | undefined;

    const monitorDevice = async () => {
      if (subscription) {
        subscription.remove();
      }

      subscription = await monitorCharacteristicForDevice(
        state.serviceUUID,
        state.characteristicUUID,
        onValueChange,
        onError
      );
    };

    monitorDevice();

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [state.connectedDevice]);

  useEffect(() => {
    const writeCharacteristic = async () => {
      await writeCharacteristicWithResponseForDevice(
        state.serviceUUID,
        state.characteristicUUID,
        state.command
      );
    };

    writeCharacteristic();
  }, [state.serviceUUID, state.characteristicUUID, state.command]);

  // useEffect(() => {
  //   const checkConnectedDevices = async () => {
  //     try {
  //       const connectedDevices = await manager.connectedDevices([]);

  //       if (connectedDevices.length > 0) {
  //         // Existem dispositivos conectados
  //         console.log("Existem dispositivos conectados:", connectedDevices);
  //       } else {
  //         // Não existem dispositivos conectados
  //         dispatch({ type: "CONNECT_DEVICE", payload: false })
  //         dispatch({ type: "REMOVE_DEVICE" })
  //         console.log("Não existem dispositivos conectados.");
  //       }
  //     } catch (error) {
  //       console.error("Erro ao obter dispositivos conectados:", error);
  //     }
  //   };

  //   checkConnectedDevices();

  //   // // Defina um intervalo para verificar periodicamente se há dispositivos conectados
  //   // const interval = setInterval(checkConnectedDevices, 5000); // A cada 5 segundos

  //   // return () => {
  //   //   clearInterval(interval);
  //   // };
  // }, []);

  return (
    <BluetoothContext.Provider
      value={{
        devices: state.devices,
        connectedDevice: state.connectedDevice,

        deviceResponse: state.deviceResponse,

        bluetoothState: state.bluetoothState,
        bluetoothEnabled: state.bluetoothEnabled,

        deviceIsConnected: state.deviceIsConnected,
        permissionsGranted: state.permissionsGranted,

        setCommand,
        resetBluetooth,
        setServiceUUID,
        setCharacteristicUUID,

        scanForDevices,
        connectToDevice,
        disconnectDevice,

        writeCharacteristicWithResponseForDevice,

        requestPermissions,
        changeGrantedPermissions,

        monitorCharacteristicForDevice,
        connectAndMonitorCharacteristicForDevice,
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
