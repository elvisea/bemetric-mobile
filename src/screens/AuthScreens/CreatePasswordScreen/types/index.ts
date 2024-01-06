type TypeForm = {
  password: string;
  password_confirm: string;
};

type TypeParams = {
  name: string;
  email: string;
  client: string;
  identification: string;
  type: number;
  tokenCliente: string;
  tipoCNPJCPF: number;
};

export { TypeForm, TypeParams };
