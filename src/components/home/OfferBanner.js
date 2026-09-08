import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';

import Ionicons from '@react-native-vector-icons/ionicons';

import {Colors, Typography, Radius} from '../../theme';

const OfferBanner = () => {
  return (
    <View style={styles.container}>

      <View style={styles.left}>

        <Text style={styles.title}>
          Fresh
        </Text>

        <Text style={styles.title}>
          Groceries
        </Text>

        <Text style={styles.subtitle}>
          Delivered to Your Doorstep
        </Text>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}>

          <Text style={styles.buttonText}>
            Shop Now
          </Text>

          <Ionicons
            name="arrow-forward"
            size={17}
            color={Colors.white}
          />

        </TouchableOpacity>

      </View>

      <Image
        source={require('../../assets/images/onboarding/grocery.png')}
        style={styles.image}
        resizeMode="contain"
      />

    </View>
  );
};

export default OfferBanner;

const styles = StyleSheet.create({
  container: {
    height: 200,
    marginTop: 16,
    borderRadius: 20,
    backgroundColor: '#D6F5D5',
    overflow: 'hidden',
    flexDirection: 'row',
  },

  left: {
    paddingLeft: 28,
    paddingTop: 27,
    width: '52%',
    zIndex: 2,
  },

  title: {
    fontSize: 31,
    lineHeight: 31,
    fontWeight: '900',
    color: '#0A4930',
  },

  subtitle: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: '700',
    color: '#0A4930',
  },

  button: {
    marginTop: 16,
    height: 40,
    paddingHorizontal: 20,
    borderRadius: 22,
    backgroundColor: Colors.primary,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  buttonText: {
    ...Typography.button,
    color: Colors.white,
    fontSize: 14,
  },

  image: {
    position: 'absolute',
    right: -12,
    bottom: -6,
    width: 235,
    height: 190,
  },
});