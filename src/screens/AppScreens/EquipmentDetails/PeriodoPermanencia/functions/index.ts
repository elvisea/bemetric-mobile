import { DadosEntrada, Data } from "../types";

function transformData(entrada: DadosEntrada): Data {
  return {
    tempoExecucao: entrada.tempoExecucao,
    area: {
      geocerca: {
        horasTrabalhadas: entrada.horasTrabalhadasGeocerca,
        paradoIgnicaoDesligada: entrada.paradoIgnicaoDesligadaGeocerca,
        paradoIgnicaoLigada: entrada.paradoIgnicaoLigadaGeocerca,
        totalHoras: entrada.totalHorasGeocerca,
      },
      pontos: {
        horasTrabalhadas: entrada.horasTrabalhadasPontoInteresse,
        paradoIgnicaoDesligada: entrada.paradoIgnicaoDesligadaPontoInteresse,
        paradoIgnicaoLigada: entrada.paradoIgnicaoLigadaPontoInteresse,
        totalHoras: entrada.totalHorasPontoInteresse,
      },
      outros: {
        horasTrabalhadas: entrada.horasTrabalhadasOutrasLocalizacoes,
        paradoIgnicaoDesligada:
          entrada.paradoIgnicaoDesligadaOutrasLocalizacoes,
        paradoIgnicaoLigada: entrada.paradoIgnicaoLigadaOutrasLocalizacoes,
        totalHoras: entrada.totalHorasOutrasLocalizacoes,
      },
    },
  };
}

const formatHours = (data: Data | null, time: number) => {
  if (data) {
    const hour = Math.floor(time);
    const decimal = (time - hour).toFixed(2);
    const minutes = parseInt(decimal.replace(".", ""));

    if (minutes === 0) {
      return `${hour}h`;
    } else {
      return `${hour}h e ${minutes}min`;
    }
  }

  return "-";
};

export { transformData, formatHours };
