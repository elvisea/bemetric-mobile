import { useCallback, useState } from "react";
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

import {
  IEquipment,
  IGeofence,
  IInicialRegion,
  IMarker,
  IPoint,
  ISelected,
} from "../interfaces";

// Inserir isLoading nas outras telas de mapa.

export function FullMap() {
  const { colors } = THEME;

  const { user } = useAuth();
  const { customer } = useCustomer();

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

  const [itens, setItens] = useState({
    points: [] as number[],
    geofences: [] as number[],
    equipments: [] as number[],
  });

  const handleSelecionarItens = (codigo: number) => {
    const include = itens[selected.type].includes(codigo);

    setItens((oldState) => {
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
  };

  const updateSelectedGeofences = () => {
    const selectedGeofences = marker.geofences.filter((geofence) =>
      itens.geofences.includes(geofence.codigoGeocerca)
    );
    setSelectedMarkers((prevMarkers) => ({
      ...prevMarkers,
      geofences: selectedGeofences,
    }));
  };

  const updateSelectedEquipments = () => {
    const selectedEquipments = marker.equipments.filter((equipment) =>
      itens.equipments.includes(equipment.codigoEquipamento)
    );
    setSelectedMarkers((prevMarkers) => ({
      ...prevMarkers,
      equipments: selectedEquipments,
    }));
  };

  const handleFilter = () => {
    updateSelectedPoints();
    updateSelectedGeofences();
    updateSelectedEquipments();

    setIsOpenModal(false);
  };

  const [selected, setSelected] = useState<ISelected>({} as ISelected);

  const [initialRegion, setInitialRegion] = useState<IInicialRegion>(
    {} as IInicialRegion
  );

  const handleSelectedItem = ({ title, type }: ISelected) => {
    setSelected({ title, type });
    setIsOpenModal(true);
  };

  const handleSelectedMarker = useCallback(
    (data: IPoint | IGeofence | IEquipment) => {
      if ("codigoGeocerca" in data) {
        const include = selectedMarkers.geofences.includes(data);

        if (!include) {
          setSelectedMarkers({
            ...selectedMarkers,
            geofences: [...selectedMarkers.geofences, data],
          });
        }

        if (include) {
          const filtrados = selectedMarkers.geofences.filter(
            (item) => item.codigoGeocerca !== data.codigoGeocerca
          );
          setSelectedMarkers({
            ...selectedMarkers,
            geofences: filtrados,
          });
        }
      }

      if ("codigoEquipamento" in data) {
        const include = selectedMarkers.equipments.includes(data);

        if (!include) {
          setSelectedMarkers({
            ...selectedMarkers,
            equipments: [...selectedMarkers.equipments, data],
          });
        }

        if (include) {
          const filtrados = selectedMarkers.equipments.filter(
            (item) => item.codigoEquipamento !== data.codigoEquipamento
          );
          setSelectedMarkers({
            ...selectedMarkers,
            equipments: filtrados,
          });
        }
      }

      if ("codigoPontoInteresse" in data) {
        const include = selectedMarkers.points.includes(data);

        if (!include) {
          setSelectedMarkers({
            ...selectedMarkers,
            points: [...selectedMarkers.points, data],
          });
        }

        if (include) {
          const filtrados = selectedMarkers.points.filter(
            (item) => item.codigoPontoInteresse !== data.codigoPontoInteresse
          );
          setSelectedMarkers({
            ...selectedMarkers,
            points: filtrados,
          });
        }
      }
    },
    [selectedMarkers]
  );

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      isActive &&
        setItens({
          points: [] as number[],
          geofences: [] as number[],
          equipments: [] as number[],
        });

      return () => {
        isActive = false;
      };
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      isActive &&
        setSelectedMarkers({
          points: [] as IPoint[],
          geofences: [] as IGeofence[],
          equipments: [] as IEquipment[],
        });

      return () => {
        isActive = false;
      };
    }, [])
  );

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

            isActive &&
              setMarker({
                points: points.data,
                geofences:
                  typeof geofences.data === "string" ? [] : geofences.data,
                equipments: equipments.data,
              });
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
          <MapView style={{ flex: 1 }} zoomControlEnabled>
            {selectedMarkers.points.map((point) => (
              <>
                <Circle
                  key={`${point.codigoPontoInteresse}${point.nomePonto}`}
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
