import { Feather } from "@expo/vector-icons";

export interface IOption {
  id: string;
  icon: keyof typeof Feather.glyphMap;
  width: string;
  height: string;
  title: string;
}
