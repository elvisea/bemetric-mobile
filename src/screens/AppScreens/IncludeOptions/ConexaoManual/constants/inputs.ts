import { KeyboardTypeOptions } from "react-native";

type IName = "nome" | "senha";

type IInput = {
  id: string;
  name: IName;
  title: string;
  keyboardType: KeyboardTypeOptions;
};

const inputs: IInput[] = [
  {
    id: "01",
    title: "Nome da Rede",
    name: "nome",
    keyboardType: "default",
  },
  {
    id: "02",
    title: "Senha",
    name: "senha",
    keyboardType: "default",
  },
];

export { inputs };
