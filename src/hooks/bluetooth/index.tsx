import React, { createContext, useContext, useReducer } from "react";

import { Device } from "react-native-ble-plx";

import { reducer } from "./reducer";
import { initialState } from "./initial-state";
import { BluetoothContextData, BluetoothProviderProps } from "./types";

export const BluetoothContext = createContext<BluetoothContextData>(
  {} as BluetoothContextData,
);

const BluetoothProvider = ({ children }: BluetoothProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log("STATE CONTEXT:", state.device?.id);

  const setDevice = (device: Device) => {
    dispatch({ type: "SET_DEVICE", payload: device });
  };

  const removeDevice = () => {
    dispatch({ type: "REMOVE_DEVICE" });
  };

  return (
    <BluetoothContext.Provider
      value={{
        device: state.device,
        setDevice,
        removeDevice,
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
