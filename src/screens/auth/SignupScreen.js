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
  ActivityIndicator,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import {Colors, Spacing, Typography, Radius} from '../../theme';
import {registerUser} from '../../services/authService';

const SignupScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // ======================================
  // REGISTER
  // ======================================

  const handleSignup = async () => {
    setError('');

    // Required fields
    if (
      !name.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !password ||
      !confirmPassword
    ) {
      setError('Please fill in all fields');
      return;
    }

    // Password match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Phone validation
    if (phone.trim().length !== 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    // Password validation
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      setLoading(true);

      const data = await registerUser({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        password: password,
      });

      console.log('REGISTER RESPONSE:', data);

      if (data.success) {
        // Registration successful
        navigation.navigate('Login', {
          registered: true,
        });
      } else {
        setError(
          data.message || 'Registration failed. Please try again.',
        );
      }
    } catch (error) {
      console.log(
        'REGISTER ERROR:',
        error.response?.data || error.message,
      );

      setError(
        error.response?.data?.message ||
          'Unable to connect to server. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  // ======================================
  // GOOGLE SIGNUP
  // ======================================

  const handleGoogleSignup = () => {
    console.log('Google signup pressed');
  };

  // ======================================
  // APPLE SIGNUP
  // ======================================

  const handleAppleSignup = () => {
    console.log('Apple signup pressed');
  };

  // ======================================
  // SKIP
  // ======================================

  const handleSkip = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'MainTabs'}],
    });
  };

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: Colors.background,
      }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">

        {/* ================= TOP ROW ================= */}

        <View style={styles.topRow}>

          {/* Back */}

          <TouchableOpacity
            style={styles.backButton}
            hitSlop={{
              top: 10,
              bottom: 10,
              left: 10,
              right: 10,
            }}
            onPress={() => navigation.goBack()}>

            <Ionicons
              name="arrow-back"
              size={22}
              color={Colors.textPrimary}
            />

          </TouchableOpacity>

          {/* Skip */}

          <TouchableOpacity
            style={styles.skipButton}
            activeOpacity={0.85}
            onPress={handleSkip}>

            <Text style={styles.skipText}>
              Skip
            </Text>

            <Ionicons
              name="arrow-forward-circle-outline"
              size={18}
              color={Colors.primary}
            />

          </TouchableOpacity>

        </View>

        {/* ================= HEADER ================= */}

        <View style={styles.header}>

          <View style={styles.logoCircle}>

            <Ionicons
              name="leaf"
              size={30}
              color={Colors.primary}
            />

          </View>

          <Text style={styles.title}>
            Create account
          </Text>

          <Text style={styles.subtitle}>
            Sign up to start shopping fresh
          </Text>

        </View>

        {/* ================= NAME ================= */}

        <View style={styles.inputWrap}>

          <Ionicons
            name="person-outline"
            size={20}
            color={Colors.textMuted}
            style={styles.inputIcon}
          />

          <TextInput
            style={styles.input}
            placeholder="Full name"
            placeholderTextColor={Colors.textMuted}
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />

        </View>

        {/* ================= EMAIL ================= */}

        <View style={styles.inputWrap}>

          <Ionicons
            name="mail-outline"
            size={20}
            color={Colors.textMuted}
            style={styles.inputIcon}
          />

          <TextInput
            style={styles.input}
            placeholder="Email address"
            placeholderTextColor={Colors.textMuted}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={setEmail}
          />

        </View>

        {/* ================= PHONE ================= */}

        <View style={styles.inputWrap}>

          <Ionicons
            name="call-outline"
            size={20}
            color={Colors.textMuted}
            style={styles.inputIcon}
          />

          <TextInput
            style={styles.input}
            placeholder="Phone number"
            placeholderTextColor={Colors.textMuted}
            keyboardType="phone-pad"
            maxLength={10}
            value={phone}
            onChangeText={setPhone}
          />

        </View>

        {/* ================= PASSWORD ================= */}

        <View style={styles.inputWrap}>

          <Ionicons
            name="lock-closed-outline"
            size={20}
            color={Colors.textMuted}
            style={styles.inputIcon}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={Colors.textMuted}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            hitSlop={{
              top: 10,
              bottom: 10,
              left: 10,
              right: 10,
            }}
            onPress={() =>
              setShowPassword(!showPassword)
            }>

            <Ionicons
              name={
                showPassword
                  ? 'eye-off-outline'
                  : 'eye-outline'
              }
              size={20}
              color={Colors.textMuted}
            />

          </TouchableOpacity>

        </View>

        {/* ================= CONFIRM PASSWORD ================= */}

        <View style={styles.inputWrap}>

          <Ionicons
            name="lock-closed-outline"
            size={20}
            color={Colors.textMuted}
            style={styles.inputIcon}
          />

          <TextInput
            style={styles.input}
            placeholder="Confirm password"
            placeholderTextColor={Colors.textMuted}
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <TouchableOpacity
            hitSlop={{
              top: 10,
              bottom: 10,
              left: 10,
              right: 10,
            }}
            onPress={() =>
              setShowConfirmPassword(
                !showConfirmPassword,
              )
            }>

            <Ionicons
              name={
                showConfirmPassword
                  ? 'eye-off-outline'
                  : 'eye-outline'
              }
              size={20}
              color={Colors.textMuted}
            />

          </TouchableOpacity>

        </View>

        {/* ================= ERROR ================= */}

        {error ? (
          <View style={styles.errorRow}>

            <Ionicons
              name="alert-circle-outline"
              size={16}
              color={Colors.error}
            />

            <Text style={styles.errorText}>
              {error}
            </Text>

          </View>
        ) : null}

        {/* ================= SIGNUP BUTTON ================= */}

        <TouchableOpacity
          style={[
            styles.signupButton,
            loading && styles.disabledButton,
          ]}
          onPress={handleSignup}
          disabled={loading}>

          {loading ? (
            <ActivityIndicator
              size="small"
              color={Colors.textInverse}
            />
          ) : (
            <Text style={styles.signupButtonText}>
              Create Account
            </Text>
          )}

        </TouchableOpacity>

        {/* ================= DIVIDER ================= */}

        <View style={styles.dividerRow}>

          <View style={styles.dividerLine} />

          <Text style={styles.dividerText}>
            or continue with
          </Text>

          <View style={styles.dividerLine} />

        </View>

        {/* ================= GOOGLE ================= */}

        <TouchableOpacity
          style={[
            styles.socialButton,
            styles.googleButton,
          ]}
          onPress={handleGoogleSignup}>

          <Ionicons
            name="logo-google"
            size={20}
            color={Colors.googleRed}
            style={styles.socialIcon}
          />

          <Text style={styles.socialButtonText}>
            Continue with Google
          </Text>

        </TouchableOpacity>

        {/* ================= APPLE ================= */}

        <TouchableOpacity
          style={[
            styles.socialButton,
            styles.appleButton,
          ]}
          onPress={handleAppleSignup}>

          <Ionicons
            name="logo-apple"
            size={22}
            color={Colors.textInverse}
            style={styles.socialIcon}
          />

          <Text
            style={[
              styles.socialButtonText,
              {
                color: Colors.textInverse,
              },
            ]}>

            Continue with Apple

          </Text>

        </TouchableOpacity>

        {/* ================= LOGIN ================= */}

        <View style={styles.footer}>

          <Text style={styles.footerText}>
            Already have an account?{' '}
          </Text>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Login')
            }>

            <Text style={styles.footerLink}>
              Log in
            </Text>

          </TouchableOpacity>

        </View>

      </ScrollView>

    </KeyboardAvoidingView>
  );
};

