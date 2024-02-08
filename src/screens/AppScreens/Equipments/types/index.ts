import { Responses } from "@typings/index";

type Group = {
  key: string;
  name: string;
  description: string;
  equipments: Equipment[];
};

type Equipment = {
  key: string;
  code: number;
  name: string;
  speed: number;
  online: boolean;
};

type GroupingReceived = {
  incluir: boolean;
  codigoAgrupamento: number;
  nomeAgrupamento: string;
  descricao: string;
  listaEquipamentos: EquipmentReceived[];
};

type EquipmentReceived = {
  incluir: boolean;
  codigoEquipamento: number;
  nomeEquipamento: string;
  ligado: boolean;
  velocidade: number;
};

type Count = { events: number; messages: number };

type CountReceived = {
  contadorEvento: number;
  contadorMensagem: number;
};

type State = {
  isLoading: boolean;
  expanded: string;
  count: Count;
  groupings: Group[];
  responses: Responses;
};

export {
  Group,
  Equipment,
  GroupingReceived,
  EquipmentReceived,
  State,
  CountReceived,
  Count,
};
