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

export const BluetoothContext = createContext<BluetoothContextData>(
  {} as BluetoothContextData
);

const manager = new BleManager();

const HEADER = [0x4d, 0x00, 0x00, 0x2c];

const BluetoothProvider = ({ children }: BluetoothProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log("Bluetooth:", state);

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

  const connectToDevice = async (id: string) => {
    if (state.deviceIsConnected) {
      return console.error("Device is already connected");
    }

    try {
      const dispositivoConectado = await manager.connectToDevice(id, {
        requestMTU: 500,
      });

      dispatch({ type: "CONNECT_DEVICE" });
      dispatch({ type: "SET_DEVICE", payload: dispositivoConectado });
    } catch (error) {
      console.error("Failed when trying to connect:", error);
    }
  };

  const disconnectDevice = async (id: string) => {
    await manager.cancelDeviceConnection(id);

    dispatch({ type: "REMOVE_DEVICE" });
    dispatch({ type: "CONNECT_DEVICE" });
  };

  const writeCharacteristicWithResponseForDevice = async (
    serviceUUID: string,
    characteristicUUID: string,
    payload: object
  ) => {
    if (state.connectedDevice) {
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
        console.error("Failed when trying to write", error);
      }
    }
  };

  const monitorCharacteristicForDevice = async (
    serviceUUID: string,
    characteristicUUID: string,
    onValueChange: (value: string | null | undefined) => void,
    onError: (error: BleError | null | unknown) => void
  ): Promise<Subscription | undefined> => {
    if (state.connectedDevice) {
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
  };

  const conectar = async (id: string): Promise<Device> => {
    const dispositivoConectado = await manager.connectToDevice(id, {
      requestMTU: 500,
    });

    dispatch({ type: "CONNECT_DEVICE" });
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
      const dispositivo = await conectar(id);

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

  return (
    <BluetoothContext.Provider
      value={{
        devices: state.devices,
        connectedDevice: state.connectedDevice,

        bluetoothState: state.bluetoothState,
        bluetoothEnabled: state.bluetoothEnabled,

        deviceIsConnected: state.deviceIsConnected,
        permissionsGranted: state.permissionsGranted,

        scanForDevices,

        writeCharacteristicWithResponseForDevice,
        connectToDevice,
        disconnectDevice,

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
