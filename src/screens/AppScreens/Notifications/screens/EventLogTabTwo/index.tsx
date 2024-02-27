import React, { useCallback, useReducer } from "react";
import { FlatList, ListRenderItemInfo } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { HStack, Text } from "native-base";

import { RFValue } from "react-native-responsive-fontsize";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { format } from "date-fns";
import { FontAwesome } from "@expo/vector-icons";

import { THEME } from "@theme/theme";

import { useCustomer } from "@hooks/customer";
import { useAuth } from "@hooks/authentication";

import { Button } from "@components/Button";
import { ItemOption } from "@components/ItemOption";

import { ButtonDate } from "@components/ButtonDate";
import { GenericModal } from "@components/GenericModal";

import { SelectButton } from "@components/SelectButton";
import { HeaderDefault } from "@components/HeaderDefault";
import { LoadingSpinner } from "@components/LoadingSpinner";

import { reducer } from "../../reducer";
import { initialState } from "../../constants";

import { LogCard } from "../../components/LogCard";
import { ButtonFilter } from "../../components/ButtonFilter";

import { Event, Input, Item, Key } from "../../types";

import {
  useIsSelected,
  useMaximumDate,
  useChooseOption,
  useSelectModal,
  useShowDate,
  useShowMaximumDate,
  useShowMinimumDate,
  useFetchData,
} from "../../functions";

export function EventLogTabTwo() {
  const navigation = useNavigation();

  const { user } = useAuth();
  const { customer } = useCustomer();

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleNextPage = (item: Event) => {
    navigation.navigate("NotificationDetailing", {
      screen: "DetailingScreen",
      params: {
        codigoEvento: item.event,
        codigoDispositivo: item.device,
        codigoEquipamento: item.equipment,
      },
    });
  };

  const fetchData = useFetchData(
    { customer, user, search: state.search, date: state.date },
    dispatch,
  );

  const renderEvents = ({ item }: ListRenderItemInfo<Event>) => {
    return (
      <LogCard
        html={item.html}
        date={item.date}
        search={() => handleNextPage(item)}
        icon={item.type === 0 ? "bell" : "flag"}
      />
    );
  };

  const renderInputs = ({ item }: ListRenderItemInfo<Input>) => {
    return (
      <SelectButton
        title={item.title}
        isActive={false}
        onPress={() => handleSelectModal(item.key)}
      />
    );
  };

  const renderOptions = ({ item }: ListRenderItemInfo<Item>) => {
    return (
      <ItemOption
        title={item.name}
        isActive={isSelected(item.code)}
        onPress={() => chooseOption(item)}
      />
    );
  };

  const maximumDate = useMaximumDate(state.date);

  const chooseOption = useChooseOption(state.modal.selected, dispatch);
  const handleSelectModal = (key: Key) => useSelectModal(key, dispatch);

  const showDate = useShowDate(state.date, state.picker);
  const showMinimumDate = useShowMinimumDate(state.picker, state.date);

  const isSelected = useIsSelected(state.search, state.modal);
  const showMaximumDate = useShowMaximumDate(state.picker, maximumDate);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      isActive && fetchData();

      return () => {
        isActive = false;
        dispatch({ type: "RESET_STATE" });
      };
    }, []),
  );

  return (
    <>
      <GenericModal
        title="Buscar"
        isOpen={state.isOpenModal}
        closeModal={() => dispatch({ type: "CLOSE_MAIN_MODAL" })}
      >
        <FlatList
          data={state.inputs}
          keyExtractor={(item) => item.key}
          showsVerticalScrollIndicator={false}
          style={{ width: "100%" }}
          renderItem={renderInputs}
        />

        <Text
          fontSize={16}
          mb={`${RFValue(4)}px`}
          mt={`${RFValue(12)}px`}
          color={THEME.colors.blue[700]}
        >
          Data Personalizada
        </Text>

        <HStack w="full" justifyContent="space-between" mt={`${RFValue(4)}px`}>
          <ButtonDate
            date={format(state.date.initial, "dd/MM/yyyy")}
            onPress={() => dispatch({ type: "PRESS_DATE", payload: "initial" })}
          />

          <ButtonDate
            date={format(state.date.final, "dd/MM/yyyy")}
            onPress={() => dispatch({ type: "PRESS_DATE", payload: "final" })}
          />
        </HStack>

        <DateTimePickerModal
          mode="date"
          date={showDate()}
          minimumDate={showMinimumDate()}
          maximumDate={showMaximumDate()}
          isVisible={state.picker.isVisible}
          onCancel={() => dispatch({ type: "CANCEL_DATE" })}
          onConfirm={(date) =>
            dispatch({ type: "CONFIRM_DATE", payload: date })
          }
        />

        <Button
          h={`${RFValue(48)}px`}
          mt={`${RFValue(20)}px`}
          title="Buscar"
          width="100%"
          isLoading={state.isLoading}
          isDisabled={state.isLoading}
          onPress={fetchData}
        />
      </GenericModal>

      <GenericModal
        title="Selecione"
        isOpen={state.modal.isOpen}
        closeModal={() => dispatch({ type: "CLOSE_SECONDARY_MODAL" })}
      >
        <FlatList
          data={state.options[state.modal.selected]}
          keyExtractor={(item) => item.code.toString()}
          showsVerticalScrollIndicator={false}
          style={{ width: "100%" }}
          renderItem={renderOptions}
        />

        <Button
          h={`${RFValue(48)}px`}
          mt={`${RFValue(20)}px`}
          width="100%"
          title="Selecionar"
          onPress={() => dispatch({ type: "CLOSE_SECONDARY_MODAL" })}
        />
      </GenericModal>

      {state.isLoading && <LoadingSpinner color={THEME.colors.blue[700]} />}

      {!state.isLoading && (
        <HeaderDefault title="Registro de Eventos">
          <ButtonFilter onPress={() => dispatch({ type: "OPEN_MAIN_MODAL" })}>
            <FontAwesome
              name="sliders"
              size={24}
              color={THEME.colors.blue[700]}
            />
          </ButtonFilter>
        </HeaderDefault>
      )}

      {!state.isLoading && state.events.length > 0 && (
        <FlatList
          data={state.events}
          keyExtractor={(item) => item.key}
          showsVerticalScrollIndicator={false}
          style={{ width: "100%", padding: 16 }}
          renderItem={renderEvents}
        />
      )}
    </>
  );
}
