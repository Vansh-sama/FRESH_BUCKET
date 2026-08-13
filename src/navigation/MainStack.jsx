import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import BottomTabs from './BottomNavigator';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>

      <Stack.Screen
        name="Tabs"
        component={BottomTabs}
      />

      {/* Future screens */}

      {/* 
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
      />

      <Stack.Screen
        name="Checkout"
        component={CheckoutScreen}
      />

      <Stack.Screen
        name="OrderDetails"
        component={OrderDetailsScreen}
      />

      <Stack.Screen
        name="OrderTracking"
        component={OrderTrackingScreen}
      />
      */}

    </Stack.Navigator>
  );
};

export default MainStack;