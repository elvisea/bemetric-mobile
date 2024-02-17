import { Responses } from "@typings/index";
import { Coord } from "@screens/AppScreens/Markers/types";

type PointForSubmission = {
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
};

type Point = {
  include: boolean;
  client: number;
  name: string;
  description: string;
  radius: number;
  coord: Coord;
  alert: boolean;
  permanence: boolean;
  duration?: number;
};

type State = {
  point: Point;
  responses: Responses;
  touchedMap: boolean;
  isOpenModal: boolean;
};

export { State, Point, PointForSubmission };
