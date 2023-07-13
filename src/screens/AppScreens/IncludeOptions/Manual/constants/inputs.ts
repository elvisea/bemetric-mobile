import { KeyboardTypeOptions } from "react-native";

type IName = "chave" | "serial";

type IInput = {
  id: string;
  name: IName;
  title: string;
  keyboardType: KeyboardTypeOptions;
};

const inputs: IInput[] = [
  { id: "01", title: "Serial", name: "serial", keyboardType: "default" },
  { id: "02", title: "Chave", name: "chave", keyboardType: "default" },
];

export { inputs };
