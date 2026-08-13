import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SplashScreen from '../screens/Splash/SplashScreen';
import OnboardingScreen from '../screens/Onboarding/OnboardingScreen';
import SignupScreen from '../screens/Auth/SignupScreen';
import MainStack from './MainStack';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);
  const [isSignedUp, setIsSignedUp] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>

      {/* SPLASH */}
      {isLoading ? (
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
        />
      ) : isFirstLaunch ? (

        /* ONBOARDING */
        <Stack.Screen name="Onboarding">
          {props => (
            <OnboardingScreen
              {...props}
              onDone={() => setIsFirstLaunch(false)}
            />
          )}
        </Stack.Screen>

      ) : !isSignedUp ? (

        /* SIGNUP */
        <Stack.Screen name="Signup">
          {props => (
            <SignupScreen
              {...props}
              onSignupSuccess={() => setIsSignedUp(true)}
            />
          )}
        </Stack.Screen>

      ) : (

        /* MAIN APP */
        <Stack.Screen
          name="Main"
          component={MainStack}
        />

      )}

    </Stack.Navigator>
  );
}