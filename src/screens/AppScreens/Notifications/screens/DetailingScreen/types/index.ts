import { LatLng, Region } from "react-native-maps";

import { Responses } from "@typings/index";

type ReceivedData = {
  atividade: number;
  criadoEmFormatado: string;
  hodometro: number;
  horimetro: string;
  identificador: string;
  jsonCoordenads: string;
  latitude: number;
  latitudeFormatada: string;
  longitude: number;
  longitudeFormatada: string;
  mensagemHtml: string;
  nomeCliente: string;
  nomeEquipamento: string;
  raioPI: number;
  tipoCoordenadas: number;
  velocidade: number;
  registroApp: string;
  marcadorApp: string;
  geoFence: [{ latitude: number; longitude: number }];
  pointFence: { latitude: number; longitude: number; raio: number };
  horimetroFormatado: string;
};

type Params = {
  codigoEvento: number;
  codigoEquipamento: number;
  codigoDispositivo: number;
};

type Status = {
  speed: number;
  odometer: number;
  hourmeter: string;
};

type Equipment = {
  name: string;
  status: Status;
};

type Fetch = {
  user: number;
  event: number;
  equipment: number;
  device: number;
};

type Data = {
  equipment: Equipment;
  coordinate: LatLng;
  initialRegion: Region | undefined;
  coord: { type: number };
  point: {
    radius: number;
    coordinate: LatLng;
  };

  geofence: LatLng[];

  date: string;
  marker: string;
  register: string;
};

type State = {
  isLoading: boolean;

  data: Data;

  responses: Record<"error", Responses>;
};

export { ReceivedData, Params, State, Data, Fetch };
