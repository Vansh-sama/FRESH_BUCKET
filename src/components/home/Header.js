import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';

import Ionicons from '@react-native-vector-icons/ionicons';

import {
  Colors,
  Typography,
  Spacing,
} from '../../theme';

const Header = ({onMenuPress, onNotificationPress}) => {
  return (
    <View style={styles.container}>

      <TouchableOpacity
        style={styles.menuButton}
        onPress={onMenuPress}
        activeOpacity={0.7}>
        <Ionicons
          name="menu-outline"
          size={31}
          color={Colors.text}
        />
      </TouchableOpacity>

      <View style={styles.brandContainer}>

        <Image
          source={require('../../assets/images/onboarding/grocery1.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.brand}>
          Fresh Basket
        </Text>

      </View>

      <TouchableOpacity
        style={styles.notificationButton}
        onPress={onNotificationPress}
        activeOpacity={0.7}>

        <Ionicons
          name="notifications-outline"
          size={28}
          color={Colors.primary}
        />

        <View style={styles.notificationDot} />

      </TouchableOpacity>

    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 68,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  menuButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
  },

  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 2,
  },

  logo: {
    width: 48,
    height: 48,
    marginRight: 8,
  },

  brand: {
    ...Typography.h2,
    fontSize: 25,
    fontWeight: '800',
    color: Colors.text,
  },

  notificationButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },

  notificationDot: {
    position: 'absolute',
    top: 7,
    right: 7,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF5A45',
  },
});