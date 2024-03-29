import * as yup from "yup";

import { IInput } from "../types";
import { Responses } from "@typings/index";

const inputs: IInput[] = [
  {
    id: "01",
    title: "Nome da Rede",
    name: "nome",
    keyboardType: "default",
  },
  {
    id: "02",
    title: "Senha",
    name: "senha",
    keyboardType: "default",
  },
];

const responses: Responses = {
  0: {
    title: "Credenciais inválidas.",
    subtitle: "Verifique se as credenciais de acesso estão corretas.",
    text: "Tentar novamente.",
  },
  1: {
    title: "Conectado com Sucesso.",
    subtitle: "Conectado com Sucesso.",
    text: "Continuar Cadastro.",
  },
};

const schema = yup.object({
  nome: yup.string().required("Informe o nome da rede."),
  senha: yup.string().required("Informe a senha da rede"),
});

export { responses, inputs, schema };
