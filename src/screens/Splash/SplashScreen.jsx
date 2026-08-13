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

import LinearGradient from 'react-native-linear-gradient';

import {
  Colors,
  Typography,
  Spacing,
  Radius,
} from '../../theme';

const SplashScreen = ({navigation}) => {
  const logoScale = useRef(new Animated.Value(0.75)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;

  const contentOpacity = useRef(new Animated.Value(0)).current;
  const contentTranslate = useRef(new Animated.Value(20)).current;

  const loaderOpacity = useRef(new Animated.Value(0)).current;
  const loaderWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // -----------------------------
    // LOGO ANIMATION
    // -----------------------------
    Animated.parallel([
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 900,
        easing: Easing.out(Easing.back(1.2)),
        useNativeDriver: true,
      }),

      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start();

    // -----------------------------
    // TEXT ANIMATION
    // -----------------------------
    Animated.parallel([
      Animated.timing(contentOpacity, {
        toValue: 1,
        duration: 700,
        delay: 500,
        useNativeDriver: true,
      }),

      Animated.timing(contentTranslate, {
        toValue: 0,
        duration: 700,
        delay: 500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();

    // -----------------------------
    // LOADER ANIMATION
    // -----------------------------
    Animated.timing(loaderOpacity, {
      toValue: 1,
      duration: 500,
      delay: 1000,
      useNativeDriver: true,
    }).start();

    Animated.timing(loaderWidth, {
      toValue: 1,
      duration: 2800,
      delay: 1000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();

    // -----------------------------
    // MOVE TO ONBOARDING
    // -----------------------------
    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  }, [
    navigation,
    logoScale,
    logoOpacity,
    contentOpacity,
    contentTranslate,
    loaderOpacity,
    loaderWidth,
  ]);

  const progressWidth = loaderWidth.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={Colors.primaryDark}
        barStyle="light-content"
      />

      {/* =================================
          BACKGROUND GRADIENT
      ================================== */}

      <LinearGradient
        colors={[
          Colors.primaryDark,
          Colors.primary,
          Colors.primaryLight,
        ]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={StyleSheet.absoluteFill}
      />

      {/* =================================
          DECORATIVE CIRCLES
      ================================== */}

      <View style={styles.circleTop} />

      <View style={styles.circleBottom} />

      <View style={styles.circleSmall} />

      {/* =================================
          MAIN CONTENT
      ================================== */}

      <View style={styles.content}>
        <Animated.View
          style={[
            styles.logoWrapper,
            {
              opacity: logoOpacity,
              transform: [{scale: logoScale}],
            },
          ]}>
          
          <View style={styles.logoBackground}>
            <Image
              source={require('../../assets/images/onboarding/grocery1.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

        </Animated.View>

        {/* =================================
            TEXT
        ================================== */}

        <Animated.View
          style={[
            styles.textContainer,
            {
              opacity: contentOpacity,
              transform: [
                {
                  translateY: contentTranslate,
                },
              ],
            },
          ]}>

          <Text style={styles.title}>
            Fresh Basket
          </Text>

          <Text style={styles.subtitle}>
            Everything Fresh,{' '}
            <Text style={styles.subtitleHighlight}>
              Right at Your Doorstep
            </Text>
          </Text>

        </Animated.View>
      </View>

      {/* =================================
          LOADER
      ================================== */}

      <Animated.View
        style={[
          styles.loaderContainer,
          {
            opacity: loaderOpacity,
          },
        ]}>

        <View style={styles.loaderTrack}>
          <Animated.View
            style={[
              styles.loaderProgress,
              {
                width: progressWidth,
              },
            ]}
          />
        </View>

        <Text style={styles.loadingText}>
          Freshness is on the way...
        </Text>

      </Animated.View>

      {/* =================================
          BOTTOM BRANDING
      ================================== */}

      <Text style={styles.bottomText}>
        FRESH • FAST • RELIABLE
      </Text>
    </View>
  );
};

export default SplashScreen;


/* =========================================================
   STYLES
========================================================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },

  /* =================================
     DECORATIVE BACKGROUND
  ================================== */

  circleTop: {
    position: 'absolute',
    width: 330,
    height: 330,
    borderRadius: 165,
    backgroundColor: 'rgba(255,255,255,0.06)',
    top: -150,
    right: -100,
  },

  circleBottom: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(255,255,255,0.05)',
    bottom: -140,
    left: -120,
  },

  circleSmall: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.05)',
    top: 160,
    left: -40,
  },

  /* =================================
     MAIN CONTENT
  ================================== */

  content: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -40,
  },

  logoWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoBackground: {
    width: 230,
    height: 230,
    borderRadius: Radius.xxl,

    backgroundColor: 'rgba(255,255,255,0.96)',

    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.18,
    shadowRadius: 20,

    elevation: 12,
  },

  logo: {
    width: 205,
    height: 205,
  },

  /* =================================
     TEXT
  ================================== */

  textContainer: {
    alignItems: 'center',
    marginTop: Spacing.xl,
    paddingHorizontal: Spacing.lg,
  },

  title: {
    fontSize: 34,
    fontWeight: '800',
    color: Colors.white,
    letterSpacing: 0.5,
    textAlign: 'center',
  },

  subtitle: {
    ...Typography.body,

    marginTop: Spacing.sm,

    color: 'rgba(255,255,255,0.82)',

    textAlign: 'center',

    lineHeight: 24,
  },

  subtitleHighlight: {
    color: Colors.white,
    fontWeight: '600',
  },

  /* =================================
     LOADER
  ================================== */

  loaderContainer: {
    position: 'absolute',
    bottom: 80,
    alignItems: 'center',
  },

  loaderTrack: {
    width: 110,
    height: 4,

    borderRadius: 10,

    backgroundColor: 'rgba(255,255,255,0.25)',

    overflow: 'hidden',
  },

  loaderProgress: {
    height: 4,

    borderRadius: 10,

    backgroundColor: Colors.white,
  },

  loadingText: {
    ...Typography.caption,

    marginTop: 12,

    color: 'rgba(255,255,255,0.75)',

    letterSpacing: 0.3,
  },

  /* =================================
     BOTTOM BRANDING
  ================================== */

  bottomText: {
    position: 'absolute',

    bottom: 30,

    fontSize: 10,

    fontWeight: '700',

    color: 'rgba(255,255,255,0.55)',

    letterSpacing: 2,
  },
});