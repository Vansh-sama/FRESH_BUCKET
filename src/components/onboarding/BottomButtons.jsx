import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

const BottomButtons = ({isLastSlide, onPress}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.button}>

      <Text style={styles.text}>
        {isLastSlide ? 'Get Started' : 'Next'}
      </Text>

      <View style={styles.iconContainer}>
        <Ionicons
          name="arrow-forward"
          size={22}
          color="#FFFFFF"
        />
      </View>

    </TouchableOpacity>
  );
};

export default BottomButtons;

const styles = StyleSheet.create({
  button: {
    height: 62,

    marginHorizontal: 24,
    marginBottom: 30,

    backgroundColor: '#2E7D32',

    borderRadius: 32,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#2E7D32',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.28,
    shadowRadius: 18,

    elevation: 10,
  },

  text: {
    color: '#FFFFFF',

    fontSize: 18,

    fontWeight: '700',

    letterSpacing: 0.3,
  },

  iconContainer: {
    position: 'absolute',

    right: 20,

    width: 36,
    height: 36,

    borderRadius: 18,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'rgba(255,255,255,0.18)',
  },
});