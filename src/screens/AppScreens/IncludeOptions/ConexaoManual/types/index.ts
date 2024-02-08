import { Messages } from "@typings/index";
import { KeyboardTypeOptions } from "react-native";

type IName = "nome" | "senha";

type IInput = {
  id: string;
  name: IName;
  title: string;
  keyboardType: KeyboardTypeOptions;
};

type TypeAction = { action?: () => void; response: Messages[number] };

export { IName, IInput, TypeAction };
