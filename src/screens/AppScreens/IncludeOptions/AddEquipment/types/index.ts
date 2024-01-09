import { KeyboardTypeOptions } from "react-native";

type TypeForm = {
  equipmentName: string;
  equipmentIdentifier: string;
  equipmentModel: string;
  equipmentPlate: string;
  equipmentYear: string;
  deviceSerial: string;
  devicekey: string;
  initialHourMeter: string;
  acquisitionDate: string;
  initialOdometer: string;
};

type Agrupamento = {
  nome: string;
  novo: boolean;
  codigo: number;
  key: string;
};

type TypeGrouping = {
  nomeAgrupamento: string;
  codigoAgrupamento: number;
};

type ListaEquipamento = {
  tipoEquipamento: string;
};

type Equipamento = {
  key: string;
  tipo: string;
};

type Data = {
  agrupamentos: Agrupamento[];
  equipamentos: Equipamento[];
};

type Typeparams = { chave: string; serial: string };

type IName =
  | "equipmentName"
  | "equipmentIdentifier"
  | "equipmentModel"
  | "equipmentPlate"
  | "equipmentYear"
  | "deviceSerial"
  | "devicekey"
  | "initialHourMeter"
  | "initialOdometer";

type IInput = {
  id: string;
  name: IName;
  title: string;
  keyboardType: KeyboardTypeOptions;
};

export {
  TypeForm,
  Agrupamento,
  TypeGrouping,
  ListaEquipamento,
  Data,
  Equipamento,
  Typeparams,
  IInput,
  IName,
};
