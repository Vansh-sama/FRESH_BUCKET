import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';

import Ionicons from '@react-native-vector-icons/ionicons';

import {
  Colors,
  Typography,
  Radius,
  Spacing,
  Shadows,
}from '../../theme';


const ProductCard = ({
  product,
  onPress,
  onAddPress,
}) => {

  if (!product) {
    return null;
  }

  const {
    name,
    unit,
    price,
    originalPrice,
    icon,
    color,
    rating,
    image,
  } = product;

  const hasDiscount =
    originalPrice &&
    originalPrice > price;

  const discountPercentage = hasDiscount
    ? Math.round(
        100 - (price / originalPrice) * 100,
      )
    : 0;


  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.88}
      onPress={onPress}>

      {/* PRODUCT IMAGE */}

      <View
        style={[
          styles.imageWrap,
          {
            backgroundColor:
              color || Colors.primarySoft,
          },
        ]}>

        {hasDiscount && (
          <View style={styles.discountBadge}>

            <Text style={styles.discountText}>
              {discountPercentage}% OFF
            </Text>

          </View>
        )}


        <TouchableOpacity
          style={styles.favoriteButton}
          activeOpacity={0.7}
          onPress={() => {}}>

          <Ionicons
            name="heart-outline"
            size={16}
            color={Colors.text}
          />

        </TouchableOpacity>


        {image ? (
          <Image
            source={image}
            style={styles.productImage}
            resizeMode="contain"
          />
        ) : (
          <Ionicons
            name={icon || 'basket-outline'}
            size={44}
            color={Colors.primaryDark}
          />
        )}

      </View>


      {/* PRODUCT INFO */}

      <View style={styles.info}>

        {rating ? (
          <View style={styles.ratingRow}>

            <Ionicons
              name="star"
              size={11}
              color={Colors.warning}
            />

            <Text style={styles.ratingText}>
              {rating}
            </Text>

          </View>
        ) : null}


        <Text
          style={styles.name}
          numberOfLines={1}>

          {name}

        </Text>


        {unit ? (
          <Text style={styles.unit}>
            {unit}
          </Text>
        ) : null}


        {/* PRICE + ADD */}

        <View style={styles.bottomRow}>

          <View style={styles.priceContainer}>

            <Text style={styles.price}>
              ₹{price}
            </Text>

            {hasDiscount && (
              <Text style={styles.originalPrice}>
                ₹{originalPrice}
              </Text>
            )}

          </View>


          <TouchableOpacity
            style={styles.addButton}
            activeOpacity={0.8}
            onPress={onAddPress}>

            <Ionicons
              name="add"
              size={20}
              color={Colors.white}
            />

          </TouchableOpacity>

        </View>

      </View>

    </TouchableOpacity>
  );
};


export default ProductCard;


const styles = StyleSheet.create({

  card: {
    width: 156,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    marginRight: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
    ...Shadows.small,
  },


  imageWrap: {
    height: 132,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },


  productImage: {
    width: 105,
    height: 105,
  },


  discountBadge: {
    position: 'absolute',
    top: 9,
    left: 9,
    backgroundColor: Colors.accent,
    borderRadius: Radius.sm,
    paddingHorizontal: 7,
    paddingVertical: 4,
    zIndex: 2,
  },


  discountText: {
    fontSize: 9,
    fontWeight: '800',
    color: Colors.white,
  },


  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 29,
    height: 29,
    borderRadius: 15,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3,
  },


  info: {
    paddingHorizontal: 11,
    paddingTop: 9,
    paddingBottom: 11,
  },


  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },


  ratingText: {
    fontSize: 10,
    color: Colors.textSecondary,
    fontWeight: '600',
    marginLeft: 3,
  },


  name: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.text,
  },


  unit: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 3,
    marginBottom: 8,
  },


  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },


  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    flex: 1,
  },


  price: {
    fontSize: 15,
    fontWeight: '900',
    color: Colors.text,
  },


  originalPrice: {
    fontSize: 10,
    color: Colors.textLight,
    textDecorationLine: 'line-through',
    marginLeft: 5,
  },


  addButton: {
    width: 32,
    height: 32,
    borderRadius: 11,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

});