import { useCallback, useState } from "react";
import { Alert, FlatList } from "react-native";

import axios from "axios";
import MapView from "react-native-maps";

import { HStack, IconButton, VStack } from "native-base";

import { useFocusEffect } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";
import { Entypo, FontAwesome5, MaterialIcons } from "@expo/vector-icons";

import api from "@services/api";
import { THEME } from "@theme/theme";
import { useCustomer } from "@hooks/customer";

import { Button } from "@components/Button";
import { MarkerItem } from "@components/MarkerItem";
import { GenericModal } from "@components/GenericModal";
import { HeaderDefault } from "@components/HeaderDefault";
import { LoadingSpinner } from "@components/LoadingSpinner";

import {
  IEquipment,
  IGeofence,
  IMarker,
  IPoint,
  ISelected,
} from "../interfaces";

// Inserir isLoading nas outras telas de mapa.

export function FullMap() {
  const { colors } = THEME;

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

  const [selected, setSelected] = useState<ISelected>({} as ISelected);

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

              api.post<IEquipment[]>("/Equipamento/TrajetoApp", {
                codigoCliente: customer?.codigoCliente,
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
                onPress={() => handleSelectedMarker(item)}
                isChecked={selectedMarkers.points.includes(item)}
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
                onPress={() => handleSelectedMarker(item)}
                isChecked={selectedMarkers.geofences.includes(item)}
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
                onPress={() => handleSelectedMarker(item)}
                isChecked={selectedMarkers.equipments.includes(item)}
              />
            )}
          />
        )}

        <Button
          h={`${RFValue(48)}px`}
          mt={`${RFValue(20)}px`}
          title="Filtrar"
          width="100%"
          onPress={() => { }}
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

        {!isLoading && <MapView style={{ flex: 1 }} />}
      </VStack>
    </>
  );
}
