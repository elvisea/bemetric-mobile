import { Responses } from "@typings/index";
import { Data, State } from "../types";

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import IconHourMeter from "@assets/hourmeter.svg";
import IconSpeedometer from "@assets/speedometer.svg";

import { THEME } from "@theme/theme";

const items = [
  { title: "Velocimetro", label: "Km/h", icon: <IconSpeedometer /> },
  {
    title: "Hodômetro",
    label: "Km",

    icon: (
      <Ionicons
        name="speedometer-outline"
        color={THEME.colors.gray[50]}
        size={22}
      />
    ),
  },
  { title: "Horímetro", label: "", icon: <IconHourMeter /> },
];

const icons: { [index: number]: JSX.Element } = {
  0: <Ionicons name="flag" size={20} color={THEME.colors.blue[700]} />,
  1: (
    <MaterialCommunityIcons
      name="bell-ring"
      color={THEME.colors.yellow[100]}
      size={20}
    />
  ),
};

const type: { [key: number]: string } = {
  0: "Geocerca",
  1: "Ponto de interesse",
};

const responses: Record<"error", Responses> = {
  error: {
    0: {
      title: "Erro de Comunicação",
      subtitle:
        "Não foi possível completar a solicitação. Por favor, tente novamente mais tarde.",
    },
  },
};

const data: Data = {
  equipment: {
    name: "",
    status: {
      speed: 0,
      odometer: 0,
      hourmeter: "0",
    },
  },
  initialRegion: undefined,
  coordinate: { latitude: 0, longitude: 0 },
  coord: { type: 0 },
  point: {
    radius: 0,
    coordinate: { latitude: 0, longitude: 0 },
  },
  geofence: [],
  date: "",
  marker: "",
  register: "",
};

const initialState: State = {
  isLoading: false,
  data,
  responses,
};

export { data, initialState, items, icons, type };
