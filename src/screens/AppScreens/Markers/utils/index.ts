import { LatLng } from "react-native-maps";

interface ICoordinate {
  latitude: number;
  longitude: number;
}

const calculateDelta = (coordenadas: ICoordinate[]) => {
  const margemAjuste = 1;
  const minLatitude = Math.min(
    ...coordenadas.map((coordenada) => coordenada.latitude),
  );
  const maxLatitude = Math.max(
    ...coordenadas.map((coordenada) => coordenada.latitude),
  );
  const minLongitude = Math.min(
    ...coordenadas.map((coordenada) => coordenada.longitude),
  );
  const maxLongitude = Math.max(
    ...coordenadas.map((coordenada) => coordenada.longitude),
  );

  const amplitudeLatitude = maxLatitude - minLatitude;
  const amplitudeLongitude = maxLongitude - minLongitude;

  const margemLatitude = margemAjuste * amplitudeLatitude;
  const margemLongitude = margemAjuste * amplitudeLongitude;

  const latitudeDelta = amplitudeLatitude + margemLatitude;
  const longitudeDelta = amplitudeLongitude + margemLongitude;

  return { latitudeDelta, longitudeDelta };
};

const calculateInitialRegion = (coordenadas: ICoordinate[]) => {
  const numCoordenadas = coordenadas.length;

  let somaLatitudes = 0;
  let somaLongitudes = 0;

  coordenadas.forEach((coordenada: any) => {
    somaLatitudes += coordenada.latitude;
    somaLongitudes += coordenada.longitude;
  });

  const mediaLatitude = somaLatitudes / numCoordenadas;
  const mediaLongitude = somaLongitudes / numCoordenadas;

  const pontoCentral = {
    latitude: mediaLatitude,
    longitude: mediaLongitude,
  };

  return pontoCentral;
};

function getDeltaFromRadius(
  center: LatLng,
  radius: number,
): { latitude: number; longitude: number } {
  const earthCircumference = 40075016.686;

  const latDelta = (radius / earthCircumference) * 360;

  const lonDelta =
    (radius /
      (Math.cos((center.latitude * Math.PI) / 180) * earthCircumference)) *
    360;

  return { latitude: latDelta * 5, longitude: lonDelta * 5 };
}

export { calculateDelta, calculateInitialRegion, getDeltaFromRadius };
