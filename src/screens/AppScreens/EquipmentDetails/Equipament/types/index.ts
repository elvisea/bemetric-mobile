import { Responses } from "@typings/index";

type InputData = {
  incluir: boolean;
  codigoEquipamento: number;
  nomeEquipamento: string;
  tipoEquipamento: string;
  dataAquisicaoFormatado: string;
  placa: string;
  identificador: string;
  modelo: string;
  ano: string;
  horimetroIncial: number;
  hodometroIncial: number;
  nomeCliente: string;
};

type Equipment = {
  client: string;
  name: string;
  type: string;
  acquisition: string;
  plate: string;
  identifier: string;
  model: string;
  year: string;
  initial: {
    hourmeter: number;
    odometer: number;
  };
};

type Params = {
  params: {
    codigoEquipamento: number;
  };
};

type DataReceived = {
  hodometro: number;
  horimetro: number;
  status: number;
  velocimetro: number;
  horimetroFormatado: string;
};

type TransformedData = {
  odometer: number;
  hourmeter: number;
  status: number;
  speedometer: number;
  hourmeterFormatted: string;
};

type State = {
  isLoading: boolean;
  equipment: Equipment | null;
  data: TransformedData | null;
  responses: Responses;
};

export { State, Equipment, InputData, DataReceived, TransformedData, Params };
