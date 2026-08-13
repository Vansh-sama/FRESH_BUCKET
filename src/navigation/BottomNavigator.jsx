import React from 'react';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from '@react-native-vector-icons/ionicons';

import HomeScreen from '../screens/Home/HomeScreen';
import CategoriesScreen from '../screens/Categories/CategoriesScreen';
import CartScreen from '../screens/Cart/CartScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

import {Colors, Typography} from '../theme';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,

        tabBarShowLabel: true,

        tabBarActiveTintColor: Colors.primary,

        tabBarInactiveTintColor: Colors.textSecondary,

        tabBarStyle: styles.tabBar,

        tabBarLabelStyle: styles.label,

        tabBarIcon: ({focused, color}) => {
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

            default:
              iconName = 'ellipse-outline';
          }

          return (
            <Ionicons
              name={iconName}
              size={23}
              color={color}
            />
          );
        },
      })}>

      <Tab.Screen
        name="Home"
        component={HomeScreen}
      />

      <Tab.Screen
        name="Categories"
        component={CategoriesScreen}
      />

      <Tab.Screen
        name="Cart"
        component={CartScreen}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
      />

    </Tab.Navigator>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  tabBar: {
    height: 70,

    paddingTop: 8,
    paddingBottom: 8,

    backgroundColor: Colors.surface,

    borderTopWidth: 1,
    borderTopColor: Colors.border,

    elevation: 12,
  },

  label: {
    ...Typography.caption,
    fontWeight: '600',
  },
});