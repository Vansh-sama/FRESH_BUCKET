import React, {useEffect, useRef} from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  Easing,
  StatusBar,
} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

import {
  Colors,
  Typography,
  Spacing,
  Radius,
}from '../../theme';


const SplashScreen = ({navigation}) => {
  /*
   * ---------------------------------------------------------
   * ANIMATION VALUES
   * ---------------------------------------------------------
   */

  const logoScale = useRef(new Animated.Value(0.82)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;

  const brandOpacity = useRef(new Animated.Value(0)).current;
  const brandTranslateY = useRef(
    new Animated.Value(14),
  ).current;

  const taglineOpacity = useRef(
    new Animated.Value(0),
  ).current;

  const taglineTranslateY = useRef(
    new Animated.Value(10),
  ).current;

  const loaderOpacity = useRef(
    new Animated.Value(0),
  ).current;

  const leafOne = useRef(new Animated.Value(0)).current;
  const leafTwo = useRef(new Animated.Value(0)).current;

  const glowScale = useRef(new Animated.Value(0.75)).current;
  const glowOpacity = useRef(new Animated.Value(0)).current;


  /*
   * ---------------------------------------------------------
   * SPLASH ANIMATION
   * ---------------------------------------------------------
   */

  useEffect(() => {
    const startAnimation = async () => {

      /*
       * Main logo entrance
       */
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 500,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),

        Animated.spring(logoScale, {
          toValue: 1,
          friction: 7,
          tension: 55,
          useNativeDriver: true,
        }),

        Animated.timing(glowOpacity, {
          toValue: 1,
          duration: 650,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),

        Animated.spring(glowScale, {
          toValue: 1,
          friction: 8,
          tension: 45,
          useNativeDriver: true,
        }),
      ]).start();


      /*
       * Brand name
       */
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(brandOpacity, {
            toValue: 1,
            duration: 420,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),

          Animated.timing(brandTranslateY, {
            toValue: 0,
            duration: 420,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
        ]).start();
      }, 350);


      /*
       * Tagline
       */
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(taglineOpacity, {
            toValue: 1,
            duration: 420,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),

          Animated.timing(taglineTranslateY, {
            toValue: 0,
            duration: 420,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
        ]).start();
      }, 600);


      /*
       * Loading indicator
       */
      setTimeout(() => {
        Animated.timing(loaderOpacity, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true,
        }).start();
      }, 900);


      /*
       * Small decorative floating animation
       */
      Animated.loop(
        Animated.sequence([
          Animated.timing(leafOne, {
            toValue: 1,
            duration: 1800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),

          Animated.timing(leafOne, {
            toValue: 0,
            duration: 1800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ).start();


      Animated.loop(
        Animated.sequence([
          Animated.timing(leafTwo, {
            toValue: 1,
            duration: 2200,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),

          Animated.timing(leafTwo, {
            toValue: 0,
            duration: 2200,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ).start();


      /*
       * Move to onboarding.
       *
       * Keep this short. Real delivery apps don't keep the
       * user staring at a splash screen for several seconds.
       */
      setTimeout(() => {
        navigation.replace('Onboarding');
      }, 2400);
    };


    startAnimation();

    /*
     * Cleanup
     */
    return () => {
      logoOpacity.stopAnimation();
      logoScale.stopAnimation();
      brandOpacity.stopAnimation();
      brandTranslateY.stopAnimation();
      taglineOpacity.stopAnimation();
      taglineTranslateY.stopAnimation();
      loaderOpacity.stopAnimation();
      leafOne.stopAnimation();
      leafTwo.stopAnimation();
      glowScale.stopAnimation();
      glowOpacity.stopAnimation();
    };
  }, [
    navigation,
    logoOpacity,
    logoScale,
    brandOpacity,
    brandTranslateY,
    taglineOpacity,
    taglineTranslateY,
    loaderOpacity,
    leafOne,
    leafTwo,
    glowScale,
    glowOpacity,
  ]);


  /*
   * ---------------------------------------------------------
   * FLOATING POSITIONS
   * ---------------------------------------------------------
   */

  const leafOneTranslateY = leafOne.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10],
  });

  const leafOneRotate = leafOne.interpolate({
    inputRange: [0, 1],
    outputRange: ['-8deg', '4deg'],
  });

  const leafTwoTranslateY = leafTwo.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 9],
  });

  const leafTwoRotate = leafTwo.interpolate({
    inputRange: [0, 1],
    outputRange: ['8deg', '-5deg'],
  });


  return (
    <SafeAreaView style={styles.container}>

      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.onboardingBg}
        translucent={false}
      />


      {/* ---------------------------------------------------
          BACKGROUND DECORATION
      --------------------------------------------------- */}

      <View style={styles.backgroundCircleLarge} />

      <View style={styles.backgroundCircleSmall} />

      <View style={styles.backgroundGlow} />


      {/* Floating decorative leaves */}

      <Animated.View
        style={[
          styles.decorativeLeaf,
          styles.leafTopLeft,
          {
            transform: [
              {translateY: leafOneTranslateY},
              {rotate: leafOneRotate},
            ],
          },
        ]}>

        <View style={styles.leafShape} />

      </Animated.View>


      <Animated.View
        style={[
          styles.decorativeLeaf,
          styles.leafBottomRight,
          {
            transform: [
              {translateY: leafTwoTranslateY},
              {rotate: leafTwoRotate},
            ],
          },
        ]}>

        <View style={styles.leafShapeSmall} />

      </Animated.View>


      {/* ---------------------------------------------------
          MAIN CONTENT
      --------------------------------------------------- */}

      <View style={styles.content}>


        {/* Logo glow */}

        <Animated.View
          style={[
            styles.logoGlow,
            {
              opacity: glowOpacity,
              transform: [
                {scale: glowScale},
              ],
            },
          ]}
        />


        {/* Logo */}

        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: logoOpacity,
              transform: [
                {scale: logoScale},
              ],
            },
          ]}>

          <Image
            source={require('../../assets/images/onboarding/grocery1.png')}
            style={styles.logo}
            resizeMode="contain"
          />

        </Animated.View>


        {/* Brand */}

        <Animated.View
          style={[
            styles.brandContainer,
            {
              opacity: brandOpacity,
              transform: [
                {translateY: brandTranslateY},
              ],
            },
          ]}>

          <Text style={styles.brandText}>
            Fresh
          </Text>

          <Text style={styles.brandTextAccent}>
            Basket
          </Text>

        </Animated.View>


        {/* Tagline */}

        <Animated.View
          style={[
            styles.taglineContainer,
            {
              opacity: taglineOpacity,
              transform: [
                {translateY: taglineTranslateY},
              ],
            },
          ]}>

          <Text style={styles.tagline}>
            Fresh groceries, simply.
          </Text>

        </Animated.View>


      </View>


      {/* ---------------------------------------------------
          BOTTOM LOADER
      --------------------------------------------------- */}

      <Animated.View
        style={[
          styles.loaderContainer,
          {
            opacity: loaderOpacity,
          },
        ]}>

        <View style={styles.loaderDots}>

          <View style={styles.loaderDotInactive} />

          <View style={styles.loaderDotActive} />

          <View style={styles.loaderDotInactive} />

        </View>

        <Text style={styles.loadingText}>
          Getting things ready...
        </Text>

      </Animated.View>


      {/* Bottom brand message */}

      <Text style={styles.bottomText}>
        Your everyday grocery companion
      </Text>

    </SafeAreaView>
  );
};


