import * as yup from "yup";

import { TypeInput, TypeResponses } from "../types";

const schema = yup.object({
  serial: yup.string().required("Informe o serial"),
  chave: yup.string().required("Informe a chave"),
});

const inputs: TypeInput[] = [
  {
    id: "01",
    title: "Serial",
    name: "serial",
    keyboardType: "default",
  },
  {
    id: "02",
    title: "Chave",
    name: "chave",
    keyboardType: "default",
  },
];

const responses: TypeResponses = {
  0: {
    title: "Dispositivo liberado para ser associado",
    subtitle: "Continue o processo de cadastro",
    text: "Continuar",
  },
  1: {
    title: "Dispositivo não localizado",
    subtitle: "Dispositivo não localizado",
    text: "Voltar",
  },
  2: {
    title: "Dispositivo não disponível",
    subtitle: "Dispositivo não liberado para ser associado",
    text: "Continuar",
  },
  3: {
    title: "Falha na verificação",
    subtitle: "Falha na verificação",
    text: "Continuar",
  },
  4: {
    title: "Dispositivo não encontrado",
    subtitle:
      "Verifique se o Dispositivo está ligado ou se o Serial está correto e tente novamente",
    text: "Continuar",
  },
  5: {
    title: "Dispositivo liberado",
    subtitle: "Dispositivo liberado para ser associado. Continue seu cadastro",
    text: "Continuar",
  },
  6: {
    title: "Credenciais Inválidas",
    subtitle: "Verifique as credencias fornecidas e tente novamente.",
    text: "OK",
  },
  7: {
    title: "Não foi possível conectar com o dispositivo",
    subtitle: "Não foi possível conectar com o dispositivo",
    text: "OK",
  },
  8: {
    title: "Credenciais válidas",
    subtitle: "Verificar disponibilidade do dispositivo",
    text: "Verificar",
  },
};

export { schema, inputs, responses };
