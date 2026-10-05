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
  Radius,
}from '../../theme';

const {width} = Dimensions.get('window');

const IMAGE_SIZE = Math.min(width * 0.86, 350);

const OnboardingItem = ({item, isActive}) => {
  const imageOpacity = useRef(new Animated.Value(0)).current;
  const imageScale = useRef(new Animated.Value(0.94)).current;
  const imageTranslateY = useRef(new Animated.Value(18)).current;

  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslateY = useRef(new Animated.Value(14)).current;

  const descriptionOpacity = useRef(new Animated.Value(0)).current;
  const descriptionTranslateY = useRef(new Animated.Value(12)).current;

  const floatAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!isActive) {
      return;
    }

    imageOpacity.setValue(0);
    imageScale.setValue(0.94);
    imageTranslateY.setValue(18);

    titleOpacity.setValue(0);
    titleTranslateY.setValue(14);

    descriptionOpacity.setValue(0);
    descriptionTranslateY.setValue(12);

    const entranceAnimation = Animated.parallel([
      Animated.timing(imageOpacity, {
        toValue: 1,
        duration: 420,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),

      Animated.spring(imageScale, {
        toValue: 1,
        friction: 7,
        tension: 50,
        useNativeDriver: true,
      }),

      Animated.timing(imageTranslateY, {
        toValue: 0,
        duration: 420,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),

      Animated.timing(titleOpacity, {
        toValue: 1,
        duration: 350,
        delay: 120,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),

      Animated.timing(titleTranslateY, {
        toValue: 0,
        duration: 350,
        delay: 120,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),

      Animated.timing(descriptionOpacity, {
        toValue: 1,
        duration: 350,
        delay: 190,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),

      Animated.timing(descriptionTranslateY, {
        toValue: 0,
        duration: 350,
        delay: 190,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]);

    entranceAnimation.start();

    const floatingAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnimation, {
          toValue: 1,
          duration: 1900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),

        Animated.timing(floatAnimation, {
          toValue: 0,
          duration: 1900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );

    floatingAnimation.start();

    return () => {
      entranceAnimation.stop();
      floatingAnimation.stop();
    };
  }, [
    isActive,
    imageOpacity,
    imageScale,
    imageTranslateY,
    titleOpacity,
    titleTranslateY,
    descriptionOpacity,
    descriptionTranslateY,
    floatAnimation,
  ]);

  const floatingY = floatAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -6],
  });

  return (
    <View style={styles.container}>

      {/* =================================================
          ILLUSTRATION
      ================================================= */}

      <View style={styles.illustrationArea}>

        {/* Soft visual background */}

        <View style={styles.softCircle} />

        <View style={styles.softCircleSmall} />

        {/* Small decorative accents */}

        <View
          style={[
            styles.accent,
            styles.accentTopRight,
          ]}
        />

        <View
          style={[
            styles.accent,
            styles.accentBottomLeft,
          ]}
        />

        {/* Main illustration */}

        <Animated.View
          style={[
            styles.imageWrapper,
            {
              opacity: imageOpacity,

              transform: [
                {scale: imageScale},
                {
                  translateY:
                    Animated.add(
                      imageTranslateY,
                      floatingY,
                    ),
                },
              ],
            },
          ]}>

          <Image
            source={item.image}
            style={styles.image}
            resizeMode="contain"
          />

        </Animated.View>

      </View>


      {/* =================================================
          TEXT
      ================================================= */}

      <Animated.View
        style={[
          styles.textArea,
          {
            opacity: titleOpacity,

            transform: [
              {translateY: titleTranslateY},
            ],
          },
        ]}>

        <View style={styles.titleAccent} />

        <Text style={styles.title}>
          {item.title}
        </Text>

      </Animated.View>


      <Animated.View
        style={[
          styles.descriptionWrapper,
          {
            opacity: descriptionOpacity,

            transform: [
              {translateY: descriptionTranslateY},
            ],
          },
        ]}>

        <Text style={styles.description}>
          {item.description}
        </Text>

      </Animated.View>

    </View>
  );
};

export default OnboardingItem;

export {IMAGE_SIZE};


const styles = StyleSheet.create({

  /*
   * ========================================================
   * CONTAINER
   * ========================================================
   */

  container: {
    width,

    alignItems: 'center',

    paddingHorizontal: Spacing.xxl,
  },


  /*
   * ========================================================
   * ILLUSTRATION
   * ========================================================
   */

  illustrationArea: {
    width: IMAGE_SIZE,

    height: IMAGE_SIZE,

    alignItems: 'center',

    justifyContent: 'center',

    position: 'relative',
  },

  softCircle: {
    position: 'absolute',

    width: IMAGE_SIZE * 0.78,

    height: IMAGE_SIZE * 0.78,

    borderRadius: IMAGE_SIZE,

    backgroundColor: 'rgba(255,255,255,0.72)',
  },

  softCircleSmall: {
    position: 'absolute',

    width: IMAGE_SIZE * 0.62,

    height: IMAGE_SIZE * 0.62,

    borderRadius: IMAGE_SIZE,

    backgroundColor: 'rgba(220,242,225,0.42)',
  },

  imageWrapper: {
    width: IMAGE_SIZE,

    height: IMAGE_SIZE,

    alignItems: 'center',

    justifyContent: 'center',

    zIndex: 5,
  },

  image: {
    width: '100%',

    height: '100%',
  },


  /*
   * ========================================================
   * DECORATIVE ACCENTS
   * ========================================================
   */

  accent: {
    position: 'absolute',

    borderRadius: 999,

    zIndex: 2,
  },

  accentTopRight: {
    width: 12,

    height: 12,

    backgroundColor: Colors.secondary,

    top: IMAGE_SIZE * 0.16,

    right: IMAGE_SIZE * 0.06,
  },

  accentBottomLeft: {
    width: 9,

    height: 9,

    backgroundColor: Colors.primaryLight,

    bottom: IMAGE_SIZE * 0.18,

    left: IMAGE_SIZE * 0.04,
  },


  /*
   * ========================================================
   * TITLE
   * ========================================================
   */

  textArea: {
    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'center',

    paddingHorizontal: Spacing.md,

    marginTop: 2,
  },

  titleAccent: {
    width: 4,

    height: 25,

    borderRadius: Radius.pill,

    backgroundColor: Colors.primary,

    marginRight: 10,
  },

  title: {
    ...Typography.h2,

    fontSize: 24,

    lineHeight: 30,

    fontWeight: '800',

    color: Colors.text,

    textAlign: 'center',

    letterSpacing: -0.35,
  },


  /*
   * ========================================================
   * DESCRIPTION
   * ========================================================
   */

  descriptionWrapper: {
    width: '100%',

    alignItems: 'center',

    marginTop: 11,

    paddingHorizontal: 4,
  },

  description: {
    ...Typography.body,

    fontSize: 14,

    lineHeight: 21,

    color: Colors.textSecondary,

    textAlign: 'center',

    maxWidth: width - 78,
  },

});