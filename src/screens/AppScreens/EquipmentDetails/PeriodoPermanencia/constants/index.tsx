import { Entypo, FontAwesome5 } from "@expo/vector-icons";

import { DatePickerSelection, State } from "../types";
import { endOfDay, startOfDay, subDays } from "date-fns";

const card: { [key: number]: { icon: JSX.Element; title: string } } = {
  0: {
    icon: <Entypo name="location" size={20} color="#FFF" />,
    title: "Em geocercas",
  },
  1: {
    icon: <FontAwesome5 name="dot-circle" size={22} color="#FFF" />,
    title: "Em pontos de interesse",
  },
  2: {
    icon: <FontAwesome5 name="map-marked-alt" size={22} color="#FFF" />,
    title: "Outras localizações",
  },
};

const resposta = {
  0: {
    title: "Falha na Conexão",
    subtitle: "Não foi possível conectar com o servidor",
    text: "Tentar Novamente",
  },
};

const initialState: State = {
  data: null,
  isLoading: false,
  isOpenModal: false,
  useData: false,
  period: 1,
  date: {
    final: endOfDay(new Date()),
    start: startOfDay(subDays(new Date(), 1)),
  },
  datePicker: { isVisible: false, selected: DatePickerSelection.Start },
};

export { initialState, card, resposta };
