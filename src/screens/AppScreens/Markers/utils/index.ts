interface ICoordinate {
  latitude: number;
  longitude: number;
}

const calculateDelta = (coordenadas: ICoordinate[]) => {
  const margemAjuste = 1;
  // Encontrar os valores mínimos e máximos de latitude e longitude
  const minLatitude = Math.min(
    ...coordenadas.map((coordenada) => coordenada.latitude)
  );
  const maxLatitude = Math.max(
    ...coordenadas.map((coordenada) => coordenada.latitude)
  );
  const minLongitude = Math.min(
    ...coordenadas.map((coordenada) => coordenada.longitude)
  );
  const maxLongitude = Math.max(
    ...coordenadas.map((coordenada) => coordenada.longitude)
  );

  // Calcular a amplitude de latitudes e longitudes
  const amplitudeLatitude = maxLatitude - minLatitude;
  const amplitudeLongitude = maxLongitude - minLongitude;

  // Adicionar a margem de ajuste (se fornecida)
  const margemLatitude = margemAjuste * amplitudeLatitude;
  const margemLongitude = margemAjuste * amplitudeLongitude;

  // Calcular os valores de latitudeDelta e longitudeDelta
  const latitudeDelta = amplitudeLatitude + margemLatitude;
  const longitudeDelta = amplitudeLongitude + margemLongitude;

  return { latitudeDelta, longitudeDelta };
};

const calculateInitialRegion = (coordenadas: ICoordinate[]) => {
  const numCoordenadas = coordenadas.length;

  // Calcular a soma das latitudes e longitudes
  let somaLatitudes = 0;
  let somaLongitudes = 0;

  coordenadas.forEach((coordenada: any) => {
    somaLatitudes += coordenada.latitude;
    somaLongitudes += coordenada.longitude;
  });

  // Calcular as médias das latitudes e longitudes
  const mediaLatitude = somaLatitudes / numCoordenadas;
  const mediaLongitude = somaLongitudes / numCoordenadas;

  // Criar uma nova coordenada com as médias calculadas
  const pontoCentral = {
    latitude: mediaLatitude,
    longitude: mediaLongitude,
  };

  return pontoCentral;
};

export { calculateDelta, calculateInitialRegion };
