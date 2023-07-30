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

import {
  SERVICE_UUID,
  CHARACTERISTIC_UUID,
  MONITORED_FEATURE_UUID,
} from "@hooks/uuid";

import { removeBytes } from "@utils/removebytes";

export const BluetoothContext = createContext<BluetoothContextData>(
  {} as BluetoothContextData
);

const manager = new BleManager();

const HEADER = [0x4d, 0x00, 0x00, 0x2c];

const BluetoothProvider = ({ children }: BluetoothProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log("State Bluetooth =>", state);

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
      console.log("Device is connected and can write to a feature 👍");

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

        console.log("Successfully written ✅");
      } catch (error) {
        console.error("Failed when trying to write ❌", error);
      }
    }

    console.log("Device is not connected and cannot write to a feature ❌");
  };

  const monitorCharacteristicForDevice = async (
    device: Device,
    serviceUUID: string,
    characteristicUUID: string,
    onValueChange: (value: string | null | undefined) => void,
    onError: (error: BleError | null | unknown) => void
  ): Promise<Subscription | undefined> => {
    try {
      console.log("Discover all services and features 🔎...");

      const discovered = await device.discoverAllServicesAndCharacteristics();

      const services = await discovered.services();

      const service = services.find((service) => service.uuid === serviceUUID);

      if (!service) {
        return;
      }

      console.log("Service found 👷");

      const characteristics = await service.characteristics();

      const characteristic = characteristics.find(
        (item) => item.uuid === characteristicUUID
      );

      if (!characteristic) {
        return;
      }

      console.log("Characteristic found 👷");

      const subscription = characteristic.monitor((error, characteristic) => {
        if (error) {
          onError(error);
        } else if (characteristic?.value) {
          onValueChange(characteristic.value);
        }
      });

      console.log("Subscription ✅");

      return subscription;
    } catch (error) {
      onError(error);
    }
  };

  const writeCharacteristicWithResponseForService = async (
    device: Device,
    command: object
  ) => {
    console.log("Write Characteristic With Response For Service 🖊...");

    dispatch({ type: "RESET_RETURN_VALUES" });

    let commandString = JSON.stringify(command);

    const commandBuffer = Buffer.from(commandString);

    const size = commandString.length;

    HEADER[3] = size;

    const concatenatedBuffer = Buffer.concat([
      Buffer.from(HEADER),
      commandBuffer,
    ]);

    const valueBase64 = concatenatedBuffer.toString("base64");

    const characteristic =
      await device.writeCharacteristicWithResponseForService(
        SERVICE_UUID,
        CHARACTERISTIC_UUID,
        valueBase64
      );

    return characteristic;
  };

  const onValueChange = (value: string | null | undefined) => {
    if (value) {
      const bytesRemovidos = removeBytes(value);
      const valueAlreadyExists = state.returnedValues.includes(bytesRemovidos);

      if (!valueAlreadyExists) {
        dispatch({ type: "INCLUDE_RETURN_Value", payload: bytesRemovidos });
      }
    }
  };

  const onError = (error: BleError | null | unknown) => {
    console.error("Error when trying to monitor feature.", error);
  };

  const connectToDevice = async (id: string) => {
    try {
      dispatch({ type: "RESET_RETURN_VALUES" });

      const connected = await manager.connectToDevice(id, {
        requestMTU: 500,
      });

      monitorCharacteristicForDevice(
        connected,
        SERVICE_UUID,
        MONITORED_FEATURE_UUID,
        onValueChange,
        onError
      );

      dispatch({ type: "CONNECT_DEVICE", payload: true });
      dispatch({ type: "SET_DEVICE", payload: connected });
    } catch (error) {
      console.error("Failed when trying to connect:", error);
    }
  };

  const resetReturnValues = () => {
    dispatch({ type: "RESET_RETURN_VALUES" });
  };

  const isDeviceConnected = async (id: string) => {
    return await manager.isDeviceConnected(id);
  };

  const checkConnectedDevices = async () => {
    const connectedDevices = await manager.connectedDevices([]);
    if (connectedDevices.length > 0) {
      console.log("There are connected devices");
      return true;
    } else {
      console.log("No devices connected");
      return false;
    }
  };

  const resetBluetooth = async () => {
    if (state.connectedDevice) {
      await disconnectDevice(state.connectedDevice.id);
    }

    dispatch({ type: "RESET_BLUETOOTH" });
  };

  const resetTotal = async () => {
    if (state.connectedDevice) {
      await disconnectDevice(state.connectedDevice.id);
      dispatch({ type: "RESET_TOTAL" });
    }
    dispatch({ type: "RESET_TOTAL" });
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

        returnedValues: state.returnedValues,

        writeCharacteristicWithResponseForService,
        resetReturnValues,

        resetTotal,
        resetBluetooth,

        isDeviceConnected,
        checkConnectedDevices,

        scanForDevices,
        connectToDevice,
        disconnectDevice,

        writeCharacteristicWithResponseForDevice,

        requestPermissions,
        changeGrantedPermissions,

        monitorCharacteristicForDevice,
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
