type TypeForm = { [index: string]: string };

type TypeResponses = { [index: number]: { title: string; subtitle: string } };

type TypeParams = {
  name: string;
  email: string;
  password: string;
  client: string;
  identification: string;
  type: number;
  tokenCliente: string;
  tipoCNPJCPF: number;
};

export { TypeForm, TypeParams, TypeResponses };
