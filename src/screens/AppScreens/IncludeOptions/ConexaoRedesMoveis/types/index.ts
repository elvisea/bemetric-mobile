import { KeyboardTypeOptions } from "react-native";

type IName = "ponto" | "usuario" | "senha";

type IInput = {
  id: string;
  name: IName;
  title: string;
  keyboardType: KeyboardTypeOptions;
};

type TypeForm = { ponto: string; usuario: string; senha: string };

type TypeAction = { action?: () => void; response: TypeResponse[number] };

type TypeResponse = {
  [index: number]: { title: string; subtitle: string; text: string };
};

export { IName, IInput, TypeResponse, TypeForm, TypeAction };
