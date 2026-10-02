import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import Ionicons from '@react-native-vector-icons/ionicons';

import {useOrders} from '../../context/OrdersContext';

import {
  Colors,
  Typography,
  Sizes,
} from '../../theme';

const STEPS = [
  {
    key: 'placed',
    title: 'Order Placed',
    subtitle: 'We\u2019ve received your order',
    icon: 'checkmark-circle',
  },
  {
    key: 'preparing',
    title: 'Preparing your order',
    subtitle: 'Packing your fresh groceries',
    icon: 'basket',
  },
  {
    key: 'out',
    title: 'Out for delivery',
    subtitle: 'Your rider is on the way',
    icon: 'bicycle',
  },
  {
    key: 'delivered',
    title: 'Delivered',
    subtitle: 'Enjoy your groceries!',
    icon: 'home',
  },
];

// Demo order id — in a real app this comes from the order response.
const generateOrderId = () =>
  `FB${Math.floor(100000 + Math.random() * 900000)}`;

const OrderTrackingScreen = ({navigation, route}) => {
  const orderTotal = route?.params?.orderTotal ?? 0;
  const {getOrderById} = useOrders();

  // Reuse the order id passed from OrderSuccess so it's the same
  // number across both screens, instead of generating a second
  // random one here.
  const [orderId] = useState(
    () => route?.params?.orderId ?? generateOrderId(),
  );
  const [currentStep, setCurrentStep] = useState(0);
  const [backendStatus, setBackendStatus] = useState('placed');

  const pulse = useRef(new Animated.Value(1)).current;

  // Small celebratory burst — 3 dots pop out and fade when the order
  // hits "Delivered", instead of the banner just quietly changing.
  const celebrateOne = useRef(new Animated.Value(0)).current;
  const celebrateTwo = useRef(new Animated.Value(0)).current;
  const celebrateThree = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let active = true;

    const load = async () => {
      if (!orderId) return;
      const order = await getOrderById(orderId);
      if (!active || !order) return;

      const status = order.status || 'placed';
      setBackendStatus(status);

      const index =
        status === 'delivered'
          ? 3
          : status === 'out_for_delivery'
          ? 2
          : status === 'preparing'
          ? 1
          : 0;

      setCurrentStep(index);
    };

    load();

    const interval = setInterval(load, 15000);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [orderId, getOrderById]);

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {toValue: 1.15, duration: 700, useNativeDriver: true}),
        Animated.timing(pulse, {toValue: 1, duration: 700, useNativeDriver: true}),
      ]),
    );

    if (currentStep < STEPS.length - 1) {
      loop.start();
    } else {
      pulse.setValue(1);
    }

    return () => loop.stop();
  }, [currentStep, pulse]);

  const isDelivered = currentStep === STEPS.length - 1;

  useEffect(() => {
    if (!isDelivered) {
      return;
    }

    const burst = value =>
      Animated.timing(value, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      });

    Animated.stagger(90, [
      burst(celebrateOne),
      burst(celebrateTwo),
      burst(celebrateThree),
    ]).start();
  }, [isDelivered, celebrateOne, celebrateTwo, celebrateThree]);

  const celebrateStyle = value => ({
    opacity: value.interpolate({inputRange: [0, 0.6, 1], outputRange: [0, 1, 0]}),
    transform: [
      {
        translateY: value.interpolate({inputRange: [0, 1], outputRange: [0, -46]}),
      },
      {
        scale: value.interpolate({inputRange: [0, 0.3, 1], outputRange: [0.5, 1.1, 0.8]}),
      },
    ],
  });

  const handleBackToHome = () => {
    navigation.navigate('Tabs');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Order Tracking</Text>
        <Text style={styles.orderId}>#{orderId}</Text>
      </View>

      <View style={styles.content}>

        {/* STATUS BANNER */}
        <View style={styles.banner}>

          <View style={styles.bannerIconStack}>

            <View style={styles.bannerOuterRing} />
            <View style={styles.bannerInnerCircle} />

            {isDelivered && (
              <>
                <Animated.View style={[styles.celebrateDot, styles.celebrateDotOne, celebrateStyle(celebrateOne)]} />
                <Animated.View style={[styles.celebrateDot, styles.celebrateDotTwo, celebrateStyle(celebrateTwo)]} />
                <Animated.View style={[styles.celebrateDot, styles.celebrateDotThree, celebrateStyle(celebrateThree)]} />
              </>
            )}

            <Animated.View
              style={[
                styles.bannerIconWrap,
                isDelivered && styles.bannerIconWrapDone,
                {transform: [{scale: isDelivered ? 1 : pulse}]},
              ]}>
              <Ionicons
                name={STEPS[currentStep].icon}
                size={30}
                color={Colors.white}
              />
            </Animated.View>

          </View>

          <Text style={styles.bannerTitle}>
            {STEPS[currentStep].title}
          </Text>

          <Text style={styles.bannerSubtitle}>
            {STEPS[currentStep].subtitle}
          </Text>

          {!isDelivered && backendStatus !== 'cancelled' && (
            <Text style={styles.eta}>
              Live order status from Fresh Basket
            </Text>
          )}

        </View>

        {/* STEPPER */}
        <View style={styles.stepper}>

          {STEPS.map((step, index) => {
            const done = index <= currentStep;
            const isLast = index === STEPS.length - 1;

            return (
              <View key={step.key} style={styles.stepRow}>

                <View style={styles.stepIndicatorColumn}>

                  <View
                    style={[
                      styles.stepDot,
                      done && styles.stepDotDone,
                    ]}>
                    {done && (
                      <Ionicons name="checkmark" size={13} color={Colors.white} />
                    )}
                  </View>

                  {!isLast && (
                    <View
                      style={[
                        styles.stepLine,
                        index < currentStep && styles.stepLineDone,
                      ]}
                    />
                  )}

                </View>

                <View style={styles.stepTextColumn}>
                  <Text
                    style={[
                      styles.stepTitle,
                      done && styles.stepTitleDone,
                    ]}>
                    {step.title}
                  </Text>
                  <Text style={styles.stepSubtitle}>
                    {step.subtitle}
                  </Text>
                </View>

              </View>
            );
          })}

        </View>

        {orderTotal > 0 && (
          <View style={styles.totalCard}>
            <Text style={styles.totalLabel}>Order total</Text>
            <Text style={styles.totalValue}>₹{orderTotal}</Text>
          </View>
        )}

      </View>

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.homeButton}
          activeOpacity={0.9}
          onPress={handleBackToHome}>
          <Text style={styles.homeButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

export default OrderTrackingScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },

  headerTitle: {
    ...Typography.h3,
    fontSize: 20,
    fontWeight: '900',
    color: Colors.text,
  },

  orderId: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontWeight: '700',
  },

  content: {
    flex: 1,
    paddingHorizontal: 20,
  },

  banner: {
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: 26,
    paddingHorizontal: 20,
  },

  bannerIconStack: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },

  bannerOuterRing: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(46,125,50,0.06)',
  },

  bannerInnerCircle: {
    position: 'absolute',
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: Colors.primarySoft,
  },

  celebrateDot: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
  },

  celebrateDotOne: {
    backgroundColor: Colors.secondary,
    top: 20,
    left: 14,
  },

  celebrateDotTwo: {
    backgroundColor: Colors.accent,
    top: 14,
    right: 18,
  },

  celebrateDotThree: {
    backgroundColor: Colors.primaryLight,
    bottom: 22,
    right: 10,
  },

  bannerIconWrap: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  bannerIconWrapDone: {
    backgroundColor: '#1F8A3B',
  },

  bannerTitle: {
    ...Typography.h4,
    fontSize: 18,
    fontWeight: '900',
    color: Colors.text,
    textAlign: 'center',
  },

  bannerSubtitle: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },

  eta: {
    ...Typography.caption,
    fontWeight: '800',
    color: Colors.primary,
    marginTop: 10,
  },

  stepper: {
    marginTop: 22,
  },

  stepRow: {
    flexDirection: 'row',
  },

  stepIndicatorColumn: {
    alignItems: 'center',
    width: 28,
  },

  stepDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },

  stepDotDone: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },

  stepLine: {
    width: 2,
    flex: 1,
    minHeight: 34,
    backgroundColor: Colors.border,
    marginVertical: 2,
  },

  stepLineDone: {
    backgroundColor: Colors.primary,
  },

  stepTextColumn: {
    flex: 1,
    marginLeft: 14,
    paddingBottom: 22,
  },

  stepTitle: {
    ...Typography.bodySmall,
    fontWeight: '700',
    color: Colors.textLight,
  },

  stepTitleDone: {
    color: Colors.text,
    fontWeight: '800',
  },

  stepSubtitle: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: 2,
  },

  totalCard: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },

  totalLabel: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
  },

  totalValue: {
    fontSize: 18,
    fontWeight: '900',
    color: Colors.primary,
  },

  bottomBar: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 22,
  },

  homeButton: {
    height: Sizes.buttonHeight,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  homeButtonText: {
    ...Typography.button,
    color: Colors.white,
  },
});