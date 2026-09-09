import React, {useEffect, useRef} from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';

import {
  Colors,
  Spacing,
  Typography,
} from '../../theme';

const {width} = Dimensions.get('window');

const CIRCLE_SIZE = Math.min(width * 0.72, 300);

const OnboardingItem = ({item}) => {

  // Subtle breathing scale on the illustration — small, slow, loops
  // continuously to keep the slide feeling alive rather than static.
  const breathe = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(breathe, {
          toValue: 1,
          duration: 1800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(breathe, {
          toValue: 0,
          duration: 1800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [breathe]);

  const imageScale = breathe.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.035],
  });

  return (
    <View style={styles.container}>

      {/* IMAGE — now large enough to fill most of the circle backdrop
          instead of floating small inside it; backdrop shows as a thin
          glow ring around the illustration rather than empty space. */}
      <View style={styles.imageStack}>

        <View style={styles.outerRing} />
        <View style={styles.innerCircle} />

        <View style={[styles.accentDot, styles.accentDotOne]} />
        <View style={[styles.accentDot, styles.accentDotTwo]} />
        <View style={[styles.accentDot, styles.accentDotThree]} />

        <Animated.View
          style={[
            styles.imageWrapper,
            {transform: [{scale: imageScale}]},
          ]}>
          <Image
            source={item.image}
            style={styles.image}
            resizeMode="contain"
          />
        </Animated.View>

      </View>

      {/* TEXT */}
      <View style={styles.textContainer}>

        <Text style={styles.title}>
          {item.title}
        </Text>

        <View style={styles.titleUnderline} />

        <Text style={styles.description}>
          {item.description}
        </Text>

      </View>
    </View>
  );
};

export default OnboardingItem;

export {CIRCLE_SIZE};

const styles = StyleSheet.create({
  container: {
    width,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: Spacing.xxl,
  },

  imageStack: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },

  outerRing: {
    position: 'absolute',
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: 'rgba(46,125,50,0.06)',
  },

  innerCircle: {
    position: 'absolute',
    width: CIRCLE_SIZE * 0.9,
    height: CIRCLE_SIZE * 0.9,
    borderRadius: (CIRCLE_SIZE * 0.9) / 2,
    backgroundColor: Colors.primarySoft,
  },

  accentDot: {
    position: 'absolute',
    borderRadius: 999,
  },

  accentDotOne: {
    width: 16,
    height: 16,
    backgroundColor: Colors.secondary,
    top: 2,
    right: 12,
  },

  accentDotTwo: {
    width: 11,
    height: 11,
    backgroundColor: Colors.primaryLight,
    bottom: 14,
    left: -2,
  },

  accentDotThree: {
    width: 8,
    height: 8,
    backgroundColor: Colors.accent,
    top: 40,
    left: -8,
  },

  // Image now spans nearly the full circle (was 0.62 -> 0.94), so the
  // illustration is the star of the slide instead of the backdrop.
  imageWrapper: {
    width: CIRCLE_SIZE * 0.94,
    height: CIRCLE_SIZE * 0.94,
    alignItems: 'center',
    justifyContent: 'center',

    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: {width: 0, height: 6},
  },

  image: {
    width: '100%',
    height: '100%',
  },

  textContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 22,
  },

  title: {
    ...Typography.h2,
    fontSize: 23,
    lineHeight: 29,
    color: Colors.text,
    textAlign: 'center',
    fontWeight: '700',
  },

  titleUnderline: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.primary,
    marginTop: 10,
  },

  description: {
    ...Typography.body,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    maxWidth: width - 80,
  },
});