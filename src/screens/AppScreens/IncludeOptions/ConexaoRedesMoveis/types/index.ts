import { KeyboardTypeOptions } from "react-native";

type IName = "ponto" | "usuario" | "senha";

type IInput = {
  id: string;
  name: IName;
  title: string;
  keyboardType: KeyboardTypeOptions;
};

type TypeResponse = { [index: number]: { title: string; subtitle: string } };

export { IName, IInput, TypeResponse };
