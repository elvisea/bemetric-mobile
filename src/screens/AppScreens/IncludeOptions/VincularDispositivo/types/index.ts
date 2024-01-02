import { KeyboardTypeOptions } from "react-native";
import { Device } from "react-native-ble-plx";

type TypeForm = {
  chave: string;
  serial: string;
};

type TypeParams = {
  id?: string;
  chave?: string;
  serial?: string;
};

type TypeResponseStatus = {
  WIFI_STATUS_CONNECTION: string;
  WIFI_STATUS_SSID?: string;
  WIFI_STATUS_BSSID?: string;
  GET_WIFI_STATUS: string;
};

type TypeName = "serial" | "chave";

type TypeInput = {
  id: string;
  name: TypeName;
  title: string;
  keyboardType: KeyboardTypeOptions;
};

type TypeInitialState = {
  devices: Device[];
  isLoading: boolean;
  permissionsGranted: boolean;
};

type TypeResponses = { [key: number]: { title: string; subtitle: string } };

type TypeResponse = object | null | undefined;

export {
  TypeForm,
  TypeParams,
  TypeResponseStatus,
  TypeResponse,
  TypeInput,
  TypeName,
  TypeResponses,
  TypeInitialState,
};
