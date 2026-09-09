import React, {useMemo} from 'react';

import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import Ionicons from '@react-native-vector-icons/ionicons';

import {useCart} from '../../context/CartContext';

import {
  Colors,
  Typography,
} from '../../theme';

const CartScreen = ({navigation}) => {
  // Cart now comes from shared context — starts empty, and only
  // contains what was actually added via a ProductCard's "+" button
  // on Home (or wherever else calls addToCart). No more hardcoded
  // seed items.
  const {cart, updateQuantity} = useCart();

  const subtotal = useMemo(
    () =>
      cart.reduce(
        (total, item) =>
          total +
          item.price * item.quantityCount,
        0,
      ),
    [cart],
  );

  const delivery = subtotal > 0 ? 25 : 0;
  const total = subtotal + delivery;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>

      {/* HEADER */}

      <View style={styles.header}>

        <Text style={styles.headerTitle}>
          My Cart
        </Text>

        <Text style={styles.itemCount}>
          {cart.length} items
        </Text>

      </View>

      {cart.length === 0 ? (

        <View style={styles.empty}>

          <Ionicons
            name="cart-outline"
            size={70}
            color={Colors.primary}
          />

          <Text style={styles.emptyTitle}>
            Your cart is empty
          </Text>

          <Text style={styles.emptyText}>
            Add some fresh groceries to get started.
          </Text>

          <TouchableOpacity
            style={styles.shopButton}
            onPress={() =>
              navigation.navigate('Categories')
            }>

            <Text style={styles.shopButtonText}>
              Start Shopping
            </Text>

          </TouchableOpacity>

        </View>

      ) : (

        <>

          <FlatList
            data={cart}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.list}
            renderItem={({item}) => (

              <View style={styles.cartItem}>

                <View style={styles.itemImage}>

                  <Image
                    source={item.image}
                    style={styles.image}
                    resizeMode="contain"
                  />

                </View>

                <View style={styles.itemDetails}>

                  <Text style={styles.name}>
                    {item.name}
                  </Text>

                  <Text style={styles.quantity}>
                    {item.quantity}
                  </Text>

                  <Text style={styles.price}>
                    ₹{item.price}
                  </Text>

                  <View style={styles.quantityRow}>

                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => updateQuantity(item.id, -1)}>

                      <Ionicons
                        name="remove"
                        size={17}
                        color={Colors.primary}
                      />

                    </TouchableOpacity>

                    <Text style={styles.count}>
                      {item.quantityCount}
                    </Text>

                    <TouchableOpacity
                      style={[styles.quantityButton, styles.plusButton]}
                      onPress={() =>
                        updateQuantity(item.id, 1)
                      }>

                      <Ionicons
                        name="add"
                        size={17}
                        color={Colors.white}
                      />

                    </TouchableOpacity>

                  </View>

                </View>

              </View>

            )}
          />

          <View style={styles.summary}>

            <View style={styles.summaryRow}>

              <Text style={styles.summaryLabel}>
                Subtotal
              </Text>

              <Text style={styles.summaryValue}>
                ₹{subtotal}
              </Text>

            </View>

            <View style={styles.summaryRow}>

              <Text style={styles.summaryLabel}>
                Delivery
              </Text>

              <Text style={styles.summaryValue}>
                ₹{delivery}
              </Text>

            </View>

            <View style={styles.totalRow}>

              <Text style={styles.totalLabel}>
                Total
              </Text>

              <Text style={styles.totalValue}>
                ₹{total}
              </Text>

            </View>

            <TouchableOpacity
              style={styles.checkout}
              activeOpacity={0.85}>

              <Text style={styles.checkoutText}>
                Proceed to Checkout
              </Text>

              <Ionicons
                name="arrow-forward"
                size={20}
                color={Colors.white}
              />

            </TouchableOpacity>

          </View>

        </>

      )}

    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 17,
    flexDirection: 'row',
    alignItems: 'baseline',
  },

  headerTitle: {
    ...Typography.h2,
    fontSize: 26,
    fontWeight: '900',
    color: Colors.text,
  },

  itemCount: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginLeft: 8,
  },

  list: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  cartItem: {
    backgroundColor: Colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
  },

  itemImage: {
    width: 105,
    height: 105,
    backgroundColor: '#F7FAF6',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    width: 90,
    height: 90,
  },

  itemDetails: {
    flex: 1,
    marginLeft: 14,
  },

  name: {
    ...Typography.body,
    fontWeight: '800',
    color: Colors.text,
  },

  quantity: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: 3,
  },

  price: {
    marginTop: 7,
    fontSize: 17,
    fontWeight: '900',
    color: Colors.primary,
  },

  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 9,
    gap: 10,
  },

  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.surface,
  },

  plusButton: {
    backgroundColor: Colors.primary,
  },

  count: {
    minWidth: 30,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '800',
    color: Colors.text,
  },

  summary: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: Colors.border,
    paddingHorizontal: 20,
    paddingTop: 17,
    paddingBottom: 18,
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 9,
  },

  summaryLabel: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
  },

  summaryValue: {
    ...Typography.bodySmall,
    fontWeight: '700',
    color: Colors.text,
  },

  totalRow: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 12,
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
    fontSize: 20,
    fontWeight: '900',
    color: Colors.primary,
  },

  checkout: {
    height: 53,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    marginTop: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 9,
  },

  checkoutText: {
    ...Typography.button,
    color: Colors.white,
  },

  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },

  emptyTitle: {
    ...Typography.h3,
    marginTop: 18,
    color: Colors.text,
  },

  emptyText: {
    ...Typography.bodySmall,
    textAlign: 'center',
    color: Colors.textSecondary,
    marginTop: 8,
  },

  shopButton: {
    backgroundColor: Colors.primary,
    borderRadius: 15,
    paddingHorizontal: 24,
    paddingVertical: 14,
    marginTop: 20,
  },

  shopButtonText: {
    ...Typography.button,
    color: Colors.white,
  },
});