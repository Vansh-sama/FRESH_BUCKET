import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>🛒</Text>
        </View>

        <Text style={styles.title}>Fresh Bucket</Text>

        <Text style={styles.subtitle}>
          Fresh Groceries Delivered{'\n'}At Your Doorstep
        </Text>
      </View>

      {/* Card */}
      <View style={styles.card}>
        <Text style={styles.welcome}>Welcome Back 👋</Text>

        {/* Email */}
        <Text style={styles.label}>Email Address</Text>

        <View style={styles.inputContainer}>
          <Ionicons
            name="mail-outline"
            size={22}
            color="#2E7D32"
          />

          <TextInput
            placeholder="Enter your email"
            placeholderTextColor="#94A3B8"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Password */}

        <Text style={styles.label}>Password</Text>

        <View style={styles.inputContainer}>
          <Ionicons
            name="lock-closed-outline"
            size={22}
            color="#2E7D32"
          />

          <TextInput
            placeholder="Enter your password"
            placeholderTextColor="#94A3B8"
            secureTextEntry={secure}
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            onPress={() => setSecure(!secure)}>
            <Ionicons
              name={
                secure
                  ? 'eye-off-outline'
                  : 'eye-outline'
              }
              size={22}
              color="#64748B"
            />
          </TouchableOpacity>
        </View>

        {/* Forgot */}

        <TouchableOpacity>
          <Text style={styles.forgot}>
            Forgot Password?
          </Text>
        </TouchableOpacity>

        {/* Login */}

        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        {/* OR */}

        <View style={styles.orContainer}>
          <View style={styles.line} />

          <Text style={styles.or}>OR</Text>

          <View style={styles.line} />
        </View>

        {/* Google */}

        <TouchableOpacity style={styles.googleBtn}>
          <Ionicons
            name="logo-google"
            size={22}
            color="#EA4335"
          />

          <Text style={styles.googleText}>
            Continue with Google
          </Text>
        </TouchableOpacity>

        {/* Signup */}

        <View style={styles.bottomRow}>
          <Text style={styles.bottomText}>
            Don't have an account?
          </Text>

          <TouchableOpacity>
            <Text style={styles.signup}>
              {' '}
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F7F3',
  },

  header: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 25,
  },

  logoContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#2E7D32',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
  },

  logo: {
    fontSize: 42,
  },

  title: {
    marginTop: 18,
    fontSize: 34,
    fontWeight: 'bold',
    color: '#2E7D32',
  },

  subtitle: {
    marginTop: 8,
    textAlign: 'center',
    color: '#64748B',
    fontSize: 16,
    lineHeight: 24,
  },

  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingHorizontal: 25,
    paddingTop: 35,
    elevation: 8,
  },

  welcome: {
    fontSize: 28,
    fontWeight: '700',
    color: '#263238',
    marginBottom: 30,
  },

  label: {
    color: '#374151',
    fontWeight: '600',
    marginBottom: 8,
    fontSize: 15,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 58,
    backgroundColor: '#F1F5F9',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 15,
    marginBottom: 20,
  },

  input: {
    flex: 1,
    marginLeft: 12,
    color: '#263238',
    fontSize: 16,
  },

  forgot: {
    alignSelf: 'flex-end',
    color: '#2E7D32',
    fontWeight: '600',
    marginBottom: 30,
  },

  loginBtn: {
    height: 58,
    backgroundColor: '#2E7D32',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
  },

  loginText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },

  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 28,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#D1D5DB',
  },

  or: {
    marginHorizontal: 12,
    color: '#64748B',
    fontWeight: '600',
  },

  googleBtn: {
    height: 58,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  googleText: {
    marginLeft: 10,
    color: '#263238',
    fontWeight: '600',
    fontSize: 15,
  },

  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 35,
  },

  bottomText: {
    color: '#64748B',
    fontSize: 15,
  },

  signup: {
    color: '#FF8F00',
    fontWeight: '700',
    fontSize: 15,
  },
});