import * as yup from "yup";

import { IInput, TypeResponse } from "../types";

const inputs: IInput[] = [
  {
    id: "01",
    title: "Ponto de acesso",
    name: "ponto",
    keyboardType: "default",
  },
  {
    id: "02",
    title: "Usuário",
    name: "usuario",
    keyboardType: "default",
  },
  {
    id: "03",
    title: "Senha",
    name: "senha",
    keyboardType: "default",
  },
];

const response: TypeResponse = {
  0: {
    title: "Dispositivo liberado para ser associado.",
    subtitle: "Continue o processo de cadastro.",
  },
  1: {
    title: "Dispositivo não localizado",
    subtitle: "Dispositivo não localizado",
  },
  2: {
    title: "Dispositivo não disponível",
    subtitle: "Dispositivo não liberado para ser associado",
  },
  3: {
    title: "Falha na verificação",
    subtitle: "Falha na verificação",
  },
};

const schema = yup.object({
  ponto: yup.string().required("Informe o ponto de acesso."),
  usuario: yup.string().required("Informe o usuário."),
  senha: yup.string().required("Informe a senha."),
});

export { inputs, response, schema };
