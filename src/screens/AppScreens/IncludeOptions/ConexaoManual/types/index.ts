import { KeyboardTypeOptions } from "react-native";

type IName = "nome" | "senha";

type IInput = {
  id: string;
  name: IName;
  title: string;
  keyboardType: KeyboardTypeOptions;
};

type TypeInitialState = {
  values: string[];
  isLoading: boolean;
};

export { IName, IInput, TypeInitialState };
