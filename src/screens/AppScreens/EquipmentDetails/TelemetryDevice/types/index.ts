import { Device } from "react-native-ble-plx";

type ITypeParams = {
  params: {
    codigoEquipamento: number;
  };
};

type TypeData = {
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
  data: TypeData | null;
  devices: Device[];
  isLoading: boolean;
  bluetoothEnabled: boolean;
  isConnecting: boolean;
  permissionsGranted: boolean;
};

export { TypeInitialState, ITypeParams, TypeData };
