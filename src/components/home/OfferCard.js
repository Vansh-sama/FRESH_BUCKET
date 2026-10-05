import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import Ionicons from '@react-native-vector-icons/ionicons';

import {
  Colors,
  Typography,
  Spacing,
  Radius,
  Shadows,
}from '../../theme';


const OfferCard = ({
  title = 'Fresh deals for you',
  subtitle = 'Save more on your everyday groceries',
  discount = '20% OFF',
  buttonText = 'Shop Now',
  icon = 'basket-outline',
  onPress,
}) => {

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={onPress}>

      {/* LEFT CONTENT */}

      <View style={styles.content}>

        <View style={styles.discountBadge}>

          <Ionicons
            name="pricetag-outline"
            size={12}
            color={Colors.primary}
          />

          <Text style={styles.discountText}>
            {discount}
          </Text>

        </View>


        <Text style={styles.title}>
          {title}
        </Text>


        <Text
          style={styles.subtitle}
          numberOfLines={2}>
          {subtitle}
        </Text>


        <View style={styles.button}>

          <Text style={styles.buttonText}>
            {buttonText}
          </Text>

          <Ionicons
            name="arrow-forward"
            size={15}
            color={Colors.primary}
          />

        </View>

      </View>


      {/* RIGHT VISUAL */}

      <View style={styles.visual}>

        <View style={styles.circleLarge} />

        <View style={styles.circleSmall} />

        <View style={styles.iconCircle}>

          <Ionicons
            name={icon}
            size={42}
            color={Colors.primary}
          />

        </View>

        <View style={styles.leafOne}>
          <Ionicons
            name="leaf"
            size={20}
            color={Colors.primaryLight}
          />
        </View>

        <View style={styles.leafTwo}>
          <Ionicons
            name="leaf-outline"
            size={16}
            color={Colors.primary}
          />
        </View>

      </View>

    </TouchableOpacity>
  );
};


export default OfferCard;


const styles = StyleSheet.create({

  card: {
    minHeight: 168,
    width: '100%',
    borderRadius: Radius.xl,
    backgroundColor: Colors.primarySoft,
    overflow: 'hidden',
    flexDirection: 'row',
    marginTop: Spacing.lg,
    ...Shadows.small,
  },


  /* LEFT CONTENT */

  content: {
    flex: 1,
    paddingLeft: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.lg,
    paddingRight: 4,
    zIndex: 2,
  },


  discountBadge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: Radius.pill,
    paddingHorizontal: 9,
    paddingVertical: 5,
    marginBottom: 8,
  },


  discountText: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.primary,
    marginLeft: 4,
  },


  title: {
    fontSize: 19,
    lineHeight: 24,
    fontWeight: '900',
    color: Colors.text,
    maxWidth: 190,
  },


  subtitle: {
    fontSize: 11.5,
    lineHeight: 17,
    color: Colors.textSecondary,
    marginTop: 4,
    maxWidth: 190,
  },


  button: {
    alignSelf: 'flex-start',
    height: 34,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderRadius: Radius.pill,
    paddingHorizontal: 12,
    marginTop: 11,
  },


  buttonText: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.primary,
    marginRight: 5,
  },


  /* RIGHT VISUAL */

  visual: {
    width: 125,
    height: '100%',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },


  circleLarge: {
    position: 'absolute',
    width: 145,
    height: 145,
    borderRadius: 73,
    right: -48,
    bottom: -35,
    backgroundColor: 'rgba(255,255,255,0.45)',
  },


  circleSmall: {
    position: 'absolute',
    width: 82,
    height: 82,
    borderRadius: 41,
    right: 4,
    top: 22,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },


  iconCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.small,
  },


  leafOne: {
    position: 'absolute',
    right: 9,
    top: 13,
    transform: [
      {
        rotate: '-25deg',
      },
    ],
  },


  leafTwo: {
    position: 'absolute',
    right: 82,
    bottom: 24,
    transform: [
      {
        rotate: '35deg',
      },
    ],
  },

});