import { endOfDay, startOfDay } from "date-fns";

import { date } from "@constants/date";
import { Action, State } from "../types";

import { initialState } from "../constants";

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "TOGGLE_LOADING":
      return {
        ...state,
        isLoading: !state.isLoading,
      };

    case "SET_EVENTS":
      return {
        ...state,
        events: action.payload,
      };

    case "SET_OPTIONS":
      return {
        ...state,
        options: { ...state.options, ...action.payload },
      };

    case "UPDATE_ITEM": {
      const { key, item } = action.payload;
      const currentIndex = state.search[key].findIndex(
        (current) => current.code === item.code,
      );

      if (currentIndex !== -1) {
        return {
          ...state,
          search: {
            ...state.search,
            [key]: [
              ...state.search[key].slice(0, currentIndex),
              ...state.search[key].slice(currentIndex + 1),
            ],
          },
        };
      } else {
        const newList = state.search[key].concat([item]);
        return {
          ...state,
          search: {
            ...state.search,
            [key]: newList,
          },
        };
      }
    }

    case "CANCEL_DATE":
      return {
        ...state,
        picker: { ...state.picker, isVisible: false },
      };

    case "CONFIRM_DATE":
      const dateSelected =
        state.picker.date === "initial"
          ? startOfDay(action.payload)
          : endOfDay(action.payload);
      return {
        ...state,
        picker: { ...state.picker, isVisible: false },
        date: { ...state.date, [state.picker.date]: dateSelected },
      };

    case "PRESS_DATE":
      return {
        ...state,
        picker: { date: action.payload, isVisible: true },
      };

    case "CLOSE_MAIN_MODAL":
      return {
        ...state,
        isOpenModal: false,
      };

    case "OPEN_MAIN_MODAL":
      return {
        ...state,
        isOpenModal: true,
      };

    case "OPEN_SECONDARY_MODAL":
      return {
        ...state,
        modal: { ...state.modal, isOpen: true },
      };

    case "CLOSE_SECONDARY_MODAL":
      return {
        ...state,
        modal: { ...state.modal, isOpen: false },
      };

    case "SELECT_MODAL":
      return {
        ...state,
        modal: { isOpen: true, selected: action.payload },
      };

    case "SELECT_TYPE":
      return {
        ...state,
        search: { ...state.search, type: [action.payload] },
      };

    case "SELECT_PERIOD":
      return {
        ...state,
        search: { ...state.search, period: [action.payload] },
        date: { ...state.date, initial: date[action.payload.code] },
      };

    case "RESET_STATE":
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

export { reducer };
