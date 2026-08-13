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

import Ionicons from '@react-native-vector-icons/ionicons';

import {
  Colors,
  Spacing,
  Typography,
  Radius,
} from '../../theme';

const SignupScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState('');

  /*
   * For now we are not connecting authentication.
   *
   * Later:
   * Signup/Login will be replaced with Phone Number + OTP.
   */

  const goToHome = () => {
    navigation.replace('Main');
  };

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

    // Temporary navigation until Phone + OTP is implemented.
    goToHome();
  };

  const handleGoogleSignup = () => {
    // Google authentication will be added later.
    goToHome();
  };

  const handleAppleSignup = () => {
    // Apple authentication will be added later.
    goToHome();
  };

  const handleSkip = () => {
    // Skip signup and continue to the main application.
    goToHome();
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>

      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.background}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}>

        {/* =====================================================
            TOP BAR
        ====================================================== */}

        <View style={styles.topBar}>

          {/* BACK BUTTON */}

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


          {/* SKIP BUTTON */}

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


        {/* =====================================================
            HEADER
        ====================================================== */}

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


        {/* =====================================================
            FORM
        ====================================================== */}

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


        {/* =====================================================
            DIVIDER
        ====================================================== */}

        <View style={styles.dividerContainer}>

          <View style={styles.divider} />

          <Text style={styles.dividerText}>
            OR CONTINUE WITH
          </Text>

          <View style={styles.divider} />

        </View>


        {/* =====================================================
            SOCIAL BUTTONS
        ====================================================== */}

        <View style={styles.socialContainer}>

          {/* GOOGLE */}

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


        {/* =====================================================
            FUTURE AUTH MESSAGE
        ====================================================== */}

        <View style={styles.futureAuthContainer}>

          <Ionicons
            name="phone-portrait-outline"
            size={16}
            color={Colors.primary}
          />

          <Text style={styles.futureAuthText}>
            Phone number + OTP login coming soon
          </Text>

        </View>


        {/* =====================================================
            FOOTER
        ====================================================== */}

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


/* ============================================================
   STYLES
============================================================ */

const styles = StyleSheet.create({

  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },


  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxxl,
  },


  /* ============================================================
     TOP BAR
  ============================================================ */

  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Spacing.md,
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


  /* ============================================================
     HEADER
  ============================================================ */

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
    color: Colors.text,
    textAlign: 'center',
  },


  subtitle: {
    ...Typography.bodySmall,
    lineHeight: 22,
    color: Colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: Spacing.md,
    marginTop: Spacing.sm,
  },


  /* ============================================================
     FORM
  ============================================================ */

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
    paddingVertical: 0,
  },


  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
    paddingHorizontal: 3,
  },


  errorText: {
    marginLeft: 6,
    ...Typography.caption,
    color: Colors.error,
  },


  /* ============================================================
     PRIMARY BUTTON
  ============================================================ */

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
    color: Colors.white,
    marginRight: Spacing.sm,
  },


  /* ============================================================
     DIVIDER
  ============================================================ */

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
    marginHorizontal: Spacing.sm,
    ...Typography.tiny,
    fontWeight: '700',
    letterSpacing: 0.8,
    color: Colors.textLight,
  },


  /* ============================================================
     SOCIAL BUTTONS
  ============================================================ */

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
    marginLeft: Spacing.sm,
  },


  appleText: {
    color: Colors.white,
  },


  /* ============================================================
     FUTURE AUTH
  ============================================================ */

  futureAuthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.xl,
  },


  futureAuthText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginLeft: 6,
  },


  /* ============================================================
     FOOTER
  ============================================================ */

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.xl,
  },


  footerText: {
    ...Typography.caption,
    color: Colors.textLight,
    marginLeft: 5,
  },

});