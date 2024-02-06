import { Alert } from "react-native";
import React, { createContext, useContext, useEffect, useReducer } from "react";

import api from "@services/api";
import { ICustomer } from "@interfaces/ICustomer";

import { reducer } from "./reducer";
import { initialState } from "./initial-state";
import { CustomerContextData, CustomerProviderProps } from "./types";

import {
  storageCustomerGet,
  storageCustomerRemove,
  storageCustomerSave,
} from "@storage/storage-customer";

export const CustomerContext = createContext<CustomerContextData>({
  customer: null,
  whatsapp: "",
  addCustomer: async () => {},
  resetCustomer: async () => {},
});

const CustomerProvider = ({ children }: CustomerProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addCustomer = async (customer: ICustomer) => {
    dispatch({ type: "SET_CUSTOMER", payload: customer });
    await storageCustomerSave(customer);
  };

  const resetCustomer = async () => {
    dispatch({ type: "RESET_CUSTOMER" });
    await storageCustomerRemove();
  };

  const loadCustomerFromStorage = async () => {
    const customerFromStorage = await storageCustomerGet();
    if (customerFromStorage) {
      dispatch({ type: "SET_CUSTOMER", payload: customerFromStorage });
    }
  };

  const getWhatsApp = async () => {
    try {
      const response = await api.post("/ContatosParceiro/ObterListaSuporte", {
        codigoCliente: state.customer?.codigoCliente,
      });

      dispatch({ type: "SET_WHATSAPP", payload: response.data });
    } catch (error) {
      Alert.alert(
        "Erro de Comunicação",
        "Não foi possível completar a solicitação. Por favor, tente novamente mais tarde.",
      );
    } finally {
    }
  };

  useEffect(() => {
    let isActive = true;

    if (isActive) getWhatsApp();

    return () => {
      isActive = false;
    };
  }, [state.customer]);

  useEffect(() => {
    loadCustomerFromStorage();
  }, []);

  return (
    <CustomerContext.Provider
      value={{
        customer: state.customer,
        whatsapp: state.whatsapp,
        addCustomer,
        resetCustomer,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

function useCustomer() {
  const context = useContext(CustomerContext);

  return context;
}

export { CustomerProvider, useCustomer };
