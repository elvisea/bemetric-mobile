import React, { createContext, useContext, ReactNode, useState } from 'react';

type CustomerContextData = {
  customer: boolean;
};

type CustomerProviderProps = {
  children: ReactNode;
};

export const CustomerContext = createContext({} as CustomerContextData);

const CustomerProvider = ({ children }: CustomerProviderProps) => {
  const [customer, setCustomer] = useState(false);

  return (
    <CustomerContext.Provider
      value={{
        customer,
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
