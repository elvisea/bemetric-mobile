type Coordenada = {
  latitude: number;
  longitude: number;
};

const createCoordsGeofence = (data: Coordenada[]) => {
  const coordenadas: Coordenada[] = [];

  for (let index = 0; index < data.length; index++) {
    const coordenada = data[index];

    coordenadas.push({
      latitude: coordenada.latitude,
      longitude: coordenada.longitude,
    });
  }
  return coordenadas;
};

export { createCoordsGeofence };
