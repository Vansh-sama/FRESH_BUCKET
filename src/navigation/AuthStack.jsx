import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import OtpScreen from '../screens/Auth/OtpScreen';

const Stack = createNativeStackNavigator();

const AuthStack = ({onAuthSuccess}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>

      <Stack.Screen name="Otp">
        {props => (
          <OtpScreen
            {...props}
            onAuthSuccess={onAuthSuccess}
          />
        )}
      </Stack.Screen>

    </Stack.Navigator>
  );
};

export default AuthStack;