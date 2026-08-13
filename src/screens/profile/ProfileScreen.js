import React from 'react';

import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import Ionicons from '@react-native-vector-icons/ionicons/static';

import {
  Colors,
  Typography,
  Spacing,
} from '../../theme';

const CartScreen = () => {
  return (
    <View style={styles.container}>

      <View style={styles.iconContainer}>

        <Ionicons
          name="cart-outline"
          size={65}
          color={Colors.primary}
        />

      </View>

      <Text style={styles.title}>
        Your Cart is Empty
      </Text>

      <Text style={styles.subtitle}>
        Add some fresh groceries to your cart
        and they will appear here.
      </Text>

    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 35,
  },

  iconContainer: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xl,
  },

  title: {
    ...Typography.h2,
    fontWeight: '800',
    color: Colors.text,
    textAlign: 'center',
  },

  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginTop: Spacing.sm,
  },

});