import React, {useState} from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Svg, {Path} from 'react-native-svg';

import {
  Colors,
  Spacing,
  Radius,
} from '../../theme';

/* =====================================================
   LEAF-BASKET OUTLINE ICON
   No single Ionicons glyph combines a leaf + basket,
   so this is a small custom SVG matching the splash
   screen's mark, drawn as a thin outline.
===================================================== */

const BasketLeafOutline = ({size = 44, color = Colors.primary}) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    {/* leaf */}
    <Path
      d="M50,10 C60,14 62,24 54,30 C46,24 44,14 50,10 Z"
      stroke={color}
      strokeWidth={4}
      fill="none"
      strokeLinejoin="round"
    />
    <Path
      d="M50,12 L50,29"
      stroke={color}
      strokeWidth={3}
      strokeLinecap="round"
    />

    {/* basket rim */}
    <Path
      d="M24,42 L76,42 L73,50 L27,50 Z"
      stroke={color}
      strokeWidth={4}
      fill="none"
      strokeLinejoin="round"
    />

    {/* basket body */}
    <Path
      d="M28,42 L72,42 L65,82 C65,85 62,87 59,87 L41,87 C38,87 35,85 35,82 Z"
      stroke={color}
      strokeWidth={4}
      fill="none"
      strokeLinejoin="round"
    />

    {/* vertical weave lines */}
    <Path
      d="M43,52 L40,82 M50,52 L50,82 M57,52 L60,82"
      stroke={color}
      strokeWidth={2.5}
      strokeLinecap="round"
    />
  </Svg>
);

const SignupScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState('');

  /* ================================
     GO TO MAIN APP
  ================================= */

  const goToHome = () => {
    const parentNav = navigation.getParent();

    if (parentNav) {
      parentNav.replace('Main');
    } else {
      navigation.replace('Main');
    }
  };

  /* ================================
     SIGNUP
  ================================= */

  const handleSignup = () => {
    if (
      !name.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword
    ) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError('');

    // Backend authentication will be connected later.
    goToHome();
  };

  /* ================================
     GOOGLE
  ================================= */

  const handleGoogleSignup = () => {
    // Google authentication will be connected later.
    goToHome();
  };

  /* ================================
     APPLE
  ================================= */

  const handleAppleSignup = () => {
    // Apple authentication will be connected later.
    goToHome();
  };

  /* ================================
     SKIP
  ================================= */

  const handleSkip = () => {
    setError('');
    goToHome();
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={
        Platform.OS === 'ios'
          ? 'padding'
          : undefined
      }>

      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.background}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}>

        {/* =================================
            SKIP BUTTON
        ================================= */}

        <View style={styles.skipWrapper}>

          <TouchableOpacity
            style={styles.skipButton}
            activeOpacity={0.8}
            onPress={handleSkip}>

            <Text style={styles.skipText}>
              Skip
            </Text>

            <Ionicons
              name="arrow-forward"
              size={15}
              color={Colors.primary}
            />

          </TouchableOpacity>

        </View>


        {/* =================================
            HEADER
        ================================= */}

        <View style={styles.header}>

          <View style={styles.logoContainer}>

            <BasketLeafOutline size={46} color={Colors.primary} />

          </View>


          <Text style={styles.title}>
            Welcome to Fresh Basket
          </Text>


          <Text style={styles.subtitle}>
            Create your account and get fresh groceries
            {'\n'}
            delivered right to your doorstep.
          </Text>

        </View>


        {/* =================================
            FORM CARD
        ================================= */}

        <View style={styles.formCard}>

          {/* NAME */}

          <View style={styles.inputContainer}>

            <Ionicons
              name="person-outline"
              size={19}
              color={Colors.textSecondary}
              style={styles.inputIcon}
            />

            <TextInput
              style={styles.input}
              placeholder="Full name"
              placeholderTextColor={Colors.textLight}
              value={name}
              onChangeText={text => {
                setName(text);
                setError('');
              }}
              autoCapitalize="words"
              autoCorrect={false}
            />

          </View>


          {/* EMAIL */}

          <View style={styles.inputContainer}>

            <Ionicons
              name="mail-outline"
              size={19}
              color={Colors.textSecondary}
              style={styles.inputIcon}
            />

            <TextInput
              style={styles.input}
              placeholder="Email address"
              placeholderTextColor={Colors.textLight}
              value={email}
              onChangeText={text => {
                setEmail(text);
                setError('');
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

          </View>


          {/* PASSWORD */}

          <View style={styles.inputContainer}>

            <Ionicons
              name="lock-closed-outline"
              size={19}
              color={Colors.textSecondary}
              style={styles.inputIcon}
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={Colors.textLight}
              value={password}
              onChangeText={text => {
                setPassword(text);
                setError('');
              }}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoCorrect={false}
            />

            <TouchableOpacity
              onPress={() =>
                setShowPassword(previous => !previous)
              }
              activeOpacity={0.7}
              style={styles.eyeButton}>

              <Ionicons
                name={
                  showPassword
                    ? 'eye-outline'
                    : 'eye-off-outline'
                }
                size={20}
                color={Colors.textSecondary}
              />

            </TouchableOpacity>

          </View>


          {/* CONFIRM PASSWORD */}

          <View style={styles.inputContainer}>

            <Ionicons
              name="shield-checkmark-outline"
              size={19}
              color={Colors.textSecondary}
              style={styles.inputIcon}
            />

            <TextInput
              style={styles.input}
              placeholder="Confirm password"
              placeholderTextColor={Colors.textLight}
              value={confirmPassword}
              onChangeText={text => {
                setConfirmPassword(text);
                setError('');
              }}
              secureTextEntry={!showConfirmPassword}
              autoCapitalize="none"
              autoCorrect={false}
            />

            <TouchableOpacity
              onPress={() =>
                setShowConfirmPassword(previous => !previous)
              }
              activeOpacity={0.7}
              style={styles.eyeButton}>

              <Ionicons
                name={
                  showConfirmPassword
                    ? 'eye-outline'
                    : 'eye-off-outline'
                }
                size={20}
                color={Colors.textSecondary}
              />

            </TouchableOpacity>

          </View>


          {/* ERROR */}

          {error ? (
            <View style={styles.errorContainer}>

              <Ionicons
                name="alert-circle-outline"
                size={17}
                color={Colors.error}
              />

              <Text style={styles.errorText}>
                {error}
              </Text>

            </View>
          ) : null}


          {/* CREATE ACCOUNT */}

          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.85}
            onPress={handleSignup}>

            <Text style={styles.primaryButtonText}>
              Create Account
            </Text>

            <Ionicons
              name="arrow-forward"
              size={18}
              color={Colors.white}
            />

          </TouchableOpacity>

        </View>


        {/* =================================
            DIVIDER
        ================================= */}

        <View style={styles.dividerContainer}>

          <View style={styles.divider} />

          <Text style={styles.dividerText}>
            OR CONTINUE WITH
          </Text>

          <View style={styles.divider} />

        </View>


        {/* =================================
            SOCIAL BUTTONS
        ================================= */}

        <View style={styles.socialContainer}>

          {/* GOOGLE */}

          <TouchableOpacity
            style={styles.socialButton}
            activeOpacity={0.85}
            onPress={handleGoogleSignup}>

            <Ionicons
              name="logo-google"
              size={19}
              color="#DB4437"
            />

            <Text style={styles.socialText}>
              Google
            </Text>

          </TouchableOpacity>


          {/* APPLE */}

          <TouchableOpacity
            style={[
              styles.socialButton,
              styles.appleButton,
            ]}
            activeOpacity={0.85}
            onPress={handleAppleSignup}>

            <Ionicons
              name="logo-apple"
              size={20}
              color={Colors.white}
            />

            <Text
              style={[
                styles.socialText,
                styles.appleText,
              ]}>
              Apple
            </Text>

          </TouchableOpacity>

        </View>


        {/* =================================
            OTP MESSAGE
        ================================= */}

        <View style={styles.otpInfo}>

          <Ionicons
            name="phone-portrait-outline"
            size={14}
            color={Colors.textSecondary}
          />

          <Text style={styles.otpText}>
            Phone number + OTP login coming soon
          </Text>

        </View>


        {/* =================================
            FOOTER
        ================================= */}

        <View style={styles.footer}>

          <Ionicons
            name="leaf-outline"
            size={14}
            color={Colors.primary}
          />

          <Text style={styles.footerText}>
            Fresh groceries. Simple shopping.
          </Text>

        </View>

      </ScrollView>

    </KeyboardAvoidingView>
  );
};

