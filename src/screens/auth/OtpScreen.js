import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors, Typography} from '../../theme';

const OtpScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>OTP Screen</Text>
  </View>
);

export default OtpScreen;

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.background},
  text: {...Typography.h2, color: Colors.textPrimary},
});
