import { KeyboardTypeOptions } from "react-native";

type IName = "nome" | "senha";

type IInput = {
  id: string;
  name: IName;
  title: string;
  keyboardType: KeyboardTypeOptions;
};

type TypeResponse = {
  [key: number]: { title: string; subtitle: string; text: string };
};

type TypeAction = { action?: () => void; response: TypeResponse[number] };

export { IName, IInput, TypeResponse, TypeAction };
