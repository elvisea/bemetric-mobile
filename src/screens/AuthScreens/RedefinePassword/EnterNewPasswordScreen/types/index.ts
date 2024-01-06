type TypeForm = {
  password: string;
  password_confirm: string;
};

type TypeParams = {
  email: string;
  codigoAtivacao: string;
};

type TypeResponses = {
  [key: number]: { title: string; subtitle: string; text?: string };
};

export { TypeForm, TypeParams, TypeResponses };
