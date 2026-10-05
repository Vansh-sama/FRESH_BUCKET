import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';

import {CartProvider} from './src/context/CartContext';
import {AddressProvider} from './src/context/AddressContext';

import store from './src/redux/store';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <CartProvider>
          <AddressProvider>
            <NavigationContainer>
              <AppNavigator />
            </NavigationContainer>
          </AddressProvider>
        </CartProvider>
      </SafeAreaProvider>
    </Provider>
  );
}