import React, { useCallback, useReducer } from "react";
import { FlatList, ListRenderItemInfo } from "react-native";

import { HStack, Text } from "native-base";
import { useFocusEffect } from "@react-navigation/native";

import { format } from "date-fns";
import { RFValue } from "react-native-responsive-fontsize";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { FontAwesome } from "@expo/vector-icons";

import { THEME } from "@theme/theme";

import { useCustomer } from "@hooks/customer";
import { useAuth } from "@hooks/authentication";

import { Button } from "@components/Button";
import { ItemOption } from "@components/ItemOption";

import { ButtonDate } from "@components/ButtonDate";
import { SelectButton } from "@components/SelectButton";

import { GenericModal } from "@components/GenericModal";
import { HeaderDefault } from "@components/HeaderDefault";
import { LoadingSpinner } from "@components/LoadingSpinner";

import { reducer } from "../../reducer";
import { Input, Item, Key, PropsCountKey } from "../../types";

import { initialState } from "../../constants";

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

import { CardEventLog } from "../../components/CardEventLog";
import { ButtonFilter } from "../../components/ButtonFilter";

export function EventLogTabOne() {
  const { user } = useAuth();
  const { customer } = useCustomer();

  const [state, dispatch] = useReducer(reducer, initialState);

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
        onPress={() => chooseOption(item)}
        isActive={isSelected(item.code)}
      />
    );
  };

  const renderCards = ({ item }: ListRenderItemInfo<PropsCountKey>) => {
    return (
      <CardEventLog
        icon={item.icon}
        title={item.title}
        speed={item.speed}
        amount={item.amount}
        ignition={item.ignition}
        movement={item.movement}
        permanence={item.permanence}
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

  const fetchData = useFetchData(
    { customer, user, search: state.search, date: state.date },
    dispatch,
  );

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

      {!state.isLoading && (
        <FlatList
          data={Object.values(state.count)}
          keyExtractor={(item) => item.title}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 32 }}
          style={{ width: "100%", paddingHorizontal: 16 }}
          renderItem={renderCards}
        />
      )}
    </>
  );
}
