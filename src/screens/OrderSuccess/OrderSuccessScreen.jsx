import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import Ionicons from '@react-native-vector-icons/ionicons';

import {
  Colors,
  Typography,
  Sizes,
}from '../../theme';

// Shown right after Checkout's "Place Order" — matches the
// checkmark + "Track My Order" / "Go Back" pattern used across most
// grocery app references (order confirmation before the tracking
// stepper, not instead of it).
const OrderSuccessScreen = ({navigation, route}) => {
  const orderId = route?.params?.orderId;
  const orderTotal = route?.params?.orderTotal ?? 0;

  const checkScale = useRef(new Animated.Value(0)).current;
  const sparkleOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.spring(checkScale, {
        toValue: 1,
        friction: 5,
        tension: 60,
        useNativeDriver: true,
      }),
      Animated.timing(sparkleOpacity, {
        toValue: 1,
        duration: 350,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  }, [checkScale, sparkleOpacity]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>

      <View style={styles.content}>

        <View style={styles.iconStack}>

          <Animated.View style={[styles.sparkle, styles.sparkleOne, {opacity: sparkleOpacity}]} />
          <Animated.View style={[styles.sparkle, styles.sparkleTwo, {opacity: sparkleOpacity}]} />
          <Animated.View style={[styles.sparkle, styles.sparkleThree, {opacity: sparkleOpacity}]} />
          <Animated.View style={[styles.sparkle, styles.sparkleFour, {opacity: sparkleOpacity}]} />

          <Animated.View
            style={[
              styles.checkCircle,
              {transform: [{scale: checkScale}]},
            ]}>
            <Ionicons name="checkmark" size={54} color={Colors.white} />
          </Animated.View>

        </View>

        <Text style={styles.title}>Order Placed!</Text>

        <Text style={styles.subtitle}>
          {orderId
            ? `Your order #${orderId} has been placed successfully.`
            : 'Your order has been placed successfully.'}
        </Text>

        {orderTotal > 0 && (
          <View style={styles.totalPill}>
            <Text style={styles.totalPillText}>Total paid: ₹{orderTotal}</Text>
          </View>
        )}

      </View>

      <View style={styles.bottomBar}>

        <TouchableOpacity
             style={styles.trackButton}
              activeOpacity={0.9}
                onPress={() =>
             navigation.replace('OrderTracking', {orderId, orderTotal})
              }>
            <Text style={styles.trackButtonText}>Track My Order</Text>
           <Ionicons name="arrow-forward" size={18} color={Colors.white} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.goBackButton}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Tabs')}>
          <Text style={styles.goBackButtonText}>Go Back to Home</Text>
        </TouchableOpacity>

      </View>

    </SafeAreaView>
  );
};

export default OrderSuccessScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },

  iconStack: {
    width: 140,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
  },

  checkCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#1F8A3B',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#1F8A3B',
    shadowOpacity: 0.3,
    shadowRadius: 14,
    shadowOffset: {width: 0, height: 6},
  },

  sparkle: {
    position: 'absolute',
    borderRadius: 999,
  },

  sparkleOne: {
    width: 10,
    height: 10,
    backgroundColor: Colors.secondary,
    top: 4,
    left: 10,
  },

  sparkleTwo: {
    width: 7,
    height: 7,
    backgroundColor: Colors.accent,
    top: 20,
    right: 6,
  },

  sparkleThree: {
    width: 8,
    height: 8,
    backgroundColor: Colors.primaryLight,
    bottom: 10,
    left: 4,
  },

  sparkleFour: {
    width: 6,
    height: 6,
    backgroundColor: Colors.secondary,
    bottom: 26,
    right: 12,
  },

  title: {
    ...Typography.h2,
    fontSize: 24,
    fontWeight: '900',
    color: Colors.text,
    marginTop: 26,
    textAlign: 'center',
  },

  subtitle: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },

  totalPill: {
    marginTop: 18,
    backgroundColor: Colors.primarySoft,
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 9,
  },

  totalPillText: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.primary,
  },

  bottomBar: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 22,
    gap: 10,
  },

  trackButton: {
    height: Sizes.buttonHeight,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
  },

  trackButtonText: {
    ...Typography.button,
    color: Colors.white,
  },

  goBackButton: {
    height: 50,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },

  goBackButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
  },
});