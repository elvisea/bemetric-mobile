type ITypeParams = {
  params: {
    codigoEquipamento: number;
  };
};

type TypeData = {
  bat: number;
  chave: string;
  codigoEquipamento: number;
  dataAtivacao: string;
  dataUltimaAtualizacao: string;
  firmware: string;
  serial: string;
  slt: number;
  status: number;
  tms: number;
  wfl: number;
};

type TypeInitialState = {
  data: TypeData | null;
  signals: object;
  title: "Conectado" | "Desconectado" | "Conectando...";
  isLoading: boolean;
  isConnecting: boolean;
};

export { TypeInitialState, ITypeParams, TypeData };
