import { Device } from "react-native-ble-plx";

type ITypeParams = {
  params: {
    codigoEquipamento: number;
  };
};

type TypeTelemetry = {
  bat: number;
  chave: string;
  codigoEquipamento: number;
  dataAtivacao: string;
  dataUltimaAtualizacao: string;
  firmware: string;
  serial: string;
  slt: number;
  status: number;
  tms: number;
  wfl: number;
};

type TypeInitialState = {
  values: string[];
  devices: Device[];
  isLoading: boolean;
  bluetoothEnabled: boolean;
  isConnecting: boolean;
  permissionsGranted: boolean;
};

export { TypeInitialState, ITypeParams, TypeTelemetry };
