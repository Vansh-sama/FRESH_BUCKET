import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import BottomNavigator from './BottomNavigator';
import ProductListingScreen from '../screens/ProductListing/ProductListingScreen';
import ProductDetailScreen from '../screens/Product/ProductDetailScreen';
import CheckoutScreen from '../screens/Checkout/CheckoutScreen';
import OrderSuccessScreen from '../screens/OrderSuccess/OrderSuccessScreen';
import OrderTrackingScreen from '../screens/OrderTracking/OrderTrackingScreen';
import MyOrdersScreen from '../screens/MyOrders/MyOrdersScreen';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>

      <Stack.Screen name="Tabs" component={BottomNavigator} />
      <Stack.Screen name="ProductListing" component={ProductListingScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="OrderSuccess" component={OrderSuccessScreen} />
      <Stack.Screen name="OrderTracking" component={OrderTrackingScreen} />
      <Stack.Screen name="MyOrders" component={MyOrdersScreen} />

    </Stack.Navigator>
  );
};

export default MainStack;