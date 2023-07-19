import { KeyboardTypeOptions } from "react-native";

type IName = "ponto" | "usuario" | "senha";

type IInput = {
  id: string;
  name: IName;
  title: string;
  keyboardType: KeyboardTypeOptions;
};

const inputs: IInput[] = [
  {
    id: "01",
    title: "Ponto de acesso",
    name: "ponto",
    keyboardType: "default",
  },
  {
    id: "02",
    title: "Usuário",
    name: "usuario",
    keyboardType: "default",
  },
  {
    id: "03",
    title: "Senha",
    name: "senha",
    keyboardType: "default",
  },
];

export { inputs };
