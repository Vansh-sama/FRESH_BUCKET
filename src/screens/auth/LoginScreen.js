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
  Alert,
  ActivityIndicator,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import {Colors, Typography, Spacing, Radius} from '../../theme';
import {loginUser} from '../../services/authService';

const LoginScreen = ({navigation, onLoginSuccess}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // ======================================
  // LOGIN
  // ======================================

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert(
        'Missing Fields',
        'Please enter email and password.',
      );
      return;
    }

    try {
      setLoading(true);

      const data = await loginUser({
        email: email.trim().toLowerCase(),
        password,
      });

      console.log('LOGIN RESPONSE:', data);

      if (data.success) {
        Alert.alert(
          'Login Successful',
          `Welcome back ${data.user?.name || ''}!`,
        );

        if (onLoginSuccess) {
          onLoginSuccess(data);
        }
      } else {
        Alert.alert(
          'Login Failed',
          data.message || 'Invalid email or password.',
        );
      }
    } catch (error) {
      console.log(
        'LOGIN ERROR:',
        error.response?.data || error.message,
      );

      Alert.alert(
        'Login Failed',
        error.response?.data?.message ||
          'Unable to connect to server.',
      );
    } finally {
      setLoading(false);
    }
  };

  // ======================================
  // GOOGLE LOGIN
  // ======================================

  const handleGoogleLogin = () => {
    console.log('Google Login pressed');
  };

  // ======================================
  // APPLE LOGIN
  // ======================================

  const handleAppleLogin = () => {
    console.log('Apple Login pressed');
  };

  // ======================================
  // UI
  // ======================================

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">

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
            Welcome back
          </Text>

          <Text style={styles.subtitle}>
            Log in to continue shopping fresh
          </Text>

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
            onPress={() =>
              setShowPassword(!showPassword)
            }
            hitSlop={{
              top: 10,
              bottom: 10,
              left: 10,
              right: 10,
            }}>

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

        {/* ================= FORGOT PASSWORD ================= */}

        <TouchableOpacity
          style={styles.forgotWrap}
          onPress={() =>
            navigation.navigate('ForgotPassword')
          }>

          <Text style={styles.forgotText}>
            Forgot password?
          </Text>

        </TouchableOpacity>

        {/* ================= LOGIN BUTTON ================= */}

        <TouchableOpacity
          style={[
            styles.loginButton,
            loading && styles.disabledButton,
          ]}
          onPress={handleLogin}
          disabled={loading}>

          {loading ? (
            <ActivityIndicator
              size="small"
              color={Colors.textInverse}
            />
          ) : (
            <Text style={styles.loginButtonText}>
              Log In
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
          onPress={handleGoogleLogin}>

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
          onPress={handleAppleLogin}>

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

        {/* ================= SIGN UP ================= */}

        <View style={styles.footer}>

          <Text style={styles.footerText}>
            Don't have an account?{' '}
          </Text>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Signup')
            }>

            <Text style={styles.footerLink}>
              Sign up
            </Text>

          </TouchableOpacity>

        </View>

      </ScrollView>

    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

// ======================================================
// STYLES
// ======================================================

const styles = StyleSheet.create({

  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  container: {
    flexGrow: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xxl,
    paddingBottom: Spacing.xl,
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

  forgotWrap: {
    alignSelf: 'flex-end',
    marginBottom: Spacing.lg,
  },

  forgotText: {
    ...Typography.bodyBold,
    color: Colors.primary,
    fontSize: 13,
  },

  loginButton: {
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

  loginButtonText: {
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