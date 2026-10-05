import React, {useState} from 'react';
import {useDispatch} from 'react-redux';

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
  Image,
} from 'react-native';

import Ionicons from '@react-native-vector-icons/ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';

import {
  Colors,
  Spacing,
  Radius,
  Shadows,
} from '../../theme';

import authService from '../../services/authService';
import {setCredentials} from '../../redux/slice/authSlice';

const SignupScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [focusedField, setFocusedField] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (loading) {
      return;
    }

    setError('');

    if (
      !name.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword
    ) {
      setError('Please fill in all fields');
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      setError('Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setLoading(true);

      const response = await authService.register({
        name: name.trim(),
        email: normalizedEmail,
        password,
      });

      if (!response?.success || !response?.token || !response?.user) {
        setError(
          response?.message || 'Unable to create your account',
         );
        return;
      }

      dispatch(
        setCredentials({
          user: response.user,
          token: response.token,
        }),
      );

      navigation.replace('Main');
    } catch (requestError) {
      console.error('Signup error:', requestError);

      const status = requestError?.response?.status;
      const message = requestError?.response?.data?.message;

      if (status === 409) {
        setError('An account with this email already exists');
      } else if (status === 400) {
        setError(message || 'Please check your information');
      } else if (requestError?.code === 'ECONNABORTED') {
        setError(
          'The server took too long to respond. Please try again.',
        );
      } else if (requestError?.message === 'Network Error') {
        setError(
          'Unable to connect to the server. Please check your connection.',
        );
      } else {
        setError(
          message || 'Something went wrong. Please try again.',
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={styles.safe}
      edges={['top', 'left', 'right', 'bottom']}>

      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.background}
      />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>

        {/* HEADER */}

        <View style={styles.topBar}>

          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.75}
            onPress={() => navigation.goBack()}
            hitSlop={10}>

            <Ionicons
              name="chevron-back"
              size={22}
              color={Colors.text}
            />

          </TouchableOpacity>

          <TouchableOpacity
            style={styles.skipButton}
            activeOpacity={0.8}
            onPress={() => navigation.replace('Main')}>

            <Text style={styles.skipText}>
              Skip
            </Text>

            <Ionicons
              name="chevron-forward"
              size={14}
              color={Colors.primary}
            />

          </TouchableOpacity>

        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.container}>

          {/* BRAND INTRO */}

          <View style={styles.header}>

            <View style={styles.logoContainer}>

              <View style={styles.logoCircle}>

                <Image
                  source={require('../../assets/images/onboarding/grocery1.png')}
                  style={styles.logo}
                  resizeMode="contain"
                />

              </View>

              <View style={styles.logoAccent}>

                <Ionicons
                  name="leaf"
                  size={12}
                  color={Colors.primary}
                />

              </View>

            </View>

            <Text style={styles.eyebrow}>
              FRESH BASKET
            </Text>

            <Text style={styles.title}>
              Let's get started
            </Text>

            <Text style={styles.subtitle}>
              Create your account and start
              shopping for fresh groceries.
            </Text>

          </View>

          {/* FORM */}

          <View style={styles.form}>

            <Text style={styles.sectionTitle}>
              Create your account
            </Text>

            <Text style={styles.sectionSubtitle}>
              Enter your details to continue.
            </Text>

            {/* NAME */}

            <Input
              label="Full name"
              icon="person-outline"
              placeholder="Enter your name"
              value={name}
              focused={focusedField === 'name'}
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField('')}
              onChangeText={text => {
                setName(text);
                setError('');
              }}
              autoCapitalize="words"
              autoCorrect={false}
            />

            {/* EMAIL */}

            <Input
              label="Email address"
              icon="mail-outline"
              placeholder="Enter your email"
              value={email}
              focused={focusedField === 'email'}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField('')}
              onChangeText={text => {
                setEmail(text);
                setError('');
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            {/* PASSWORD */}

            <Input
              label="Password"
              icon="lock-closed-outline"
              placeholder="Create a password"
              value={password}
              focused={focusedField === 'password'}
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField('')}
              onChangeText={text => {
                setPassword(text);
                setError('');
              }}
              secureTextEntry={!showPassword}
              rightIcon={
                showPassword
                  ? 'eye-off-outline'
                  : 'eye-outline'
              }
              onRightPress={() =>
                setShowPassword(value => !value)
              }
            />

            {/* CONFIRM PASSWORD */}

            <Input
              label="Confirm password"
              icon="lock-closed-outline"
              placeholder="Re-enter your password"
              value={confirmPassword}
              focused={focusedField === 'confirmPassword'}
              onFocus={() =>
                setFocusedField('confirmPassword')
              }
              onBlur={() => setFocusedField('')}
              onChangeText={text => {
                setConfirmPassword(text);
                setError('');
              }}
              secureTextEntry={!showConfirmPassword}
              rightIcon={
                showConfirmPassword
                  ? 'eye-off-outline'
                  : 'eye-outline'
              }
              onRightPress={() =>
                setShowConfirmPassword(value => !value)
              }
            />

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
              style={[
                styles.createButton,
                loading && styles.createButtonDisabled,
              ]}
              activeOpacity={0.88}
              onPress={handleSignup}
              disabled={loading}>

              <Text style={styles.createButtonText}>
                {loading
                  ? 'Creating Account...'
                  : 'Create Account'}
              </Text>

              <View style={styles.arrowContainer}>

                <Ionicons
                  name={
                    loading
                      ? 'hourglass-outline'
                      : 'arrow-forward'
                  }
                  size={18}
                  color={Colors.primary}
                />

              </View>

            </TouchableOpacity>

            {/* BROWSE MESSAGE */}

            <View style={styles.browseMessage}>

              <Ionicons
                name="information-circle-outline"
                size={16}
                color={Colors.textLight}
              />

              <Text style={styles.browseText}>
                You can skip this step and browse Fresh Basket.
              </Text>

            </View>

          </View>

          {/* APP BENEFITS */}

          <View style={styles.benefitsCard}>

            <View style={styles.benefitItem}>

              <View style={styles.benefitIcon}>

                <Ionicons
                  name="leaf-outline"
                  size={18}
                  color={Colors.primary}
                />

              </View>

              <View style={styles.benefitTextContainer}>

                <Text style={styles.benefitTitle}>
                  Fresh products
                </Text>

                <Text style={styles.benefitText}>
                  Quality groceries for everyday needs
                </Text>

              </View>

            </View>

            <View style={styles.benefitDivider} />

            <View style={styles.benefitItem}>

              <View style={styles.benefitIcon}>

                <Ionicons
                  name="bicycle-outline"
                  size={18}
                  color={Colors.primary}
                />

              </View>

              <View style={styles.benefitTextContainer}>

                <Text style={styles.benefitTitle}>
                  Easy delivery
                </Text>

                <Text style={styles.benefitText}>
                  Get your essentials at your doorstep
                </Text>

              </View>

            </View>

          </View>

          {/* FOOTER */}

          <View style={styles.footer}>

            <Ionicons
              name="basket-outline"
              size={15}
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

/* ───────────────── INPUT ───────────────── */

const Input = ({
  label,
  icon,
  rightIcon,
  onRightPress,
  focused,
  ...props
}) => {
  return (
    <View style={styles.inputGroup}>

      <Text style={styles.inputLabel}>
        {label}
      </Text>

      <View
        style={[
          styles.inputContainer,
          focused && styles.inputContainerFocused,
        ]}>

        <View
          style={[
            styles.inputIcon,
            focused && styles.inputIconFocused,
          ]}>

          <Ionicons
            name={icon}
            size={18}
            color={
              focused
                ? Colors.primary
                : Colors.textLight
            }
          />

        </View>

        <TextInput
          {...props}
          style={styles.input}
          placeholderTextColor={Colors.textLight}
          selectionColor={Colors.primary}
        />

        {rightIcon ? (
          <TouchableOpacity
            style={styles.passwordButton}
            activeOpacity={0.7}
            onPress={onRightPress}
            hitSlop={8}>

            <Ionicons
              name={rightIcon}
              size={19}
              color={
                focused
                  ? Colors.primary
                  : Colors.textLight
              }
            />

          </TouchableOpacity>
        ) : null}

      </View>

    </View>
  );
};

export default SignupScreen;

/* ───────────────── STYLES ───────────────── */

const styles = StyleSheet.create({

  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  flex: {
    flex: 1,
  },

  /* TOP BAR */

  topBar: {
    height: 58,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  skipButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 14,
    paddingRight: 10,
    paddingVertical: 8,
    borderRadius: Radius.pill,
    backgroundColor: Colors.primarySoft,
    gap: 3,
  },

  skipText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
  },

  /* CONTAINER */

  container: {
    flexGrow: 1,
    paddingHorizontal: Spacing.xxl,
    paddingTop: 4,
    paddingBottom: 28,
  },

  /* HEADER */

  header: {
    alignItems: 'center',
    marginBottom: 27,
  },

  logoContainer: {
    width: 82,
    height: 82,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 13,
  },

  logoCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: Colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(46,125,50,0.10)',
  },

  logo: {
    width: 57,
    height: 57,
  },

  logoAccent: {
    position: 'absolute',
    right: -1,
    bottom: 1,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surface,
    borderWidth: 2,
    borderColor: Colors.background,
  },

  eyebrow: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.2,
    color: Colors.primary,
    marginBottom: 6,
  },

  title: {
    fontSize: 27,
    lineHeight: 33,
    fontWeight: '800',
    color: Colors.text,
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 13,
    lineHeight: 19,
    color: Colors.textSecondary,
    textAlign: 'center',
    maxWidth: 300,
    marginTop: 7,
  },

  /* FORM */

  form: {
    width: '100%',
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.text,
  },

  sectionSubtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 3,
    marginBottom: 16,
  },

  inputGroup: {
    width: '100%',
    marginBottom: 13,
  },

  inputLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 7,
    marginLeft: 2,
  },

  inputContainer: {
    height: 54,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    paddingLeft: 9,
    paddingRight: 10,
  },

  inputContainerFocused: {
    borderColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOpacity: 0.08,
    shadowRadius: 7,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 2,
  },

  inputIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
    marginRight: 9,
  },

  inputIconFocused: {
    backgroundColor: Colors.primarySoft,
  },

  input: {
    flex: 1,
    height: '100%',
    paddingVertical: 0,
    fontSize: 14,
    color: Colors.text,
  },

  passwordButton: {
    width: 34,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* ERROR */

  errorContainer: {
    minHeight: 40,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 11,
    borderRadius: Radius.sm,
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    marginBottom: 5,
  },

  errorText: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
    color: Colors.error,
    marginLeft: 8,
  },

  /* BUTTON */

  createButton: {
    height: 56,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.pill,
    backgroundColor: Colors.primary,
    marginTop: 7,
    paddingLeft: 20,
    paddingRight: 7,
    ...Shadows.medium,
    shadowColor: Colors.primary,
    shadowOpacity: 0.22,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 5,
  },

  createButtonDisabled: {
    opacity: 0.7,
  },

  createButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.white,
    marginRight: 12,
  },

  arrowContainer: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },

  /* BROWSE MESSAGE */

  browseMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 11,
    paddingHorizontal: 8,
  },

  browseText: {
    fontSize: 10.5,
    color: Colors.textLight,
    marginLeft: 5,
    textAlign: 'center',
  },

  /* BENEFITS */

  benefitsCard: {
    width: '100%',
    backgroundColor: Colors.primarySoft,
    borderRadius: Radius.md,
    paddingHorizontal: 13,
    paddingVertical: 12,
    marginTop: 23,
  },

  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  benefitIcon: {
    width: 36,
    height: 36,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surface,
    marginRight: 10,
  },

  benefitTextContainer: {
    flex: 1,
  },

  benefitTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.text,
  },

  benefitText: {
    fontSize: 10.5,
    lineHeight: 15,
    color: Colors.textSecondary,
    marginTop: 2,
  },

  benefitDivider: {
    height: 1,
    backgroundColor: 'rgba(46,125,50,0.10)',
    marginVertical: 10,
    marginLeft: 46,
  },

  /* FOOTER */

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },

  footerText: {
    fontSize: 10.5,
    color: Colors.textSecondary,
    marginLeft: 6,
  },

});