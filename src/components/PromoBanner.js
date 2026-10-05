import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import {Colors, Spacing, Radius, Typography} from '../../theme';

// A single promo card. Home renders a few of these in a horizontal
// ScrollView. Kept as its own component so a future "Deals" screen can
// reuse it without duplicating styles.
const PromoBanner = ({title, subtitle, ctaLabel = 'Shop Now', onPress}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <View style={styles.textBlock}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <View style={styles.ctaButton}>
          <Text style={styles.ctaText}>{ctaLabel}</Text>
        </View>
      </View>
      <View style={styles.iconWrap}>
        <Ionicons name="basket" size={64} color="rgba(255,255,255,0.35)" />
      </View>
    </TouchableOpacity>
  );
};

export default PromoBanner;

const styles = StyleSheet.create({
  card: {
    width: 280,
    height: 140,
    backgroundColor: Colors.primary,
    borderRadius: Radius.lg,
    marginRight: Spacing.md,
    padding: Spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  textBlock: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    ...Typography.h3,
    color: Colors.textInverse,
    marginBottom: 4,
  },
  subtitle: {
    ...Typography.caption,
    color: Colors.primarySoft,
    marginBottom: Spacing.sm,
  },
  ctaButton: {
    backgroundColor: Colors.textInverse,
    borderRadius: Radius.pill,
    paddingVertical: 6,
    paddingHorizontal: Spacing.md,
    alignSelf: 'flex-start',
  },
  ctaText: {
    ...Typography.caption,
    fontWeight: '700',
    color: Colors.primary,
  },
  iconWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
});