export default SignupScreen;


// ======================================================
// STYLES
// ======================================================

const styles = StyleSheet.create({

  container: {
    flexGrow: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xl,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },

  skipButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: Radius.md,
    backgroundColor: Colors.primarySoft,
  },

  skipText: {
    ...Typography.bodyBold,
    color: Colors.primary,
    marginRight: 4,
    fontSize: 14,
  },

  header: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },

  logoCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primarySoft,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },

  title: {
    ...Typography.h1,
    color: Colors.textPrimary,
  },

  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
    textAlign: 'center',
  },

  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.md,
    height: 52,
  },

  inputIcon: {
    marginRight: Spacing.sm,
  },

  input: {
    flex: 1,
    ...Typography.body,
    color: Colors.textPrimary,
    height: '100%',
  },

  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },

  errorText: {
    ...Typography.caption,
    color: Colors.error,
    marginLeft: 6,
    flex: 1,
  },

  signupButton: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.md,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,

    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },

  disabledButton: {
    opacity: 0.7,
  },

  signupButtonText: {
    ...Typography.h3,
    color: Colors.textInverse,
  },

  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },

  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },

  dividerText: {
    ...Typography.caption,
    color: Colors.textMuted,
    marginHorizontal: Spacing.sm,
  },

  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
    borderRadius: Radius.md,
    marginBottom: Spacing.md,
  },

  googleButton: {
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  appleButton: {
    backgroundColor: Colors.appleBlack,
  },

  socialIcon: {
    marginRight: Spacing.sm,
  },

  socialButtonText: {
    ...Typography.bodyBold,
    color: Colors.textPrimary,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Spacing.lg,
  },

  footerText: {
    ...Typography.body,
    color: Colors.textSecondary,
  },

  footerLink: {
    ...Typography.bodyBold,
    color: Colors.primary,
  },

});