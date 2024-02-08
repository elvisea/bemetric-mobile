import { Messages } from "@typings/index";

type MessageReceived = {
  codigoMensagem: number;
  dataEnvio: string;
  descricao: string;
  descricaosemhtml: string;
  mensagemLida: boolean;
  tipoMensagem: number;
  titulo: string;
};

type NormalizedMessages = {
  id: string;
  title: string;
  code: number;
  date: string;
  html: string;
  read: boolean;
  type: number;
  description: string;
};

type Types = {
  [index: number]: {
    read: {
      color: string;
      icon: JSX.Element;
    };
    unread: {
      color: string;
      icon: JSX.Element;
    };
  };
};

type State = {
  types: Types;
  isLoading: boolean;
  messages: NormalizedMessages[];
  responses: Messages;
};

export { MessageReceived, NormalizedMessages, Types, State };
