export interface IPeriodStay {
  tempoExecucao: number;

  totalHorasGeocerca: number;
  horasTrabalhadasGeocerca: number;
  paradoIgnicaoLigadaGeocerca: number;
  paradoIgnicaoDesligadaGeocerca: number;

  totalHorasPontoInteresse: number;
  horasTrabalhadasPontoInteresse: number;
  paradoIgnicaoLigadaPontoInteresse: number;
  paradoIgnicaoDesligadaPontoInteresse: number;

  totalHorasOutrasLocalizacoes: number;
  horasTrabalhadasOutrasLocalizacoes: number;
  paradoIgnicaoLigadaOutrasLocalizacoes: number;
  paradoIgnicaoDesligadaOutrasLocalizacoes: number;
}
