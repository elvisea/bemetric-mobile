import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AuthStackRoutes from './auth.stack.routes';
import AppDrawerRoutes from './app.drawer.routes';

import { useCustomer } from '@hooks/customer';

const Routes = () => {
  const { customer } = useCustomer();
  console.log('CUSTOMER: ', customer);
  return (
    <NavigationContainer>
      {!customer ? <AppDrawerRoutes /> : <AuthStackRoutes />}
    </NavigationContainer>
  );
};

export { Routes };
