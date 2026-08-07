// navigation/MainStack.js
// Wraps BottomTabs. Keep this as a stack (not directly rendering BottomTabs
// in AppNavigator) so you can later push screens ON TOP of the tabs —
// e.g. ProductDetail, Checkout, OrderTracking — without losing the tab bar
// history underneath.

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import BottomTabs from './BottomNavigator';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Tabs" component={BottomTabs} />
      {/* Later additions go here, e.g.: */}
      {/* <Stack.Screen name="ProductDetail" component={ProductDetailScreen} /> */}
      {/* <Stack.Screen name="Checkout" component={CheckoutScreen} /> */}
    </Stack.Navigator>
  );
};

export default MainStack;
