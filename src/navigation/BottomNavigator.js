import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/Home/HomeScreen';
import CategoriesScreen from '../screens/Categories/CategoriesScreen';
import CartScreen from '../screens/Cart/CartScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,

        tabBarShowLabel: true,

        tabBarActiveTintColor: '#2E7D32',
        tabBarInactiveTintColor: '#94A3B8',

        tabBarStyle: {
          height: 70,
          paddingBottom: 8,
          paddingTop: 8,
          borderTopWidth: 0,
          elevation: 10,
          backgroundColor: '#FFFFFF',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },

        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;

            case 'Categories':
              iconName = focused ? 'grid' : 'grid-outline';
              break;

            case 'Cart':
              iconName = focused ? 'cart' : 'cart-outline';
              break;

            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
          }

          return (
            <Ionicons
              name={iconName}
              size={24}
              color={color}
            />
          );
        },
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />

      <Tab.Screen
        name="Categories"
        component={CategoriesScreen}
      />

      <Tab.Screen name="Cart" component={CartScreen} />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;