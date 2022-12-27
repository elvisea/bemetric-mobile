import { Feather } from "@expo/vector-icons";

export interface Option {
  id: string;
  icon: keyof typeof Feather.glyphMap;
  width: string;
  height: string;
  title: string;
}