export default SplashScreen;


/*
 * =========================================================
 * STYLES
 * =========================================================
 */

const styles = StyleSheet.create({

  /*
   * -------------------------------------------------------
   * SCREEN
   * -------------------------------------------------------
   */

  container: {
    flex: 1,

    backgroundColor: Colors.onboardingBg,

    alignItems: 'center',

    overflow: 'hidden',
  },


  /*
   * -------------------------------------------------------
   * BACKGROUND
   * -------------------------------------------------------
   */

  backgroundCircleLarge: {
    position: 'absolute',

    width: 390,
    height: 390,

    borderRadius: 195,

    backgroundColor: 'rgba(255,255,255,0.48)',

    top: -180,
    left: -150,
  },

  backgroundCircleSmall: {
    position: 'absolute',

    width: 280,
    height: 280,

    borderRadius: 140,

    backgroundColor: 'rgba(220,242,225,0.55)',

    bottom: -130,
    right: -100,
  },

  backgroundGlow: {
    position: 'absolute',

    width: 320,
    height: 320,

    borderRadius: 160,

    backgroundColor: 'rgba(255,255,255,0.45)',

    top: '29%',
  },


  /*
   * -------------------------------------------------------
   * DECORATIVE LEAVES
   * -------------------------------------------------------
   */

  decorativeLeaf: {
    position: 'absolute',

    alignItems: 'center',
    justifyContent: 'center',

    opacity: 0.75,
  },

  leafTopLeft: {
    top: 95,
    left: 34,
  },

  leafBottomRight: {
    bottom: 150,
    right: 36,
  },

  leafShape: {
    width: 30,
    height: 15,

    borderTopLeftRadius: 30,
    borderBottomRightRadius: 30,

    backgroundColor: Colors.primaryLight,

    transform: [
      {rotate: '-25deg'},
    ],
  },

  leafShapeSmall: {
    width: 22,
    height: 12,

    borderTopLeftRadius: 24,
    borderBottomRightRadius: 24,

    backgroundColor: Colors.primary,

    transform: [
      {rotate: '25deg'},
    ],
  },


  /*
   * -------------------------------------------------------
   * MAIN CONTENT
   * -------------------------------------------------------
   */

  content: {
    flex: 1,

    width: '100%',

    alignItems: 'center',
    justifyContent: 'center',

    paddingHorizontal: Spacing.xxl,
  },


  /*
   * -------------------------------------------------------
   * LOGO
   * -------------------------------------------------------
   */

  logoGlow: {
    position: 'absolute',

    width: 285,
    height: 285,

    borderRadius: 142.5,

    backgroundColor: 'rgba(255,255,255,0.75)',
  },

  logoContainer: {
    width: 265,
    height: 265,

    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    width: '100%',
    height: '100%',
  },


  /*
   * -------------------------------------------------------
   * BRAND NAME
   * -------------------------------------------------------
   */

  brandContainer: {
    flexDirection: 'row',

    alignItems: 'baseline',

    marginTop: -8,
  },

  brandText: {
    ...Typography.h1,

    fontSize: 38,

    lineHeight: 44,

    fontWeight: '800',

    color: Colors.primaryDark,

    letterSpacing: -1.2,
  },

  brandTextAccent: {
    ...Typography.h1,

    fontSize: 38,

    lineHeight: 44,

    fontWeight: '800',

    color: Colors.primaryLight,

    letterSpacing: -1.2,

    marginLeft: 5,
  },


  /*
   * -------------------------------------------------------
   * TAGLINE
   * -------------------------------------------------------
   */

  taglineContainer: {
    marginTop: 8,

    alignItems: 'center',
  },

  tagline: {
    ...Typography.body,

    fontSize: 15,

    lineHeight: 22,

    color: Colors.textSecondary,

    letterSpacing: 0.2,

    textAlign: 'center',
  },


  /*
   * -------------------------------------------------------
   * LOADER
   * -------------------------------------------------------
   */

  loaderContainer: {
    position: 'absolute',

    bottom: 74,

    alignItems: 'center',
  },

  loaderDots: {
    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'center',

    marginBottom: 10,
  },

  loaderDotInactive: {
    width: 7,
    height: 7,

    borderRadius: 4,

    backgroundColor: '#CDE5D0',

    marginHorizontal: 4,
  },

  loaderDotActive: {
    width: 24,
    height: 7,

    borderRadius: 4,

    backgroundColor: Colors.primary,

    marginHorizontal: 4,
  },

  loadingText: {
    ...Typography.caption,

    fontSize: 11,

    color: Colors.textLight,

    letterSpacing: 0.2,
  },


  /*
   * -------------------------------------------------------
   * BOTTOM TEXT
   * -------------------------------------------------------
   */

  bottomText: {
    position: 'absolute',

    bottom: 28,

    ...Typography.caption,

    fontSize: 10,

    color: Colors.textLight,

    letterSpacing: 0.3,
  },

});