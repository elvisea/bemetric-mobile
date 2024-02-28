import React, { useCallback, useState } from "react";
import { Alert, ScrollView, StyleSheet, View, Dimensions } from "react-native";

import { useFocusEffect, useRoute } from "@react-navigation/native";

import { RFValue } from "react-native-responsive-fontsize";
import MapView, { Marker, Polygon, Circle } from "react-native-maps";

import { AntDesign } from "@expo/vector-icons";

import { THEME } from "@theme/theme";
import { useAuth } from "@hooks/authentication";

import Truck from "@assets/truck.svg";

import { Item } from "@components/Item";
import { Cabecalho } from "@components/Cabecalho";
import { LoadingSpinner } from "@components/LoadingSpinner";

import { Params } from "./types";

import {
  ContentHeader,
  Text,
  Header,
  Row,
  Value,
  HeaderSecondary,
} from "./styles";

import { getData } from "./services";
import { icons, initialState, items, type } from "./constants";

const { height } = Dimensions.get("screen");

export function DetailingScreen() {
  const route = useRoute();
  const params = route.params as Params;

  const { user } = useAuth();

  const [state, setState] = useState(initialState);

  async function fetchData() {
    if (user) {
      try {
        setState((prevState) => ({ ...prevState, isLoading: true }));

        const response = await getData({
          user: user.codigoUsuario,
          event: params.codigoEvento,
          device: params.codigoDispositivo,
          equipment: params.codigoEquipamento,
        });

        if (response) {
          setState((prevState) => ({
            ...prevState,
            data: response,
            isLoading: false,
          }));
        }
      } catch (error) {
        Alert.alert(
          state.responses.error[0].title,
          state.responses.error[0].subtitle,
        );
      } finally {
        setState((prevState) => ({ ...prevState, isLoading: false }));
      }
    }
  }

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      isActive && fetchData();

      return () => {
        isActive = false;
      };
    }, []),
  );

  return (
    <>
      <Cabecalho hasIcon={false} />

      {state.isLoading && <LoadingSpinner color={THEME.colors.blue[700]} />}

      {!state.isLoading && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
        >
          <Header>
            {icons[0]}

            <ContentHeader>
              <AntDesign
                size={15}
                name="clockcircle"
                color={THEME.colors.gray[50]}
                style={{ marginRight: 8 }}
              />
              <Text>{state.data.date}</Text>
            </ContentHeader>
          </Header>

          <HeaderSecondary>
            <Row>
              <Text>Equipamento</Text>
              <Value>{state.data.equipment.name}</Value>
            </Row>

            <Row>
              <Text>Registro</Text>
              <Value>{state.data.register}</Value>
            </Row>

            {state.data.coord.type === 2 ? null : (
              <Row>
                <Text>{type[state.data.coord.type]}</Text>
                <Value>{state.data.marker}</Value>
              </Row>
            )}
          </HeaderSecondary>

          {Object.values(state.data.equipment.status).map((item, index) => (
            <Item
              key={index}
              h={`${RFValue(58)}px`}
              mb={`${RFValue(8)}px`}
              icon={items[index].icon}
              title={items[index].title}
            >
              <Value>{`${item} ${items[index].label}`}</Value>
            </Item>
          ))}

          <View style={styles.mapContainer}>
            {!state.isLoading && (
              <MapView
                initialRegion={state.data.initialRegion}
                style={styles.map}
                zoomControlEnabled
              >
                <Marker coordinate={state.data.coordinate}>
                  <Truck />
                </Marker>

                {state.data.coord.type === 0 &&
                  state.data.geofence.length > 0 && (
                    <Polygon
                      coordinates={state.data.geofence}
                      fillColor={THEME.colors.FILL_COLOR}
                      strokeColor={THEME.colors.STROKE_COLOR}
                      strokeWidth={2}
                    />
                  )}

                {state.data.coord.type === 1 && (
                  <Circle
                    radius={state.data.point.radius}
                    center={state.data.point.coordinate}
                    fillColor={THEME.colors.FILL_COLOR}
                    strokeColor={THEME.colors.STROKE_COLOR}
                    strokeWidth={2}
                  />
                )}
              </MapView>
            )}
          </View>
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  mapContainer: {
    height: height - 400,
  },
  map: {
    flex: 1,
  },
});
