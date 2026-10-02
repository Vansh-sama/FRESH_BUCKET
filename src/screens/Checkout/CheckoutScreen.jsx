import React, {useState, useMemo, useRef, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  Animated,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import Ionicons from '@react-native-vector-icons/ionicons';

import {useCart} from '../../context/CartContext';
import {useAddress} from '../../context/AddressContext';
import {useOrders} from '../../context/OrdersContext';
//import AddressPickerModal from '../../components/common/AddressPickerModal';

import {
  Colors,
  Typography,
  Sizes,
} from '../../theme';

const PAYMENT_METHODS = [
  {id: 'cod', label: 'Cash on Delivery', icon: 'cash-outline'},
  {id: 'upi', label: 'UPI', icon: 'phone-portrait-outline'},
  {id: 'card', label: 'Credit / Debit Card', icon: 'card-outline'},
];

const CheckoutScreen = ({navigation}) => {
  const {cart, cartSubtotal, clearCart} = useCart();
  const {address, hasAddress} = useAddress();
  const {placeOrder} = useOrders();

  const [addressModalVisible, setAddressModalVisible] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('cod');
  const [placing, setPlacing] = useState(false);

  const contentOpacity = useRef(new Animated.Value(0)).current;
  const contentTranslate = useRef(new Animated.Value(16)).current;
  const orderPulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(contentOpacity, {
        toValue: 1,
        duration: 380,
        useNativeDriver: true,
      }),
      Animated.timing(contentTranslate, {
        toValue: 0,
        duration: 380,
        useNativeDriver: true,
      }),
    ]).start();
  }, [contentOpacity, contentTranslate]);

  const delivery = cartSubtotal > 0 ? 25 : 0;
  const taxes = useMemo(
    () => Math.round(cartSubtotal * 0.05),
    [cartSubtotal],
  );
  const total = cartSubtotal + delivery + taxes;

  const handlePlaceOrder = async () => {
    if (!hasAddress) {
      Alert.alert(
        'Add a delivery address',
        'Please set where you want your order delivered before placing it.',
      );
      setAddressModalVisible(true);
      return;
    }

    if (cart.length === 0) {
      Alert.alert('Your cart is empty', 'Add something to your cart first.');
      return;
    }

    setPlacing(true);
    Animated.sequence([
      Animated.timing(orderPulse, {toValue: 1.05, duration: 110, useNativeDriver: true}),
      Animated.timing(orderPulse, {toValue: 1, duration: 110, useNativeDriver: true}),
    ]).start();

    // Record the order BEFORE clearing the cart — this is the fix.
    // Previously clearCart() ran first, so nothing about this order
    // was ever stored anywhere (My Orders / Track Orders had no data).
    try {
      const order = await placeOrder({
        items: cart,
        address,
        paymentMethod: selectedPayment,
      });

      clearCart();

      navigation.replace('OrderSuccess', {
        orderTotal: order?.total ?? total,
        orderId: order?.id ?? order?._id,
      });
    } catch (error) {
      console.log(
        'PLACE ORDER API ERROR:',
        error?.response?.data || error?.message,
      );
      setPlacing(false);
      Alert.alert(
        'Order failed',
        error?.response?.data?.message ||
          'Unable to place your order. Please try again.',
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>

      {/* HEADER */}
      <View style={styles.header}>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.goBack()}
          hitSlop={10}>
          <Ionicons name="arrow-back" size={22} color={Colors.text} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Checkout</Text>

        <View style={styles.iconButton} />

      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>

        <Animated.View
          style={{
            opacity: contentOpacity,
            transform: [{translateY: contentTranslate}],
          }}>

        {/* DELIVERY ADDRESS */}
        <Text style={styles.sectionTitle}>Delivery address</Text>

        <TouchableOpacity
          style={styles.addressCard}
          activeOpacity={0.85}
          onPress={() => setAddressModalVisible(true)}>

          <View style={styles.addressIcon}>
            <Ionicons name="location" size={19} color={Colors.white} />
          </View>

          <View style={styles.addressTextBlock}>
            <Text
              style={[
                styles.addressText,
                !hasAddress && styles.addressPlaceholder,
              ]}
              numberOfLines={2}>
              {hasAddress ? address : 'Tap to set your delivery address'}
            </Text>
          </View>

          <Text style={styles.changeText}>
            {hasAddress ? 'Change' : 'Set'}
          </Text>

        </TouchableOpacity>

        {/* ORDER SUMMARY */}
        <Text style={styles.sectionTitle}>Order summary</Text>

        <View style={styles.summaryCard}>

          {cart.length === 0 ? (
            <Text style={styles.emptyCartText}>
              Your cart is empty.
            </Text>
          ) : (
            cart.map((item, index) => (
              <View
                key={item.id}
                style={[
                  styles.itemRow,
                  index === cart.length - 1 && styles.itemRowLast,
                ]}>

                <View style={styles.itemImageBox}>
                  <Image
                    source={item.image}
                    style={styles.itemImage}
                    resizeMode="contain"
                  />
                </View>

                <View style={styles.itemInfo}>
                  <Text style={styles.itemName} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text style={styles.itemQty}>
                    Qty: {item.quantityCount}
                  </Text>
                </View>

                <Text style={styles.itemPrice}>
                  ₹{item.price * item.quantityCount}
                </Text>

              </View>
            ))
          )}

        </View>

        {/* PAYMENT METHOD */}
        <Text style={styles.sectionTitle}>Payment method</Text>

        <View style={styles.paymentCard}>

          {PAYMENT_METHODS.map((method, index) => {
            const active = selectedPayment === method.id;

            return (
              <TouchableOpacity
                key={method.id}
                style={[
                  styles.paymentRow,
                  index === PAYMENT_METHODS.length - 1 &&
                    styles.paymentRowLast,
                ]}
                activeOpacity={0.75}
                onPress={() => setSelectedPayment(method.id)}>

                <View style={styles.paymentIcon}>
                  <Ionicons
                    name={method.icon}
                    size={19}
                    color={Colors.primary}
                  />
                </View>

                <Text style={styles.paymentLabel}>{method.label}</Text>

                <View
                  style={[
                    styles.radioOuter,
                    active && styles.radioOuterActive,
                  ]}>
                  {active && <View style={styles.radioInner} />}
                </View>

              </TouchableOpacity>
            );
          })}

        </View>

        {/* PRICE BREAKDOWN */}
        <Text style={styles.sectionTitle}>Bill details</Text>

        <View style={styles.billCard}>

          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Subtotal</Text>
            <Text style={styles.billValue}>₹{cartSubtotal}</Text>
          </View>

          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Delivery fee</Text>
            <Text style={styles.billValue}>₹{delivery}</Text>
          </View>

          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Taxes (5%)</Text>
            <Text style={styles.billValue}>₹{taxes}</Text>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>₹{total}</Text>
          </View>

        </View>

        </Animated.View>

      </ScrollView>

      {/* STICKY PLACE ORDER BUTTON */}
      <View style={styles.bottomBar}>

        <View style={styles.bottomTotalBlock}>
          <Text style={styles.bottomTotalLabel}>Total</Text>
          <Text style={styles.bottomTotalValue}>₹{total}</Text>
        </View>

        <Animated.View style={{flex: 1, transform: [{scale: orderPulse}]}}>
          <TouchableOpacity
            style={[styles.placeOrderButton, placing && styles.placeOrderButtonPlacing]}
            activeOpacity={0.9}
            disabled={placing}
            onPress={handlePlaceOrder}>
            {placing ? (
              <>
                <Ionicons name="checkmark-circle" size={19} color={Colors.white} />
                <Text style={styles.placeOrderText}>Placing order...</Text>
              </>
            ) : (
              <>
                <Text style={styles.placeOrderText}>Place Order</Text>
                <Ionicons name="arrow-forward" size={19} color={Colors.white} />
              </>
            )}
          </TouchableOpacity>
        </Animated.View>

      </View>

      <AddressPickerModal
        visible={addressModalVisible}
        onClose={() => setAddressModalVisible(false)}
      />

    </SafeAreaView>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
  },

  headerTitle: {
    ...Typography.h3,
    fontSize: 19,
    fontWeight: '900',
    color: Colors.text,
  },

  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },

  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  sectionTitle: {
    ...Typography.body,
    fontSize: 15,
    fontWeight: '800',
    color: Colors.text,
    marginTop: 22,
    marginBottom: 10,
  },

  addressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 16,
    padding: 14,
  },

  addressIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  addressTextBlock: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },

  addressText: {
    ...Typography.bodySmall,
    fontSize: 13.5,
    fontWeight: '700',
    color: Colors.text,
  },

  addressPlaceholder: {
    color: Colors.textSecondary,
    fontWeight: '600',
  },

  changeText: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.primary,
  },

  summaryCard: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 16,
    paddingHorizontal: 14,
  },

  emptyCartText: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    paddingVertical: 18,
    textAlign: 'center',
  },

  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EDF0ED',
  },

  itemRowLast: {
    borderBottomWidth: 0,
  },

  itemImageBox: {
    width: 46,
    height: 46,
    borderRadius: 11,
    backgroundColor: '#F7FAF6',
    alignItems: 'center',
    justifyContent: 'center',
  },

  itemImage: {
    width: 36,
    height: 36,
  },

  itemInfo: {
    flex: 1,
    marginLeft: 12,
  },

  itemName: {
    ...Typography.bodySmall,
    fontWeight: '700',
    color: Colors.text,
  },

  itemQty: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: 2,
  },

  itemPrice: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.text,
  },

  paymentCard: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 16,
    paddingHorizontal: 14,
  },

  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#EDF0ED',
  },

  paymentRowLast: {
    borderBottomWidth: 0,
  },

  paymentIcon: {
    width: 36,
    height: 36,
    borderRadius: 11,
    backgroundColor: '#E7F6E8',
    alignItems: 'center',
    justifyContent: 'center',
  },

  paymentLabel: {
    ...Typography.bodySmall,
    fontWeight: '700',
    color: Colors.text,
    flex: 1,
    marginLeft: 12,
  },

  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },

  radioOuterActive: {
    borderColor: Colors.primary,
  },

  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primary,
  },

  billCard: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 16,
    padding: 16,
  },

  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 9,
  },

  billLabel: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
  },

  billValue: {
    ...Typography.bodySmall,
    fontWeight: '700',
    color: Colors.text,
  },

  totalRow: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 11,
    marginTop: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  totalLabel: {
    ...Typography.body,
    fontWeight: '900',
    color: Colors.text,
  },

  totalValue: {
    fontSize: 18,
    fontWeight: '900',
    color: Colors.primary,
  },

  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 22,
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },

  bottomTotalBlock: {},

  bottomTotalLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },

  bottomTotalValue: {
    fontSize: 18,
    fontWeight: '900',
    color: Colors.text,
  },

  placeOrderButton: {
    flex: 1,
    height: Sizes.buttonHeight,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
  },

  placeOrderButtonPlacing: {
    backgroundColor: '#1F8A3B',
  },

  placeOrderText: {
    ...Typography.button,
    color: Colors.white,
  },
});