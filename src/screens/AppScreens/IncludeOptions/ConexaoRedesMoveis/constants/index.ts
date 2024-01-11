import * as yup from "yup";

import { IInput, TypeInitialState, TypeResponse } from "../types";

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

const responses: TypeResponse = {
  0: {
    title: "Configuração Concluída",
    subtitle: "A configuração de dados móveis foi realizada com sucesso.",
    text: "Continuar",
  },
  1: {
    title: "Dispositivo Não Encontrado",
    subtitle:
      "O dispositivo BLE não pôde ser localizado. Certifique-se de que está próximo e pronto para emparelhamento.",
    text: "Tentar Novamente",
  },
  2: {
    title: "Erro na Configuração",
    subtitle:
      "Houve um problema ao tentar configurar os dados móveis no dispositivo BLE. Verifique as configurações e tente novamente.",
    text: "Tentar Novamente",
  },
  3: {
    title: "Operação Cancelada",
    subtitle:
      "A operação de configuração foi cancelada pelo usuário ou devido a um problema inesperado.",
    text: "Tentar Novamente",
  },
  4: {
    title: "Credenciais Inválidas",
    subtitle:
      "As credenciais fornecidas são inválidas. Verifique as  credencias fornecidas e tente novamente.",
    text: "Tentar Novamente",
  },
  5: {
    title: "Operação Cancelada",
    subtitle:
      "No momento não é possível executar a configuração. Aguarde um momento e tente novamente.",
    text: "Tentar Novamente",
  },
};

const schema = yup.object({
  ponto: yup.string().required("Informe o ponto de acesso."),
  usuario: yup.string().required("Informe o usuário."),
  senha: yup.string().required("Informe a senha."),
});

const initialState: TypeInitialState = {
  values: [],
  isLoading: false,
};

export { inputs, responses, schema, initialState };
