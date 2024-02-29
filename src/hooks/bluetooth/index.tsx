import React, { createContext, useContext, useEffect, useReducer } from "react";

import { Device, State } from "react-native-ble-plx";

import BluetoothManager from "@manager/bluetooth";

import { generateResponse, removeDuplicateDevices } from "@utils/bluetooth";

import { reducer } from "./reducer";
import { initialState } from "./initial-state";
import { BluetoothContextData, BluetoothProviderProps } from "./types";

const bluetoothManager = BluetoothManager.getInstance();

export const BluetoothContext = createContext<BluetoothContextData>(
  {} as BluetoothContextData,
);

const BluetoothProvider = ({ children }: BluetoothProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setDevice = (device: Device) => {
    dispatch({ type: "SET_DEVICE", payload: device });
  };

  const removeDevice = () => {
    dispatch({ type: "REMOVE_DEVICE" });
  };

  const connectToDevice = async (id: string) => {
    return await bluetoothManager.connectToDevice(id);
  };

  const disconnectToDevice = async () => {
    await bluetoothManager.disconnectToDevice();
  };

  const clearReceivedValues = () => {
    dispatch({ type: "CLEAR_RECEIVED_VALUES" });
  };

  const addValueReceived = (value: string) => {
    dispatch({ type: "ADD_VALUE", payload: value });
  };

  const setResponse = () => {
    const response = generateResponse<{ [key: string]: string }>(state.values);
    dispatch({ type: "SET_RESPONSE", payload: response });
  };

  const setPermissions = (granted: boolean) => {
    dispatch({ type: "SET_PERMISSIONS", payload: granted });
  };

  const monitorBluetoothState = (state: State) => {
    const isPoweredOn = state === State.PoweredOn;
    dispatch({ type: "SET_BLUETOOTH_STATUS", payload: state });
    dispatch({ type: "SET_BLUETOOTH", payload: isPoweredOn });
  };

  const resetState = () => {
    dispatch({ type: "RESET_STATE" });
  };

  const setDevices = (scannedDevices: Device[]) => {
    const devices = removeDuplicateDevices([
      ...state.devices,
      ...scannedDevices,
    ]);

    dispatch({ type: "SET_DEVICES", payload: devices });
  };

  const sendCommand = async (command: object, time?: number) => {
    try {
      setTimeout(async () => {
        await bluetoothManager.writeCharacteristic(command);
      }, time);
    } catch (error) {
      console.error("Error when trying to write features.", error);
    }
  };

  useEffect(() => {
    const canScan = state.permissionsGranted && state.isEnabled;

    if (canScan) {
      bluetoothManager.scanForDevices((scannedDevices) => {
        setDevices(scannedDevices);
      });
    }

    return () => {
      bluetoothManager.stopScan();
    };
  }, [state.permissionsGranted, state.isEnabled]);

  useEffect(() => {
    const stateChangeListener = bluetoothManager.monitorBluetoothState(
      (state) => monitorBluetoothState(state),
    );

    return () => {
      stateChangeListener.remove();
    };
  }, []);

  useEffect(() => {
    if (state.values.length > 0) {
      setResponse();
    }
  }, [state.values]);

  useEffect(() => {
    const startMonitoring = async () => {
      if (state.device) {
        const subscription =
          await bluetoothManager.monitorCharacteristic(addValueReceived);

        return () => {
          subscription?.remove();
        };
      }
    };

    startMonitoring();
  }, [state.device]);

  return (
    <BluetoothContext.Provider
      value={{
        device: state.device,
        setDevice,
        removeDevice,

        devices: state.devices,
        clearReceivedValues,

        resetState,
        sendCommand,

        values: state.values,
        response: state.response,

        status: state.status,
        isEnabled: state.isEnabled,

        permissionsGranted: state.permissionsGranted,
        setPermissions,

        connectToDevice,
        disconnectToDevice,
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
