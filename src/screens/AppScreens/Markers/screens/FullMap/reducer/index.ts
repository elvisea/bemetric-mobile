import { Action, State } from "../types";
import { setInitialRegion } from "../../../functions";

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_MARKERS":
      return {
        ...state,
        markers: action.payload,
      };

    case "SET_FILTERS":
      return {
        ...state,
        filters: action.payload,
      };

    case "ADD_FILTER":
      return {
        ...state,
        filters: {
          ...state.filters,
          [state.modal.key]: [
            ...state.filters[state.modal.key],
            action.payload,
          ],
        },
      };

    case "REMOVE_FILTER":
      const filtered = state.filters[state.modal.key].filter(
        (item) => item.id !== action.payload,
      );

      return {
        ...state,
        filters: {
          ...state.filters,
          [state.modal.key]: filtered,
        },
      };

    case "TOGGLE_LOADING":
      return {
        ...state,
        isLoading: !state.isLoading,
      };

    case "SET_MODAL":
      return {
        ...state,
        modal: action.payload,
      };

    case "SET_INITIAL_REGION":
      return {
        ...state,
        initialRegion: setInitialRegion(
          action.payload.points,
          action.payload.geofences,
          action.payload.equipment,
        ),
      };

    case "TOGGLE_MODAL":
      return {
        ...state,
        isOpenModal: !state.isOpenModal,
      };

    default:
      return state;
  }
};

export { reducer };
