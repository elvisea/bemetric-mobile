import { Entypo, FontAwesome5, MaterialIcons } from "@expo/vector-icons";

import { THEME } from "@theme/theme";
import { Button, State } from "../types";

const { colors } = THEME;

const url = {
  geofences: "/Geocerca/ObterListaGeocercaApp",
  equipments: "/Dashboard/ObterListaDadosEquipamento",
  points: "/PontoInteresse/ObterListaPontoInteresseApp",
};

const buttons: Button[] = [
  {
    key: "equipment",
    title: "Selecione os Equipamentos",
    icon: <MaterialIcons color={colors.blue[700]} size={20} name="settings" />,
  },
  {
    key: "geofences",
    title: "Selecione as Geocercas",
    icon: <Entypo color={colors.blue[700]} size={20} name="location" />,
  },
  {
    key: "points",
    title: "Selecione os Pontos de Interesse",
    icon: <FontAwesome5 color={colors.blue[700]} size={20} name="dot-circle" />,
  },
];

const initialState: State = {
  modal: { title: "Selecione os Pontos de Interesse", key: "points" },

  markers: {
    points: [],
    geofences: [],
    equipment: [],
  },

  filters: {
    points: [],
    geofences: [],
    equipment: [],
  },

  isLoading: false,
  isOpenModal: false,

  initialRegion: undefined,
};

export { url, initialState, buttons };
