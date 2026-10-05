import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors, Typography}from '../../theme';

const ForgotPasswordScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Forgot Password Screen</Text>
  </View>
);

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.background},
  text: {...Typography.h2, color: Colors.textPrimary},
});
