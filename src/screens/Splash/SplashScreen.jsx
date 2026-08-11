import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  StatusBar,
  Image,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import {
  Colors,
  Typography,
 Spacing,
  Radius,
  Shadows,
} from '../../theme';

const SplashScreen = ({navigation}) => {
  const logoScale = useRef(new Animated.Value(0.7)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;

  const textOpacity = useRef(new Animated.Value(0)).current;
  const textTranslate = useRef(new Animated.Value(25)).current;

  const loaderOpacity = useRef(new Animated.Value(0)).current;

  const floatAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(logoScale, {
          toValue: 1,
          duration: 900,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true,
        }),

        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
      ]),

      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),

        Animated.timing(textTranslate, {
          toValue: 0,
          duration: 700,
          useNativeDriver: true,
        }),

        Animated.timing(loaderOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnimation, {
          toValue: -8,
          duration: 1800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),

        Animated.timing(floatAnimation, {
          toValue: 0,
          duration: 1800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start();

    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <LinearGradient
        colors={[
          '#1B5E20',
          '#2E7D32',
          '#4CAF50',
        ]}
        style={styles.container}>
        {/* Background Circles */}

        <View style={styles.circleOne} />

        <View style={styles.circleTwo} />

        <View style={styles.circleThree} />

        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: logoOpacity,
              transform: [
                {scale: logoScale},
                {translateY: floatAnimation},
              ],
            },
          ]}>
          <Image
            source={require('../../assets/logos/freshbasket_logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </Animated.View>

        <Animated.View
          style={{
            opacity: textOpacity,
            transform: [{translateY: textTranslate}],
          }}>
          <Text style={styles.title}>
            Fresh Basket
          </Text>

          <Text style={styles.subtitle}>
            Everything Fresh,{'\n'}
            Right at Your Doorstep
          </Text>
        </Animated.View>

        <Animated.View
          style={[
            styles.loadingContainer,
            {
              opacity: loaderOpacity,
            },
          ]}>
          <View style={styles.dot} />

          <View style={[styles.dot, styles.middleDot]} />

          <View style={styles.dot} />
        </Animated.View>
      </LinearGradient>
    </>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    width: 210,
    height: 210,
  },

  title: {
    marginTop: Spacing.xl,
    ...Typography.h1,
    fontWeight: '800',
    color: Colors.white,
    letterSpacing: 1,
    textAlign: 'center',
  },

  subtitle: {
    marginTop: 12,
    ...Typography.body,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    lineHeight: 24,
  },

  loadingContainer: {
    position: 'absolute',
    bottom: 80,
    flexDirection: 'row',
    alignItems: 'center',
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: Radius.round,
    backgroundColor: Colors.white,
    opacity: 0.7,
  },

  middleDot: {
    marginHorizontal: 10,
  },

  circleOne: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: 'rgba(255,255,255,0.05)',
    top: -70,
    right: -60,
  },

  circleTwo: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(255,255,255,0.04)',
    bottom: -40,
    left: -50,
  },

  circleThree: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.06)',
    top: 180,
    left: 40,
  },
});