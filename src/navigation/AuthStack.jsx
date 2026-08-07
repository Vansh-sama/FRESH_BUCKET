// navigation/AuthStack.js
// Handles the login/signup flow. Nested inside AppNavigator.
// onLoginSuccess is passed down from AppNavigator so LoginScreen can flip
// the app into the Main stack once auth succeeds.

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from '../screens/Auth/SignupScreen';
import SignupScreen from '../screens/Auth/SignupScreen';
import ForgotPasswordScreen from '../screens/Auth/ForgetPassword';
import OtpScreen from '../screens/Auth/OtpScreen';

const Stack = createNativeStackNavigator();

const AuthStack = ({onLoginSuccess}) => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login">
        {props => <LoginScreen {...props} onLoginSuccess={onLoginSuccess} />}
      </Stack.Screen>
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="Otp" component={OtpScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
