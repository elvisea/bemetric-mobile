import uuid from "react-native-uuid";

import { MessageReceived, NormalizedMessages } from "../types";

const normalizeMessages = (data: MessageReceived[]): NormalizedMessages[] => {
  if (typeof data === "string") return [];

  return data.map((message) => ({
    id: uuid.v4().toString(),
    title: message.titulo,
    code: message.codigoMensagem,
    date: message.dataEnvio,
    html: message.descricaosemhtml,
    read: message.mensagemLida,
    type: message.tipoMensagem,
    description: message.titulo,
  }));
};

export { normalizeMessages };
