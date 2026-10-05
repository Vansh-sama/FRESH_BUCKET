import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import Ionicons from '@react-native-vector-icons/ionicons';

import ProductCard from '../../components/home/ProductCard';
import products from '../../data/products';

import {useCart} from '../../context/CartContext';

import {
  Colors,
  Typography,
  Sizes,
}from '../../theme';

const ProductDetailScreen = ({navigation, route}) => {
  // Product comes from route.params (passed by ProductCard's onPress
  // in HomeScreen). Falls back gracefully if somehow opened without one.
  const product = route?.params?.product;

  const {addToCart, cartCount} = useCart();

  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const addedPulse = useRef(new Animated.Value(1)).current;

  // Content fades + rises in on mount instead of appearing instantly —
  // same entrance pattern used on the onboarding slides.
  const contentOpacity = useRef(new Animated.Value(0)).current;
  const contentTranslate = useRef(new Animated.Value(16)).current;

  // Subtle breathing pulse on the "Fresh today" badge to draw the eye
  // without being distracting.
  const badgePulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(contentOpacity, {
        toValue: 1,
        duration: 420,
        useNativeDriver: true,
      }),
      Animated.timing(contentTranslate, {
        toValue: 0,
        duration: 420,
        useNativeDriver: true,
      }),
    ]).start();

    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(badgePulse, {
          toValue: 1.06,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(badgePulse, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [contentOpacity, contentTranslate, badgePulse]);

  if (!product) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.missingState}>
          <Ionicons name="alert-circle-outline" size={48} color={Colors.textLight} />
          <Text style={styles.missingText}>Product not found</Text>
          <TouchableOpacity style={styles.missingButton} onPress={() => navigation.goBack()}>
            <Text style={styles.missingButtonText}>Go back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const increment = () => setQty(q => q + 1);
  const decrement = () => setQty(q => Math.max(1, q - 1));

  // "You may also like" — other products excluding the current one.
  // Your products.js doesn't have a category field yet, so this is a
  // simple exclude-current selection rather than true category
  // matching; swap this for a category filter once that field exists.
  const relatedProducts = products
    .filter(p => p.id !== product.id)
    .slice(0, 6);

  // rating/delivery time aren't in your product data yet — defaulted
  // here so the row always has something to show. Replace with real
  // fields (product.rating, product.deliveryTime) once you add them.
  const rating = product.rating ?? 4.5;
  const deliveryTime = product.deliveryTime ?? '15-20 mins';

  const handleAddToCart = () => {
    addToCart(product, qty);

    setJustAdded(true);
    Animated.sequence([
      Animated.timing(addedPulse, {toValue: 1.06, duration: 120, useNativeDriver: true}),
      Animated.timing(addedPulse, {toValue: 1, duration: 120, useNativeDriver: true}),
    ]).start();

    setTimeout(() => setJustAdded(false), 1600);
  };

  const lineTotal = product.price * qty;

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

        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate('Cart')}
          hitSlop={10}>
          <Ionicons name="cart-outline" size={23} color={Colors.text} />
          {cartCount > 0 && (
            <View style={styles.headerBadge}>
              <Text style={styles.headerBadgeText}>
                {cartCount > 99 ? '99+' : cartCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>

      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>

        <Animated.View
          style={{
            opacity: contentOpacity,
            transform: [{translateY: contentTranslate}],
          }}>

        {/* IMAGE */}
        <View style={styles.imageCard}>
          <Image
            source={product.image}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        {/* INFO */}
        <View style={styles.infoBlock}>

          <Text style={styles.name}>{product.name}</Text>

          {!!product.quantity && (
            <Text style={styles.packSize}>{product.quantity}</Text>
          )}

          {/* RATING + DELIVERY ROW — matches the pattern most grocery
              app product pages use right under the title */}
          <View style={styles.metaRow}>

            <View style={styles.metaItem}>
              <Ionicons name="star" size={14} color={Colors.secondary} />
              <Text style={styles.metaText}>{rating} Rating</Text>
            </View>

            <View style={styles.metaDivider} />

            <View style={styles.metaItem}>
              <Ionicons name="time-outline" size={14} color={Colors.textSecondary} />
              <Text style={styles.metaText}>{deliveryTime}</Text>
            </View>

          </View>

          <View style={styles.priceRow}>

            <Text style={styles.price}>
              ₹{product.price}
              <Text style={styles.unit}> /kg</Text>
            </Text>

            {/* Inline quantity stepper next to the price — the
                dedicated "Quantity" section below was redundant with
                this, so it's been folded into one control. */}
            <View style={styles.inlineStepperRow}>

              <TouchableOpacity
                style={styles.inlineStepperButton}
                onPress={decrement}
                activeOpacity={0.8}>
                <Ionicons name="remove" size={17} color={Colors.primary} />
              </TouchableOpacity>

              <Text style={styles.inlineStepperValue}>{qty}</Text>

              <TouchableOpacity
                style={[styles.inlineStepperButton, styles.inlineStepperButtonFilled]}
                onPress={increment}
                activeOpacity={0.8}>
                <Ionicons name="add" size={17} color={Colors.white} />
              </TouchableOpacity>

            </View>

          </View>

          <Animated.View
            style={[
              styles.freshBadge,
              {transform: [{scale: badgePulse}]},
            ]}>
            <Ionicons name="leaf" size={13} color={Colors.primary} />
            <Text style={styles.freshBadgeText}>Fresh today</Text>
          </Animated.View>

          <Text style={styles.sectionLabel}>About this product</Text>
          <Text style={styles.description}>
            {product.description
              ? product.description
              : `Sourced fresh and delivered quickly — ${product.name} is picked for quality and freshness, straight to your doorstep.`}
          </Text>

        </View>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <View style={styles.relatedBlock}>

            <Text style={styles.sectionLabel}>You may also like</Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.relatedList}>

              {relatedProducts.map(item => (
                <ProductCard
                  key={item.id}
                  item={item}
                  onPress={p =>
                    navigation.push('ProductDetail', {product: p})
                  }
                  onAdd={() => addToCart(item)}
                />
              ))}

            </ScrollView>

          </View>
        )}

        </Animated.View>

      </ScrollView>

      {/* STICKY BOTTOM CTA — shows the live total for the selected
          quantity, matching the Blinkit/Zomato pattern of the button
          itself doing price math instead of a separate summary line */}
      <View style={styles.bottomBar}>

        <Animated.View style={{flex: 1, transform: [{scale: addedPulse}]}}>
          <TouchableOpacity
            style={[styles.addButton, justAdded && styles.addButtonSuccess]}
            activeOpacity={0.9}
            onPress={handleAddToCart}>

            {justAdded ? (
              <>
                <Ionicons name="checkmark-circle" size={20} color={Colors.white} />
                <Text style={styles.addButtonText}>Added to Cart</Text>
              </>
            ) : (
              <>
                <Text style={styles.addButtonText}>Add to Cart</Text>
                <Text style={styles.addButtonPrice}>₹{lineTotal}</Text>
              </>
            )}

          </TouchableOpacity>
        </Animated.View>

      </View>

    </SafeAreaView>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  header: {
    height: 56,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
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

  headerBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
    borderWidth: 2,
    borderColor: Colors.background,
  },

  headerBadgeText: {
    fontSize: 9,
    fontWeight: '900',
    color: Colors.white,
  },

  content: {
    paddingHorizontal: 20,
    paddingBottom: 140,
  },

  imageCard: {
    height: 260,
    borderRadius: 24,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },

  image: {
    width: '70%',
    height: '70%',
  },

  infoBlock: {
    marginTop: 22,
  },

  name: {
    ...Typography.h3,
    fontSize: 22,
    fontWeight: '900',
    color: Colors.text,
  },

  packSize: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    marginTop: 4,
  },

  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },

  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  metaText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: Colors.textSecondary,
  },

  metaDivider: {
    width: 1,
    height: 12,
    backgroundColor: Colors.border,
    marginHorizontal: 10,
  },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 14,
  },

  inlineStepperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  inlineStepperButton: {
    width: 32,
    height: 32,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surface,
  },

  inlineStepperButtonFilled: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },

  inlineStepperValue: {
    fontSize: 15,
    fontWeight: '900',
    color: Colors.text,
    minWidth: 20,
    textAlign: 'center',
  },

  price: {
    fontSize: 24,
    fontWeight: '900',
    color: Colors.primary,
  },

  unit: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textSecondary,
  },

  freshBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 5,
    backgroundColor: Colors.primarySoft,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    marginTop: 14,
  },

  freshBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.primary,
  },

  sectionLabel: {
    ...Typography.body,
    fontSize: 15,
    fontWeight: '800',
    color: Colors.text,
    marginTop: 24,
    marginBottom: 8,
  },

  relatedBlock: {
    marginTop: 8,
  },

  relatedList: {
    paddingRight: 4,
  },

  description: {
    ...Typography.bodySmall,
    fontSize: 14,
    lineHeight: 21,
    color: Colors.textSecondary,
  },

  stepperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
  },

  stepperButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surface,
  },

  stepperButtonFilled: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },

  stepperValue: {
    fontSize: 18,
    fontWeight: '900',
    color: Colors.text,
    minWidth: 30,
    textAlign: 'center',
  },

  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 22,
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },

  addButton: {
    height: Sizes.buttonHeight,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
  },

  addButtonSuccess: {
    backgroundColor: '#1F8A3B',
    justifyContent: 'center',
    gap: 8,
  },

  addButtonText: {
    ...Typography.button,
    color: Colors.white,
  },

  addButtonPrice: {
    fontSize: 16,
    fontWeight: '900',
    color: Colors.white,
  },

  missingState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },

  missingText: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginTop: 12,
  },

  missingButton: {
    marginTop: 18,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingHorizontal: 22,
    paddingVertical: 12,
  },

  missingButtonText: {
    color: Colors.white,
    fontWeight: '700',
  },
});