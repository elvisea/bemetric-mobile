import { KeyboardTypeOptions } from "react-native";

type IName =
  | "equipmentName"
  | "equipmentIdentifier"
  | "equipmentModel"
  | "equipmentPlate"
  | "equipmentYear"
  | "deviceSerial"
  | "devicekey"
  | "initialHourMeter"
  | "acquisitionDate"
  | "initialOdometer";

type IInput = {
  id: string;
  name: IName;
  title: string;
  keyboardType: KeyboardTypeOptions;
};

const inputs: IInput[] = [
  { id: "1", title: "Nome", name: "equipmentName", keyboardType: "default" },
  {
    id: "2",
    title: "Identificador",
    name: "equipmentIdentifier",
    keyboardType: "default",
  },
  { id: "3", title: "Modelo", name: "equipmentModel", keyboardType: "default" },
  { id: "4", title: "Placa", name: "equipmentPlate", keyboardType: "default" },
  { id: "5", title: "Ano", name: "equipmentYear", keyboardType: "numeric" },
  {
    id: "6",
    title: "Serial Dispositivo",
    name: "deviceSerial",
    keyboardType: "default",
  },
  {
    id: "7",
    title: "Chave Dispositivo",
    name: "devicekey",
    keyboardType: "default",
  },
  {
    id: "8",
    title: "Horímetro Inicial",
    name: "initialHourMeter",
    keyboardType: "numeric",
  },
  {
    id: "9",
    title: "Hodômetro Inicial",
    name: "initialOdometer",
    keyboardType: "numeric",
  },
  {
    id: "10",
    title: "Data Aquisição",
    name: "acquisitionDate",
    keyboardType: "default",
  },
];

export { inputs };
