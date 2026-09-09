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
  Image,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors, Spacing, Typography, Radius, Shadows, Sizes} from '../../theme';

const SignupScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = () => {
    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    // NOTE: 'Login' is not a registered route in AppNavigator (only
    // Splash, Onboarding, Signup, Main exist) — this must point at 'Main'.
    navigation.replace('Main');
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.topRow}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} hitSlop={10}>
            <Ionicons name="chevron-back" size={22} color={Colors.text} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.skipButton}
            onPress={() => navigation.replace('Main')}>
            <Text style={styles.skipText}>Skip</Text>
            <Ionicons name="chevron-forward" size={15} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <View style={styles.logoBadge}>
              <Image source={require('../../assets/images/onboarding/grocery1.png')} style={styles.logo} resizeMode="contain" />
            </View>
            <Text style={styles.title}>Welcome to Fresh Basket</Text>
            <Text style={styles.subtitle}>Create your account and get fresh groceries delivered right to your doorstep.</Text>
          </View>

          <View style={styles.formCard}>
            <Input icon="person-outline" placeholder="Full name" value={name} onChangeText={setName} />
            <Input icon="mail-outline" placeholder="Email address" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" autoCorrect={false} />
            <Input icon="lock-closed-outline" placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry={!showPassword} rightIcon={showPassword ? 'eye-off-outline' : 'eye-outline'} onRightPress={() => setShowPassword(v => !v)} />
            <Input icon="lock-closed-outline" placeholder="Confirm password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry={!showConfirmPassword} rightIcon={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'} onRightPress={() => setShowConfirmPassword(v => !v)} />

            {error ? <View style={styles.errorRow}><Ionicons name="alert-circle" size={16} color={Colors.error} /><Text style={styles.errorText}>{error}</Text></View> : null}

            <TouchableOpacity style={styles.createButton} onPress={handleSignup} activeOpacity={0.9}>
              <Text style={styles.createText}>Create Account</Text>
              <Ionicons name="chevron-forward" size={19} color={Colors.white} />
            </TouchableOpacity>
          </View>

          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR CONTINUE WITH</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.socialRow}>
            <TouchableOpacity style={[styles.socialButton, styles.googleButton]}>
              <Ionicons name="logo-google" size={20} color="#4285F4" />
              <Text style={styles.socialText}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.socialButton, styles.appleButton]}>
              <Ionicons name="logo-apple" size={21} color={Colors.white} />
              <Text style={[styles.socialText, styles.appleText]}>Apple</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.comingSoon}>
            <Ionicons name="phone-portrait-outline" size={17} color={Colors.primary} />
            <Text style={styles.comingSoonText}>Phone number + OTP login coming soon</Text>
          </View>
          <View style={styles.tagline}>
            <Ionicons name="leaf-outline" size={15} color={Colors.primary} />
            <Text style={styles.taglineText}>Fresh groceries. Simple shopping.</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const Input = ({icon, rightIcon, onRightPress, ...props}) => (
  <View style={styles.inputWrap}>
    <Ionicons name={icon} size={19} color={Colors.textLight} style={styles.inputIcon} />
    <TextInput {...props} style={styles.input} placeholderTextColor={Colors.textLight} />
    {rightIcon ? <TouchableOpacity onPress={onRightPress} hitSlop={10}><Ionicons name={rightIcon} size={19} color={Colors.textLight} /></TouchableOpacity> : null}
  </View>
);

export default SignupScreen;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background
  },
  flex: {
    flex: 1
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 4
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center'
  },
  skipButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 13,
    paddingVertical: 7,
    borderRadius: Radius.pill,
    backgroundColor: Colors.primarySoft,
    gap: 3
  },
  skipText: {
    ...Typography.bodySmall,
    fontSize: 13,
    color: Colors.primary,
    fontWeight: '700'
  },
  // flexGrow lets content stretch to fill the full scroll area on tall
  // screens instead of clumping in the middle — spacing between sections
  // below is what actually distributes it across the full length, not
  // justifyContent centering.
  container: {
    flexGrow: 1,
    paddingHorizontal: 22,
    paddingTop: 16,
    paddingBottom: 40
  },
  header: {
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 30
  },
  logoBadge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  logo: {
    width: 72,
    height: 72
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.text,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 19,
    color: Colors.textSecondary,
    textAlign: 'center',
    maxWidth: 300,
    marginTop: 8
  },
  formCard: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 0,
    borderWidth: 0
  },
  inputWrap: {
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 14
  },
  inputIcon: {
    marginRight: 10
  },
  input: {
    flex: 1,
    height: '100%',
    paddingVertical: 0,
    fontSize: 15,
    color: Colors.text
  },
  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginVertical: 4
  },
  errorText: {
    ...Typography.caption,
    fontSize: 13,
    color: Colors.error
  },
  createButton: {
    height: 54,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
    marginTop: 6,
    ...Shadows.small,
    shadowColor: Colors.primary
  },
  createText: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.white
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 28
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border
  },
  dividerText: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginHorizontal: 12,
    fontWeight: '600'
  },
  socialRow: {
    flexDirection: 'row',
    gap: 12
  },
  socialButton: {
    flex: 1,
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 9
  },
  googleButton: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border
  },
  appleButton: {
    backgroundColor: Colors.black
  },
  socialText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text
  },
  appleText: {
    color: Colors.white
  },
  comingSoon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 30
  },
  comingSoonText: {
    fontSize: 12,
    color: Colors.textSecondary
  },
  tagline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    marginTop: 16,
    marginBottom: 8
  },
  taglineText: {
    fontSize: 12,
    color: Colors.textSecondary
  },
});