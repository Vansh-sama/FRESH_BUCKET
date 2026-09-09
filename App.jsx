import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {CartProvider} from './src/context/CartContext';
import {AddressProvider} from './src/context/AddressContext';

import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <CartProvider>
        <AddressProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </AddressProvider>
      </CartProvider>
    </SafeAreaProvider>
  );
}