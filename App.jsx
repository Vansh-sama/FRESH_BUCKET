import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import redux from './src/screens/ReduxApiScreen';
import ReduxApiScreen from './src/screens/ReduxApiScreen';

export default function App() {
  return (
    <NavigationContainer>
      <ReduxApiScreen>
    </NavigationContainer>
  );
}