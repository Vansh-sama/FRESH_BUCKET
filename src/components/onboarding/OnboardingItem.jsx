import React from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';

import {
  Colors,
  Spacing,
  Typography,
} from '../../theme';

const {width} = Dimensions.get('window');
const CIRCLE_SIZE = width * 0.66;

const OnboardingItem = ({item}) => {
  return (
    <View style={styles.container}>

      {/* ================================
          IMAGE CIRCLE
      ================================= */}

      <View style={styles.circleBackdrop}>

        <Image
          source={item.image}
          style={styles.image}
          resizeMode="contain"
        />

      </View>


      {/* ================================
          TEXT
      ================================= */}

      <View style={styles.textContainer}>

        <Text style={styles.title}>
          {item.title}
        </Text>

        <Text style={styles.description}>
          {item.description}
        </Text>

      </View>

    </View>
  );
};

export default OnboardingItem;


/* =====================================================
   STYLES
===================================================== */

const styles = StyleSheet.create({

  container: {
    width: width,

    flex: 1,

    alignItems: 'center',

    justifyContent: 'flex-start',

    paddingTop: Spacing.xxxl,

    paddingHorizontal: Spacing.xxl,
  },


  /* ================================
     IMAGE
  ================================= */

  circleBackdrop: {
    width: CIRCLE_SIZE,

    height: CIRCLE_SIZE,

    borderRadius: CIRCLE_SIZE / 2,

    // No light-green token exists in Colors yet —
    // add e.g. Colors.primarySoft = '#E8F5E9' to
    // colors.js to make this reusable instead of a
    // one-off hex.
    backgroundColor: '#E8F5E9',

    alignItems: 'center',

    justifyContent: 'center',
  },

  image: {
    width: '62%',

    height: '62%',
  },


  /* ================================
     TEXT
  ================================= */

  textContainer: {
    alignItems: 'center',

    marginTop: Spacing.xxl,
  },

  title: {
    ...Typography.h3,

    color: Colors.text,

    textAlign: 'center',
  },

  description: {
    ...Typography.bodySmall,

    marginTop: Spacing.sm,

    color: Colors.textSecondary,

    textAlign: 'center',

    lineHeight: 20,

    maxWidth: width - 80,
  },

});