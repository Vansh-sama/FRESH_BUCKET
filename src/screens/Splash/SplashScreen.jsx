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
  Spacing,
  Typography,
  Radius,
} from '../../theme';

const SplashScreen = ({navigation}) => {
  const logoScale = useRef(new Animated.Value(0.82)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;

  const contentOpacity = useRef(new Animated.Value(0)).current;
  const contentTranslate = useRef(new Animated.Value(18)).current;

  const loaderOpacity = useRef(new Animated.Value(0)).current;
  const spinnerRotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.back(1.1)),
        useNativeDriver: true,
      }),

      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 650,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.parallel([
      Animated.timing(contentOpacity, {
        toValue: 1,
        duration: 650,
        delay: 400,
        useNativeDriver: true,
      }),

      Animated.timing(contentTranslate, {
        toValue: 0,
        duration: 650,
        delay: 400,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();

    Animated.timing(loaderOpacity, {
      toValue: 1,
      duration: 400,
      delay: 900,
      useNativeDriver: true,
    }).start();

    // Continuous spinner rotation
    Animated.loop(
      Animated.timing(spinnerRotation, {
        toValue: 1,
        duration: 900,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();

    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 3500);

    return () => clearTimeout(timer);
  }, [
    navigation,
    logoScale,
    logoOpacity,
    contentOpacity,
    contentTranslate,
    loaderOpacity,
    spinnerRotation,
  ]);

  const spinnerSpin = spinnerRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>

      <StatusBar
        backgroundColor={Colors.primaryDark}
        barStyle="light-content"
      />

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

      {/* BACKGROUND DECORATION */}

      <View style={styles.circleTop} />
      <View style={styles.circleBottom} />
      <View style={styles.circleSmall} />

      {/* MAIN CONTENT */}

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

        <Animated.View
          style={[
            styles.textContainer,
            {
              opacity: contentOpacity,
              transform: [{translateY: contentTranslate}],
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

      {/* LOADER */}

      <Animated.View
        style={[
          styles.loaderContainer,
          {
            opacity: loaderOpacity,
          },
        ]}>

        <Animated.View
          style={[
            styles.spinner,
            {
              transform: [{rotate: spinnerSpin}],
            },
          ]}
        />

        <Text style={styles.loadingText}>
          Loading...
        </Text>

      </Animated.View>

    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },

  /* BACKGROUND */

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

  /* CONTENT */

  content: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -35,
  },

  logoWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  /*
    Reference image:
    white rounded square ≈ 185-195px
  */

  logoBackground: {
    width: 190,
    height: 190,
    borderRadius: 28,

    backgroundColor: 'rgba(255,255,255,0.96)',

    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 10,
  },

  /*
    Keep the actual image slightly smaller
    so it has a clean white margin.
  */

  logo: {
    width: 165,
    height: 165,
  },

  /* TEXT */

  textContainer: {
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 16,
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.white,
    letterSpacing: 0.2,
    textAlign: 'center',
  },

  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    lineHeight: 21,
  },

  subtitleHighlight: {
    color: Colors.white,
    fontWeight: '700',
  },

  /* LOADER */

  loaderContainer: {
    position: 'absolute',
    bottom: 90,
    alignItems: 'center',
  },

  spinner: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.25)',
    borderTopColor: Colors.white,
    borderRightColor: Colors.white,
  },

  loadingText: {
    marginTop: 12,
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    letterSpacing: 0.3,
  },

});