import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import ForgotPasswordScreen from '../screens/auth/ForgetPassword';
import OtpScreen from '../screens/auth/OtpScreen';

const Stack = createNativeStackNavigator();

const AuthStack = ({onLoginSuccess}) => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login">
        {props => (
          <LoginScreen
            {...props}
            onLoginSuccess={onLoginSuccess}
          />
        )}
      </Stack.Screen>

      <Stack.Screen
        name="Signup"
        component={SignupScreen}
      />

      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
      />

      <Stack.Screen
        name="Otp"
        component={OtpScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;