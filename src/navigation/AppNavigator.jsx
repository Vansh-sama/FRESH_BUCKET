import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SplashScreen from '../screens/Splash/SplashScreen';
import OnboardingScreen from '../screens/Onboarding/OnboardingScreen';
import SignupScreen from '../screens/Auth/SignupScreen';
import MainStack from './MainStack';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
      }}>

      <Stack.Screen
        name="Splash"
        component={SplashScreen}
      />

      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
      />

      <Stack.Screen
        name="Signup"
        component={SignupScreen}
      />

      <Stack.Screen
        name="Main"
        component={MainStack}
        options={{
          // Stops the iOS edge-swipe-back / Android predictive-back
          // gesture on the Tabs screen from bubbling up and popping
          // this whole stack entry, which is what was revealing
          // Signup/Onboarding underneath it.
          gestureEnabled: false,
        }}
      />

    </Stack.Navigator>
  );
};

export default AppNavigator;