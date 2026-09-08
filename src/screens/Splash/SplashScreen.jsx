import React, {
  useEffect,
  useRef,
} from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  Easing,
  StatusBar,
  Dimensions,
} from 'react-native';

import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import Ionicons from '@react-native-vector-icons/ionicons';

import {
  Colors,
  Typography,
} from '../../theme';

const {width} = Dimensions.get('window');

const SPLASH_DURATION = 7000;

const LOGO_CIRCLE = 190;

const SplashScreen = ({navigation}) => {

  const insets = useSafeAreaInsets();

  const logoScale = useRef(new Animated.Value(0.85)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const ringScale = useRef(new Animated.Value(1)).current;
  const ringOpacity = useRef(new Animated.Value(0.5)).current;
  const breathe = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textTranslate = useRef(new Animated.Value(10)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const blobOneFloat = useRef(new Animated.Value(0)).current;
  const blobTwoFloat = useRef(new Animated.Value(0)).current;
  const progressWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {

    // Logo entrance
    Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        friction: 7,
        tension: 45,
        useNativeDriver: true,
      }),
    ]).start();

    // Text entrance
    Animated.parallel([
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 500,
        delay: 350,
        useNativeDriver: true,
      }),
      Animated.timing(textTranslate, {
        toValue: 0,
        duration: 500,
        delay: 350,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();

    // Tagline row fade-in, slightly after title
    Animated.timing(taglineOpacity, {
      toValue: 1,
      duration: 500,
      delay: 650,
      useNativeDriver: true,
    }).start();

    // Pulsing ring behind logo — loops for the whole splash duration
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(ringScale, {
            toValue: 1.3,
            duration: 1400,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(ringScale, {
            toValue: 1,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(ringOpacity, {
            toValue: 0,
            duration: 1400,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(ringOpacity, {
            toValue: 0.5,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
      ]),
    ).start();

    // Subtle breathing scale on the logo itself — same idea as the
    // onboarding illustration, keeps it feeling alive over 7s.
    Animated.loop(
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
    ).start();

    // Floating background blobs — slow, subtle vertical drift
    Animated.loop(
      Animated.sequence([
        Animated.timing(blobOneFloat, {
          toValue: 1,
          duration: 2600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(blobOneFloat, {
          toValue: 0,
          duration: 2600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(blobTwoFloat, {
          toValue: 1,
          duration: 3200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(blobTwoFloat, {
          toValue: 0,
          duration: 3200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start();

    // Progress bar — fills over the full splash duration
    Animated.timing(progressWidth, {
      toValue: 1,
      duration: SPLASH_DURATION,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();

    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, SPLASH_DURATION);

    return () => clearTimeout(timer);

  }, [
    navigation,
    logoScale,
    logoOpacity,
    ringScale,
    ringOpacity,
    breathe,
    textOpacity,
    textTranslate,
    taglineOpacity,
    blobOneFloat,
    blobTwoFloat,
    progressWidth,
  ]);

  const blobOneTranslateY = blobOneFloat.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -18],
  });

  const blobTwoTranslateY = blobTwoFloat.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 16],
  });

  const progressBarWidth = progressWidth.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const breatheScale = breathe.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.035],
  });

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>

      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.onboardingBg}
      />

      {/* BACKGROUND DECORATION — floating blobs, more presence than a flat bg */}
      <Animated.View
        style={[
          styles.blob,
          styles.blobOne,
          {transform: [{translateY: blobOneTranslateY}]},
        ]}
      />
      <Animated.View
        style={[
          styles.blob,
          styles.blobTwo,
          {transform: [{translateY: blobTwoTranslateY}]},
        ]}
      />
      <View style={[styles.blob, styles.blobThree]} />
      <View style={[styles.blob, styles.blobFour]} />

      <View style={styles.content}>

        {/* LOGO — layered circle backdrop + accent dots + pulsing ring,
            matching the onboarding slide treatment for consistency */}
        <View style={styles.logoStack}>

          <Animated.View
            style={[
              styles.pulseRing,
              {
                opacity: ringOpacity,
                transform: [{scale: ringScale}],
              },
            ]}
          />

          <View style={styles.outerRing} />
          <View style={styles.innerCircle} />

          <View style={[styles.accentDot, styles.accentDotOne]} />
          <View style={[styles.accentDot, styles.accentDotTwo]} />
          <View style={[styles.accentDot, styles.accentDotThree]} />

          <Animated.View
            style={[
              styles.logoWrapper,
              {
                opacity: logoOpacity,
                transform: [
                  {scale: Animated.multiply(logoScale, breatheScale)},
                ],
              },
            ]}>

            <Image
              source={require('../../assets/images/onboarding/grocery1.png')}
              style={styles.logo}
              resizeMode="contain"
            />

          </Animated.View>

        </View>

        <Animated.View
          style={[
            styles.textContainer,
            {
              opacity: textOpacity,
              transform: [{translateY: textTranslate}],
            },
          ]}>

          <Text style={styles.title}>Fresh Basket</Text>
          <View style={styles.titleUnderline} />
          <Text style={styles.subtitle}>Fresh groceries.</Text>
          <Text style={styles.subtitle}>Simple shopping.</Text>

        </Animated.View>

        {/* TAGLINE ROW — echoes the leaf-icon tagline style used on Signup */}
        <Animated.View style={[styles.taglineRow, {opacity: taglineOpacity}]}>
          <Ionicons name="leaf-outline" size={13} color={Colors.primary} />
          <Text style={styles.taglineText}>100% fresh, always on time</Text>
        </Animated.View>

      </View>

      {/* PROGRESS BAR — fills over the 7s splash duration, pinned above
          the safe-area inset like the onboarding button */}
      <View
        style={[
          styles.progressWrapper,
          {paddingBottom: Math.max(insets.bottom, 30) + 16},
        ]}>
        <View style={styles.progressTrack}>
          <Animated.View
            style={[styles.progressFill, {width: progressBarWidth}]}
          />
        </View>
      </View>

    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: Colors.onboardingBg,
    overflow: 'hidden',
  },

  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -30,
  },

  logoStack: {
    width: LOGO_CIRCLE,
    height: LOGO_CIRCLE,
    alignItems: 'center',
    justifyContent: 'center',
  },

  outerRing: {
    position: 'absolute',
    width: LOGO_CIRCLE,
    height: LOGO_CIRCLE,
    borderRadius: LOGO_CIRCLE / 2,
    backgroundColor: 'rgba(46,125,50,0.06)',
  },

  innerCircle: {
    position: 'absolute',
    width: LOGO_CIRCLE * 0.82,
    height: LOGO_CIRCLE * 0.82,
    borderRadius: (LOGO_CIRCLE * 0.82) / 2,
    backgroundColor: Colors.primarySoft,
  },

  accentDot: {
    position: 'absolute',
    borderRadius: 999,
  },

  accentDotOne: {
    width: 14,
    height: 14,
    backgroundColor: Colors.secondary,
    top: 4,
    right: 8,
  },

  accentDotTwo: {
    width: 10,
    height: 10,
    backgroundColor: Colors.primaryLight,
    bottom: 10,
    left: 0,
  },

  accentDotThree: {
    width: 7,
    height: 7,
    backgroundColor: Colors.accent,
    top: 34,
    left: -6,
  },

  pulseRing: {
    position: 'absolute',
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: Colors.primaryLight,
  },

  // Logo enlarged so it fills most of its circle backdrop, same fix
  // applied to the onboarding illustration.
  logoWrapper: {
    width: LOGO_CIRCLE * 0.62,
    height: LOGO_CIRCLE * 0.62,
    alignItems: 'center',
    justifyContent: 'center',
    ...styleShadow(),
  },

  logo: {
    width: '100%',
    height: '100%',
  },

  textContainer: {
    alignItems: 'center',
    marginTop: 18,
  },

  title: {
    ...Typography.h1,
    fontSize: 27,
    lineHeight: 33,
    color: Colors.primaryDark,
    textAlign: 'center',
    letterSpacing: -0.3,
  },

  titleUnderline: {
    width: 34,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.primary,
    marginTop: 8,
    marginBottom: 8,
  },

  subtitle: {
    ...Typography.body,
    fontSize: 13,
    lineHeight: 19,
    color: Colors.primaryDark,
    textAlign: 'center',
  },

  taglineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: Colors.primarySoft,
  },

  taglineText: {
    ...Typography.caption,
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primary,
  },

  progressWrapper: {
    paddingHorizontal: 60,
  },

  progressTrack: {
    height: 4,
    width: '100%',
    borderRadius: 2,
    backgroundColor: Colors.primarySoft,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    borderRadius: 2,
    backgroundColor: Colors.primary,
  },

  blob: {
    position: 'absolute',
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },

  blobOne: {
    width: 130,
    height: 130,
    top: -40,
    left: -35,
  },

  blobTwo: {
    width: 100,
    height: 100,
    bottom: -30,
    right: -25,
  },

  blobThree: {
    width: 70,
    height: 70,
    top: 110,
    right: -20,
    backgroundColor: 'rgba(255,255,255,0.28)',
  },

  blobFour: {
    width: 55,
    height: 55,
    bottom: 140,
    left: -15,
    backgroundColor: 'rgba(255,255,255,0.28)',
  },
});

function styleShadow() {
  return {
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 4},
  };
}