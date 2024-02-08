import { useCallback, useReducer, useRef } from "react";
import { Alert, FlatList } from "react-native";

import MapView, { Circle, Marker, Polygon } from "react-native-maps";

import { HStack, IconButton, VStack } from "native-base";

import { useFocusEffect } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";

import api from "@services/api";
import { THEME } from "@theme/theme";

import { useCustomer } from "@hooks/customer";
import { useAuth } from "@hooks/authentication";

import { Button } from "@components/Button";
import { MarkerItem } from "@components/MarkerItem";
import { GenericModal } from "@components/GenericModal";
import { HeaderDefault } from "@components/HeaderDefault";
import { LoadingSpinner } from "@components/LoadingSpinner";

import { calculateInitialRegion } from "../utils";

import { IEquipment, IGeofence } from "../interfaces";

import { reducer } from "./reducer";
import { Modal, PointReceived } from "./types";
import { buttons, initialState, url } from "./constants";

import {
  normalizePoints,
  normalizeGeofences,
  normalizeEquipments,
  generateListCoordinates,
} from "./functions";

export function FullMap() {
  const { colors } = THEME;

  const { user } = useAuth();
  const { customer } = useCustomer();

  const [state, dispatch] = useReducer(reducer, initialState);

  const mapRef = useRef<MapView>(null);

  const checkSize = (arrays: Array<any[]>): boolean => {
    return arrays.every((arr) => arr.length === 0);
  };

  const onPressFilter = () => {
    dispatch({ type: "TOGGLE_MODAL" });

    dispatch({
      type: "SET_INITIAL_REGION",
      payload: {
        points: state.filters.points,
        geofences: state.filters.geofences,
        equipment: state.filters.equipment,
      },
    });

    const arrays = [
      state.filters.points,
      state.filters.geofences,
      state.filters.equipment,
    ];

    const isArraysEmpty = checkSize(arrays);

    const coords = isArraysEmpty
      ? generateListCoordinates(
        state.markers.points,
        state.markers.geofences,
        state.markers.equipment,
      )
      : generateListCoordinates(
        state.filters.points,
        state.filters.geofences,
        state.filters.equipment,
      );

    mapRef.current?.animateCamera({
      center: {
        latitude: calculateInitialRegion(coords).latitude,
        longitude: calculateInitialRegion(coords).longitude,
      },
    });
  };

  const setModal = (modal: Modal) => {
    dispatch({ type: "SET_MODAL", payload: modal });
    dispatch({ type: "TOGGLE_MODAL" });
  };

  const onPressOption = useCallback(
    (id: string) => {
      const include = state.filters[state.modal.key].some(
        (item) => item.id === id,
      );

      if (include) {
        dispatch({ type: "REMOVE_FILTER", payload: id });
      } else {
        const found = state.markers[state.modal.key].find(
          (item) => item.id === id,
        );

        if (found) {
          dispatch({ type: "ADD_FILTER", payload: found });
        }
      }
    },
    [state.filters, state.markers, state.modal],
  );

  const showOptions = useCallback(() => {
    return state.markers[state.modal.key].map((marker) => ({
      id: marker.id,
      code: marker.code,
      name: marker.name,
    }));
  }, [state.markers, state.modal.key]);

  const isOptionSelected = useCallback(
    (id: string) => {
      return state.filters[state.modal.key].some((item) => item.id === id);
    },
    [state.filters, state.modal],
  );

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      async function fetchData() {
        if (user && customer) {
          try {
            dispatch({ type: "TOGGLE_LOADING" });

            const data = {
              localDashboard: 3,
              codigoUsuario: user.codigoUsuario,
              codigoCliente: customer.codigoCliente,
            };

            const response = await Promise.all([
              api.post<PointReceived[]>(url.points, {
                codigoCliente: data.codigoCliente,
              }),

              api.post<IGeofence[]>(url.geofences, {
                codigoCliente: data.codigoCliente,
              }),

              api.post<IEquipment[]>(url.equipments, data),
            ]);

            const points = normalizePoints(response[0].data);
            const geofences = normalizeGeofences(response[1].data);
            const equipment = normalizeEquipments(response[2].data);

            dispatch({
              type: "SET_MARKERS",
              payload: { points, equipment, geofences },
            });

            dispatch({
              type: "SET_FILTERS",
              payload: { points, geofences, equipment },
            });

            dispatch({
              type: "SET_INITIAL_REGION",
              payload: { points, geofences, equipment },
            });
          } catch (error) {
            Alert.alert(
              "Erro de Comunicação",
              "Não foi possível completar a solicitação. Por favor, tente novamente mais tarde.",
            );
          } finally {
            dispatch({ type: "TOGGLE_LOADING" });
          }
        }
      }

      isActive && fetchData();

      return () => {
        isActive = false;
      };
    }, []),
  );

  return (
    <>
      <GenericModal
        title={state.modal.title}
        isOpen={state.isOpenModal}
        closeModal={() => dispatch({ type: "TOGGLE_MODAL" })}
      >
        <FlatList
          data={showOptions()}
          style={{ width: "100%" }}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <MarkerItem
              title={item.name}
              isChecked={isOptionSelected(item.id)}
              onPress={() => onPressOption(item.id)}
            />
          )}
        />

        <Button
          h={`${RFValue(48)}px`}
          mt={`${RFValue(20)}px`}
          title="Filtrar"
          width="100%"
          onPress={onPressFilter}
        />
      </GenericModal>

      <VStack flex={1} width="full" bg={colors.shape}>
        <HeaderDefault title="Mapa Completo">
          <HStack>
            {buttons.map((button) => (
              <IconButton
                key={button.key}
                icon={button.icon}
                onPress={() =>
                  setModal({ key: button.key, title: button.title })
                }
              />
            ))}
          </HStack>
        </HeaderDefault>

        {state.isLoading && <LoadingSpinner color={colors.blue[700]} />}

        {!state.isLoading && (
          <MapView
            ref={mapRef}
            style={{ flex: 1 }}
            initialRegion={state.initialRegion}
            zoomControlEnabled
          >
            {state.filters.points.map((point) => (
              <Circle
                key={point.id}
                center={point.coord}
                radius={point.radius}
                fillColor={colors.FILL_COLOR}
                strokeColor={colors.STROKE_COLOR}
                strokeWidth={2}
              />
            ))}

            {state.filters.points.map((point) => (
              <Marker key={point.id} coordinate={point.coord} />
            ))}

            {state.filters.geofences.map((geofence) => (
              <Polygon
                key={geofence.id}
                fillColor={colors.FILL_COLOR}
                coordinates={geofence.coords}
                strokeColor={colors.STROKE_COLOR}
                strokeWidth={2}
              />
            ))}

            {state.filters.equipment.map((equipment) => (
              <Marker key={equipment.id} coordinate={equipment.coord} />
            ))}
          </MapView>
        )}
      </VStack>
    </>
  );
}
