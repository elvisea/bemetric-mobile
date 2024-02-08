import { Responses } from "@typings/index";

type Action = "vincular" | "desvincular";

type Equipment = {
  nomeEquipamento: string;
  dispositivoSerial: string;
  codigoEquipamento: number;
};

type State = {
  isLoading: boolean;
  isOpenModal: boolean;
  equipments: Equipment[];
  action: Action;
  selected: Equipment | null;
  responses: Responses;
};

export { State, Action, Equipment };
