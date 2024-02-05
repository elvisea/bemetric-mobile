enum DatePickerSelection {
  Start = "start",
  Final = "final",
}

type DadosEntrada = {
  horasTrabalhadasGeocerca: number;
  horasTrabalhadasOutrasLocalizacoes: number;
  horasTrabalhadasPontoInteresse: number;
  paradoIgnicaoDesligadaGeocerca: number;
  paradoIgnicaoDesligadaOutrasLocalizacoes: number;
  paradoIgnicaoDesligadaPontoInteresse: number;
  paradoIgnicaoLigadaGeocerca: number;
  paradoIgnicaoLigadaOutrasLocalizacoes: number;
  paradoIgnicaoLigadaPontoInteresse: number;
  tempoExecucao: number;
  totalHorasGeocerca: number;
  totalHorasOutrasLocalizacoes: number;
  totalHorasPontoInteresse: number;
};

type AreaDetalhe = {
  horasTrabalhadas: number;
  paradoIgnicaoDesligada: number;
  paradoIgnicaoLigada: number;
  totalHoras: number;
};

type Data = {
  tempoExecucao: number;
  area: {
    outros: AreaDetalhe;
    pontos: AreaDetalhe;
    geocerca: AreaDetalhe;
  };
};

type State = {
  data: Data | null;
  isLoading: boolean;
  useData: boolean;
  isOpenModal: boolean;
  period: number;
  date: { final: Date; start: Date };
  datePicker: { selected: DatePickerSelection; isVisible: boolean };
};

export { Data, DadosEntrada, AreaDetalhe, State, DatePickerSelection };