export default SignupScreen;


/* =====================================================
   STYLES
===================================================== */

const styles = StyleSheet.create({

  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.lg,
    paddingBottom: 28,
  },

  skipWrapper: {
    width: '100%',
    alignItems: 'flex-end',

    paddingTop: 24,
    paddingRight: 2,

    marginBottom: 4,
  },

  skipButton: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: 13,
    paddingVertical: 8,

    borderRadius: Radius.round,

    backgroundColor: '#E8F5E9',
  },

  skipText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primary,

    marginRight: 4,
  },

  header: {
    alignItems: 'center',

    marginTop: 18,
    marginBottom: 25,
  },

  logoContainer: {
    width: 78,
    height: 78,

    borderRadius: 39,

    backgroundColor: '#E8F5E9',

    justifyContent: 'center',
    alignItems: 'center',

    marginBottom: 17,
  },

  title: {
    fontSize: 25,
    lineHeight: 31,

    fontWeight: '800',

    color: Colors.text,

    textAlign: 'center',
  },

  subtitle: {
    marginTop: 8,

    fontSize: 13,
    lineHeight: 20,

    color: Colors.textSecondary,

    textAlign: 'center',

    paddingHorizontal: 12,
  },

  formCard: {
    backgroundColor: Colors.surface,

    borderRadius: Radius.xl,

    padding: 14,

    borderWidth: 1,
    borderColor: Colors.border,
  },

  inputContainer: {
    height: 46,

    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: Colors.background,

    borderWidth: 1,
    borderColor: Colors.border,

    borderRadius: Radius.md,

    paddingHorizontal: 12,

    marginBottom: 11,
  },

  inputIcon: {
    marginRight: 9,
  },

  input: {
    flex: 1,

    height: '100%',

    paddingVertical: 0,

    fontSize: 13,

    color: Colors.text,
  },

  eyeButton: {
    padding: 3,
  },

  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: 3,

    marginTop: -2,
    marginBottom: 9,
  },

  errorText: {
    marginLeft: 6,

    fontSize: 12,

    color: Colors.error,
  },

  primaryButton: {
    height: 46,

    borderRadius: Radius.md,

    backgroundColor: Colors.primary,

    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'center',

    marginTop: 1,

    elevation: 4,

    shadowColor: Colors.primary,

    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.22,

    shadowRadius: 6,
  },

  primaryButtonText: {
    fontSize: 14,

    fontWeight: '800',

    color: Colors.white,

    marginRight: 7,
  },

  dividerContainer: {
    flexDirection: 'row',

    alignItems: 'center',

    marginVertical: 21,
  },

  divider: {
    flex: 1,

    height: 1,

    backgroundColor: Colors.border,
  },

  dividerText: {
    marginHorizontal: 9,

    fontSize: 9,

    fontWeight: '700',

    letterSpacing: 0.8,

    color: Colors.textLight,
  },

  socialContainer: {
    flexDirection: 'row',

    gap: 9,
  },

  socialButton: {
    flex: 1,

    height: 45,

    borderRadius: Radius.md,

    backgroundColor: Colors.surface,

    borderWidth: 1,

    borderColor: Colors.border,

    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'center',

    gap: 7,
  },

  appleButton: {
    backgroundColor: '#111111',

    borderColor: '#111111',
  },

  socialText: {
    fontSize: 13,

    fontWeight: '700',

    color: Colors.text,
  },

  appleText: {
    color: Colors.white,
  },

  otpInfo: {
    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'center',

    marginTop: 17,
  },

  otpText: {
    marginLeft: 5,

    fontSize: 11,

    color: Colors.textSecondary,

    textAlign: 'center',
  },

  footer: {
    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'center',

    marginTop: 18,
  },

  footerText: {
    marginLeft: 5,

    fontSize: 11,

    color: Colors.textLight,
  },

});