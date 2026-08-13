import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import {Colors, Spacing, Radius, Typography} from '../theme';

// `color` is a placeholder tint standing in for a real product photo -
// swap the icon block below for an <Image source={{uri: product.imageUrl}}>
// once Cloudinary is wired up on the backend.
const ProductCard = ({product, onPress, onAddPress}) => {
  const {name, unit, price, originalPrice, icon, color, rating} = product;
  const hasDiscount = !!originalPrice;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={[styles.imageWrap, {backgroundColor: color}]}>
        {hasDiscount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>
              {Math.round(100 - (price / originalPrice) * 100)}% OFF
            </Text>
          </View>
        )}
        <TouchableOpacity style={styles.favoriteButton}>
          <Ionicons name="heart-outline" size={16} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Ionicons name={icon} size={42} color={Colors.primaryDark} />
      </View>

      <View style={styles.info}>
        <View style={styles.ratingRow}>
          <Ionicons name="star" size={12} color={Colors.warning} />
          <Text style={styles.ratingText}>{rating}</Text>
        </View>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.unit}>{unit}</Text>

        <View style={styles.bottomRow}>
          <View>
            <Text style={styles.price}>${price.toFixed(2)}</Text>
            {hasDiscount && (
              <Text style={styles.originalPrice}>
                ${originalPrice.toFixed(2)}
              </Text>
            )}
          </View>
          <TouchableOpacity style={styles.addButton} onPress={onAddPress}>
            <Ionicons name="add" size={18} color={Colors.textInverse} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: Colors.background,
    borderRadius: Radius.lg,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  imageWrap: {
    height: 110,
    justifyContent: 'center',
    alignItems: 'center',
  },
  discountBadge: {
    position: 'absolute',
    top: Spacing.sm,
    left: Spacing.sm,
    backgroundColor: Colors.accent,
    borderRadius: Radius.sm,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  discountText: {
    ...Typography.caption,
    fontSize: 10,
    fontWeight: '700',
    color: Colors.textInverse,
  },
  favoriteButton: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    padding: Spacing.sm,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  ratingText: {
    ...Typography.caption,
    fontSize: 11,
    color: Colors.textSecondary,
    marginLeft: 3,
  },
  name: {
    ...Typography.bodyBold,
    fontSize: 14,
    color: Colors.textPrimary,
  },
  unit: {
    ...Typography.caption,
    color: Colors.textMuted,
    marginBottom: Spacing.sm,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  price: {
    ...Typography.bodyBold,
    color: Colors.textPrimary,
  },
  originalPrice: {
    ...Typography.caption,
    color: Colors.textMuted,
    textDecorationLine: 'line-through',
  },
  addButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
