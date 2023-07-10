interface IMessage {
  codigoParceiro: number;
  dataEnvio: string;
  descricao: string;
  listaClientes: null;
  nomeParceiro: string;
  titulo: string;
  todosClientes: number;
}

interface IParams {
  tipoMensagem: number;
  codigoMensagem: number;
}

export { IMessage, IParams };
