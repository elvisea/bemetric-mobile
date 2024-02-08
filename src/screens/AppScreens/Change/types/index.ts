import { Messages } from "@typings/index";

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
  messages: Messages;
};

export { State, Action, Equipment };
