type Message = {
  [key: number]: { title: string; subtitle: string; text?: string };
};

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
  messages: Message;
};

export { Message, State, Action, Equipment };
