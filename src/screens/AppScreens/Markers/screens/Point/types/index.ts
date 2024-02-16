import { Region } from "react-native-maps";

import { Responses } from "@typings/index";
import { Coord } from "@screens/AppScreens/Markers/types";

interface IPointsInterest {
  incluir: boolean;
  codigoCliente: number;
  nomePonto: string;
  descricao: string;
  raio: number;
  latitude: number;
  longitude: number;
  alertaEntradaSaida: boolean;
  alertaPermanencia: boolean;
  alertaPermanenciaTempo?: number;
}

type PointReceived = {
  alertaEntradaSaida: boolean;
  alertaPermanencia: boolean;
  alertaPermanenciaTempo?: number;
  codigoCliente: number;
  codigoParceiro: number;
  codigoPontoInteresse: number;
  descricao: string;
  latitude: number;
  longitude: number;
  nomePonto: string;
  raio: number;
};

type NormalizedPoint = {
  alert: boolean;
  permanence: boolean;
  duration?: number;
  client: number;
  partner: number;
  code: number;
  description: string;
  coord: Coord;
  name: string;
  radius: number;
};

type Params = {
  codigoPontoInteresse: number;
};

type State = {
  point: NormalizedPoint | null;
  updatedPoint: NormalizedPoint;
  initialRegion: Region | undefined;
  isOpenModal: boolean;
  isLoading: boolean;
  isEditMode: boolean;
  responses: Record<"update" | "delete", Responses>;
};

export { IPointsInterest, PointReceived, NormalizedPoint, Params, State };
