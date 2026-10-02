import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SplashScreen from '../screens/Splash/SplashScreen';
import OnboardingScreen from '../screens/Onboarding/OnboardingScreen';

import AuthStack from './AuthStack';
import MainStack from './MainStack';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
      />

      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
      />

      <Stack.Screen
        name="Auth"
        component={AuthStack}
      />

      <Stack.Screen
        name="Main"
        component={MainStack}
        options={{
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;