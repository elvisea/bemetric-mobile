import React, { createContext, useContext, useEffect, useReducer } from "react";

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
  addCustomer: async () => {},
  resetCustomer: async () => {},
});

const CustomerProvider = ({ children }: CustomerProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log("Customer:", state);

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

  useEffect(() => {
    loadCustomerFromStorage();
  }, []);

  return (
    <CustomerContext.Provider
      value={{
        customer: state.customer,
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
