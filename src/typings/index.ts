type Messages = {
  [key: number]: { title: string; subtitle: string; text?: string };
};

type User = {
  incluir: boolean;
  codigoUsuario: number;
  codigoParceiro: number;
  codigoCliente: number;
  nomeUsuario: string;
  cpf: number;
  email: string;
  senha: string;
  nivelAcesso: string;
  celular: string;
  telefone: string;
  status: number;
  jwtToken: string;
  tipoUsuario: number;
  tipoAplicacao: number;
  erro: number;
};

type Customer = {
  incluir: boolean;
  codigoCliente: number;
  codigoParceiro: number;
  nomeCliente: string;
  cnpjcpf: string;
  email: string;
  token: string;
  telefone: string;
  cep: number;
  logradouro: string;
  numero: number;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  status: number;
  criadoEmFormatado: string;
  criadoEm: string;
};

export { User, Messages, Customer };
