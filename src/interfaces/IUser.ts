export interface IUser {
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
}
