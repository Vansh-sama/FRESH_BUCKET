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

import {SafeAreaView} from 'react-native-safe-area-context';

import Ionicons from '@react-native-vector-icons/ionicons/static';

import {
  Colors,
  Spacing,
  Typography,
  Radius,
} from '../../theme';

const SignupScreen = ({navigation, onSignupSuccess}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState('');

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

    onSignupSuccess?.();
  };

  const handleGoogleSignup = () => {
    onSignupSuccess?.();
  };

  const handleAppleSignup = () => {
    onSignupSuccess?.();
  };

  const handleSkip = () => {
    onSignupSuccess?.();
  };

  return (
    <SafeAreaView
      style={styles.screen}
      edges={['top', 'bottom']}>

      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.background}
      />

      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : undefined
        }>

        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}>

          {/* TOP BAR */}

          <View style={styles.topBar}>

            <TouchableOpacity
              style={styles.backButton}
              activeOpacity={0.8}
              onPress={() => navigation.goBack()}>

              <Ionicons
                name="arrow-back"
                size={22}
                color={Colors.text}
              />

            </TouchableOpacity>

            <TouchableOpacity
              style={styles.skipButton}
              activeOpacity={0.8}
              onPress={handleSkip}>

              <Text style={styles.skipText}>
                Skip
              </Text>

              <Ionicons
                name="arrow-forward"
                size={16}
                color={Colors.primary}
              />

            </TouchableOpacity>

          </View>

          {/* HEADER */}

          <View style={styles.header}>

            <View style={styles.logoContainer}>

              <Ionicons
                name="basket-outline"
                size={38}
                color={Colors.primary}
              />

            </View>

            <Text style={styles.title}>
              Welcome to Fresh Basket
            </Text>

            <Text style={styles.subtitle}>
              Create your account and get fresh groceries
              delivered right to your doorstep.
            </Text>

          </View>

          {/* FORM */}

          <View style={styles.formCard}>

            {/* NAME */}

            <View style={styles.inputContainer}>

              <Ionicons
                name="person-outline"
                size={20}
                color={Colors.textSecondary}
                style={styles.inputIcon}
              />

              <TextInput
                style={styles.input}
                placeholder="Full name"
                placeholderTextColor={Colors.textLight}
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />

            </View>

            {/* EMAIL */}

            <View style={styles.inputContainer}>

              <Ionicons
                name="mail-outline"
                size={20}
                color={Colors.textSecondary}
                style={styles.inputIcon}
              />

              <TextInput
                style={styles.input}
                placeholder="Email address"
                placeholderTextColor={Colors.textLight}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />

            </View>

            {/* PASSWORD */}

            <View style={styles.inputContainer}>

              <Ionicons
                name="lock-closed-outline"
                size={20}
                color={Colors.textSecondary}
                style={styles.inputIcon}
              />

              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={Colors.textLight}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                  setShowPassword(previous => !previous)
                }>

                <Ionicons
                  name={
                    showPassword
                      ? 'eye-off-outline'
                      : 'eye-outline'
                  }
                  size={21}
                  color={Colors.textSecondary}
                />

              </TouchableOpacity>

            </View>

            {/* CONFIRM PASSWORD */}

            <View style={styles.inputContainer}>

              <Ionicons
                name="shield-checkmark-outline"
                size={20}
                color={Colors.textSecondary}
                style={styles.inputIcon}
              />

              <TextInput
                style={styles.input}
                placeholder="Confirm password"
                placeholderTextColor={Colors.textLight}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
              />

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                  setShowConfirmPassword(previous => !previous)
                }>

                <Ionicons
                  name={
                    showConfirmPassword
                      ? 'eye-off-outline'
                      : 'eye-outline'
                  }
                  size={21}
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
                size={19}
                color={Colors.white}
              />

            </TouchableOpacity>

          </View>

          {/* DIVIDER */}

          <View style={styles.dividerContainer}>

            <View style={styles.divider} />

            <Text style={styles.dividerText}>
              OR CONTINUE WITH
            </Text>

            <View style={styles.divider} />

          </View>

          {/* SOCIAL BUTTONS */}

          <View style={styles.socialContainer}>

            <TouchableOpacity
              style={styles.socialButton}
              activeOpacity={0.85}
              onPress={handleGoogleSignup}>

              <Ionicons
                name="logo-google"
                size={20}
                color="#DB4437"
              />

              <Text style={styles.socialText}>
                Google
              </Text>

            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.socialButton,
                styles.appleButton,
              ]}
              activeOpacity={0.85}
              onPress={handleAppleSignup}>

              <Ionicons
                name="logo-apple"
                size={21}
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

          {/* FUTURE OTP */}

          <View style={styles.otpComingSoon}>

            <Ionicons
              name="phone-portrait-outline"
              size={15}
              color={Colors.primary}
            />

            <Text style={styles.otpText}>
              Phone number + OTP login coming soon
            </Text>

          </View>

          {/* FOOTER */}

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

    </SafeAreaView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({

  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  keyboardContainer: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.lg,
    paddingBottom: 30,
  },

  /* TOP */

  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Spacing.sm,
    marginBottom: Spacing.lg,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: Radius.round,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },

  skipButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.round,
    backgroundColor: '#E8F5E9',
  },

  skipText: {
    ...Typography.bodySmall,
    fontWeight: '700',
    color: Colors.primary,
    marginRight: 5,
  },

  /* HEADER */

  header: {
    alignItems: 'center',
    marginTop: Spacing.sm,
    marginBottom: Spacing.xl,
  },

  logoContainer: {
    width: 78,
    height: 78,
    borderRadius: Radius.round,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },

  title: {
    ...Typography.h2,
    fontWeight: '800',
    color: Colors.text,
    textAlign: 'center',
  },

  subtitle: {
    ...Typography.bodySmall,
    marginTop: Spacing.sm,
    lineHeight: 22,
    color: Colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 15,
  },

  /* FORM */

  formCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  inputContainer: {
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    paddingHorizontal: 15,
    marginBottom: 13,
  },

  inputIcon: {
    marginRight: 11,
  },

  input: {
    flex: 1,
    height: '100%',
    ...Typography.bodySmall,
    color: Colors.text,
  },

  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 3,
  },

  errorText: {
    ...Typography.caption,
    marginLeft: 6,
    color: Colors.error,
  },

  primaryButton: {
    height: 55,
    borderRadius: Radius.md,
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 3,
    elevation: 4,
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.22,
    shadowRadius: 7,
  },

  primaryButtonText: {
    ...Typography.button,
    fontWeight: '800',
    color: Colors.white,
    marginRight: 9,
  },

  /* DIVIDER */

  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing.xl,
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },

  dividerText: {
    marginHorizontal: 10,
    ...Typography.tiny,
    fontWeight: '700',
    letterSpacing: 0.8,
    color: Colors.textLight,
  },

  /* SOCIAL */

  socialContainer: {
    flexDirection: 'row',
  },

  socialButton: {
    flex: 1,
    height: 52,
    borderRadius: Radius.md,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },

  appleButton: {
    backgroundColor: '#111111',
    borderColor: '#111111',
  },

  socialText: {
    ...Typography.bodySmall,
    fontWeight: '700',
    color: Colors.text,
    marginLeft: 8,
  },

  appleText: {
    color: Colors.white,
  },

  /* OTP */

  otpComingSoon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.xl,
  },

  otpText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginLeft: 5,
  },

  /* FOOTER */

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.xl,
  },

  footerText: {
    ...Typography.caption,
    marginLeft: 5,
    color: Colors.textLight,
  },

});