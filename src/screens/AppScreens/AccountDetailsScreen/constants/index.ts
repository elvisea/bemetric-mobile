import * as yup from "yup";

const schema = yup.object({
  name: yup
    .string()
    .required("O campo 'Nome' é obrigatório. Insira seu nome completo."),
  mobile: yup
    .string()
    .required("O campo 'Celular' é obrigatório. Insira seu Celular."),
  phone: yup
    .string()
    .required("O campo 'Telefone' é obrigatório. Insira seu telefone."),
});

const responses: { [index: number]: { title: string; subtitle: string } } = {
  0: {
    title: "Alteração Concluída",
    subtitle: "O usuário foi atualizado com sucesso no sistema.",
  },
  1: {
    title: "Usuário Não Encontrado",
    subtitle:
      "Verifique se o identificador do usuário está correto e tente novamente.",
  },
  2: {
    title: "Alteração Bloqueada",
    subtitle:
      "Este usuário possui restrições que impedem sua alteração. Contate o administrador do sistema.",
  },
  3: {
    title: "Erro de Comunicação",
    subtitle:
      "Não foi possível completar a solicitação. Por favor, tente novamente mais tarde.",
  },
  4: {
    title: "Erro desconhecido",
    subtitle: "Ocorreu um erro desconhecido. Tente novamente mais tarde.",
  },
};

export { responses, schema };
