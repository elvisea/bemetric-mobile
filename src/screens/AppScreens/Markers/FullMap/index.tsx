import { useCallback, useRef, useState } from "react";
import { Alert, FlatList } from "react-native";

import axios from "axios";
import MapView, { Circle, Marker, Polygon } from "react-native-maps";

import { HStack, IconButton, VStack } from "native-base";

import { useFocusEffect } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";
import { Entypo, FontAwesome5, MaterialIcons } from "@expo/vector-icons";

import api from "@services/api";
import { THEME } from "@theme/theme";
import { useAuth } from "@hooks/authentication";
import { useCustomer } from "@hooks/customer";

import { Button } from "@components/Button";
import { MarkerItem } from "@components/MarkerItem";
import { GenericModal } from "@components/GenericModal";
import { HeaderDefault } from "@components/HeaderDefault";
import { LoadingSpinner } from "@components/LoadingSpinner";

import { ICoordinate } from "../UpdateGeofences/interfaces";

import { calculateDelta, calculateInitialRegion } from "../utils";

import {
  IEquipment,
  IGeofence,
  IInicialRegion,
  IMarker,
  IPoint,
  ISelected,
} from "../interfaces";

export function FullMap() {
  const { colors } = THEME;

  const { user } = useAuth();
  const { customer } = useCustomer();

  const mapRef = useRef<MapView>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [marker, setMarker] = useState<IMarker>({
    points: [] as IPoint[],
    geofences: [] as IGeofence[],
    equipments: [] as IEquipment[],
  });

  const [selectedMarkers, setSelectedMarkers] = useState<IMarker>({
    points: [] as IPoint[],
    geofences: [] as IGeofence[],
    equipments: [] as IEquipment[],
  });

  const [itens, setItems] = useState({
    points: [] as number[],
    geofences: [] as number[],
    equipments: [] as number[],
  });

  const [selected, setSelected] = useState<ISelected>({} as ISelected);

  const [initialRegion, setInitialRegion] = useState<
    IInicialRegion | undefined
  >(undefined);

  const handleSelecionarItens = (codigo: number) => {
    const include = itens[selected.type].includes(codigo);

    setItems((oldState) => {
      const newState = { ...oldState };
      newState[selected.type] = include
        ? newState[selected.type].filter((item) => item !== codigo)
        : [...newState[selected.type], codigo];
      return newState;
    });
  };

  const updateSelectedPoints = () => {
    const selectedPoints = marker.points.filter((point) =>
      itens.points.includes(point.codigoPontoInteresse)
    );

    setSelectedMarkers((prevMarkers) => ({
      ...prevMarkers,
      points: selectedPoints,
    }));

    const coordsPoints = selectedPoints.map(({ latitude, longitude }) => ({
      latitude,
      longitude,
    }));

    return coordsPoints;
  };

  const updateSelectedGeofences = () => {
    const selectedGeofences = marker.geofences.filter((geofence) =>
      itens.geofences.includes(geofence.codigoGeocerca)
    );

    setSelectedMarkers((prevMarkers) => ({
      ...prevMarkers,
      geofences: selectedGeofences,
    }));

    const coordsGeofences = selectedGeofences.flatMap(
      ({ listaPontosGeocerca }) =>
        listaPontosGeocerca.map(({ latitude, longitude }) => ({
          latitude,
          longitude,
        }))
    );

    return coordsGeofences;
  };

  const updateSelectedEquipments = () => {
    const selectedEquipments = marker.equipments.filter((equipment) =>
      itens.equipments.includes(equipment.codigoEquipamento)
    );

    setSelectedMarkers((prevMarkers) => ({
      ...prevMarkers,
      equipments: selectedEquipments,
    }));

    const coordsEquipments = selectedEquipments.map(
      ({ latitude, longitude }) => ({ latitude, longitude })
    );

    return coordsEquipments;
  };

  const gerarListaDeCoordenadas = ({
    points,
    geofences,
    equipments,
  }: IMarker): ICoordinate[] => {
    const coordsPoints = points.map(({ latitude, longitude }) => ({
      latitude,
      longitude,
    }));

    const coordsEquipments = equipments.map(({ latitude, longitude }) => ({
      latitude,
      longitude,
    }));

    const coordsGeofences = geofences.flatMap(({ listaPontosGeocerca }) =>
      listaPontosGeocerca.map(({ latitude, longitude }) => ({
        latitude,
        longitude,
      }))
    );

    return [...coordsPoints, ...coordsEquipments, ...coordsGeofences];
  };

  const handleFilter = () => {
    const coordsPoints = updateSelectedPoints();
    const coordsGeofences = updateSelectedGeofences();
    const coordsEquipments = updateSelectedEquipments();

    const coords = [...coordsPoints, ...coordsEquipments, ...coordsGeofences];

    if (coords.length > 0) {
      setInitialRegion({
        latitude: calculateInitialRegion(coords).latitude,
        longitude: calculateInitialRegion(coords).longitude,
        latitudeDelta: calculateDelta(coords).latitudeDelta,
        longitudeDelta: calculateDelta(coords).longitudeDelta,
      });

      mapRef.current?.animateCamera({
        center: {
          latitude: calculateInitialRegion(coords).latitude,
          longitude: calculateInitialRegion(coords).longitude,
        },
      });

      setIsOpenModal(false);
    } else {
      const coords = gerarListaDeCoordenadas(marker);

      if (coords.length > 0) {
        const startInitialRegion = {
          latitude: calculateInitialRegion(coords).latitude,
          longitude: calculateInitialRegion(coords).longitude,
          latitudeDelta: calculateDelta(coords).latitudeDelta,
          longitudeDelta: calculateDelta(coords).longitudeDelta,
        };

        setInitialRegion(startInitialRegion);

        mapRef.current?.animateCamera({
          center: {
            latitude: calculateInitialRegion(coords).latitude,
            longitude: calculateInitialRegion(coords).longitude,
          },
        });

        setIsOpenModal(false);
      }
    }
  };

  const handleSelectedItem = ({ title, type }: ISelected) => {
    setSelected({ title, type });
    setIsOpenModal(true);
  };

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      async function fetchData() {
        setIsLoading(true);
        try {
          if (customer) {
            const [points, geofences, equipments] = await Promise.all([
              api.post<IPoint[]>(
                "/PontoInteresse/ObterListaPontoInteresseApp",
                {
                  codigoCliente: customer.codigoCliente,
                }
              ),

              api.post<IGeofence[]>("/Geocerca/ObterListaGeocercaApp", {
                codigoCliente: customer.codigoCliente,
              }),

              api.post<IEquipment[]>("/Dashboard/ObterListaDadosEquipamento", {
                codigoCliente: customer?.codigoCliente,
                localDashboard: 3,
                codigoUsuario: user?.codigoUsuario,
              }),
            ]);

            const startMarker = {
              points: typeof points.data === "string" ? [] : points.data,
              geofences:
                typeof geofences.data === "string" ? [] : geofences.data,
              equipments:
                typeof equipments.data === "string" ? [] : equipments.data,
            };

            if (isActive) {
              setMarker(startMarker);
              setSelectedMarkers(startMarker);

              const startItems = {
                points: startMarker.points.map(
                  ({ codigoPontoInteresse }) => codigoPontoInteresse
                ),
                geofences: startMarker.geofences.map(
                  ({ codigoGeocerca }) => codigoGeocerca
                ),
                equipments: startMarker.equipments.map(
                  ({ codigoEquipamento }) => codigoEquipamento
                ),
              };

              setItems(startItems);

              const coords = gerarListaDeCoordenadas(startMarker);

              if (coords.length > 0) {
                const startInitialRegion = {
                  latitude: calculateInitialRegion(coords).latitude,
                  longitude: calculateInitialRegion(coords).longitude,
                  latitudeDelta: calculateDelta(coords).latitudeDelta,
                  longitudeDelta: calculateDelta(coords).longitudeDelta,
                };

                setInitialRegion(startInitialRegion);
                setIsOpenModal(false);
              }
            } else {
              setIsOpenModal(false);
              setInitialRegion(undefined);
            }
          }
        } catch (error) {
          if (axios.isAxiosError(error)) Alert.alert(`${error}`, `${error}`);
        } finally {
          setIsLoading(false);
        }
      }

      fetchData();

      return () => {
        isActive = false;
      };
    }, [])
  );

  return (
    <>
      <GenericModal
        title={selected.title}
        isOpen={isOpenModal}
        closeModal={() => setIsOpenModal(false)}
      >
        {selected.type === "points" && (
          <FlatList
            data={marker.points}
            style={{ width: "100%" }}
            keyExtractor={(_item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <MarkerItem
                title={item.nomePonto}
                onPress={() => handleSelecionarItens(item.codigoPontoInteresse)}
                isChecked={itens.points.includes(item.codigoPontoInteresse)}
              />
            )}
          />
        )}

        {selected.type === "geofences" && (
          <FlatList
            data={marker.geofences}
            style={{ width: "100%" }}
            keyExtractor={(_item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <MarkerItem
                title={item.nomeGeocerca}
                onPress={() => handleSelecionarItens(item.codigoGeocerca)}
                isChecked={itens.geofences.includes(item.codigoGeocerca)}
              />
            )}
          />
        )}

        {selected.type === "equipments" && (
          <FlatList
            data={marker.equipments}
            style={{ width: "100%" }}
            keyExtractor={(_item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <MarkerItem
                title={item.nomeEquipamento}
                onPress={() => handleSelecionarItens(item.codigoEquipamento)}
                isChecked={itens.equipments.includes(item.codigoEquipamento)}
              />
            )}
          />
        )}

        <Button
          h={`${RFValue(48)}px`}
          mt={`${RFValue(20)}px`}
          title="Filtrar"
          width="100%"
          onPress={handleFilter}
        />
      </GenericModal>

      <VStack flex={1} width="full" bg={colors.shape}>
        <HeaderDefault title="Mapa Completo">
          <HStack>
            <IconButton
              icon={
                <MaterialIcons
                  color={colors.blue[700]}
                  size={20}
                  name="settings"
                />
              }
              onPress={() =>
                handleSelectedItem({
                  type: "equipments",
                  title: "Selecione os Equipamentos",
                })
              }
            />
            <IconButton
              icon={
                <Entypo color={colors.blue[700]} size={20} name="location" />
              }
              onPress={() =>
                handleSelectedItem({
                  type: "geofences",
                  title: "Selecione as Geocercas",
                })
              }
            />
            <IconButton
              icon={
                <FontAwesome5
                  color={colors.blue[700]}
                  size={20}
                  name="dot-circle"
                />
              }
              onPress={() =>
                handleSelectedItem({
                  type: "points",
                  title: "Selecione os Pontos de Interesse",
                })
              }
            />
          </HStack>
        </HeaderDefault>

        {isLoading && <LoadingSpinner color={colors.blue[700]} />}

        {!isLoading && (
          <MapView
            ref={mapRef}
            style={{ flex: 1 }}
            initialRegion={initialRegion}
            zoomControlEnabled
          >
            {selectedMarkers.points.map((point, index) => (
              <>
                <Circle
                  key={`${point.codigoPontoInteresse}${point.nomePonto}${index}`}
                  center={{
                    latitude: point.latitude,
                    longitude: point.longitude,
                  }}
                  radius={point.raio}
                  fillColor="rgba(160, 198, 229, 0.3)"
                  strokeColor="rgba(0, 105, 192, 1)"
                  strokeWidth={2}
                />

                <Marker
                  coordinate={{
                    latitude: point.latitude,
                    longitude: point.longitude,
                  }}
                />
              </>
            ))}

            {selectedMarkers.geofences.map((geofence) => (
              <Polygon
                key={geofence.codigoGeocerca}
                coordinates={geofence.listaPontosGeocerca}
                fillColor="rgba(160, 198, 229, 0.3)"
                strokeColor="rgba(0, 105, 192, 1)"
                strokeWidth={2}
              />
            ))}

            {selectedMarkers.equipments.map((equipment) => (
              <Marker
                key={equipment.codigoEquipamento}
                coordinate={{
                  latitude: equipment.latitude,
                  longitude: equipment.longitude,
                }}
              />
            ))}
          </MapView>
        )}
      </VStack>
    </>
  );
}
