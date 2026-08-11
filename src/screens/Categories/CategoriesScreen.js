import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors, Typography} from '../../theme';

const CategoriesScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Categories Screen</Text>
  </View>
);

export default CategoriesScreen;

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.background},
  text: {...Typography.h2, color: Colors.textPrimary},
});
