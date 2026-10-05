import React from 'react';

import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
} from 'react-native';

import Ionicons from '@react-native-vector-icons/ionicons';

import {
  Colors,
  Typography,
  Radius,
  Shadows,
}from '../../theme';


const BottomButtons = ({
  isLastSlide,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={0.88}
      onPress={onPress}>

      <Text style={styles.buttonText}>
        {isLastSlide ? 'Get Started' : 'Continue'}
      </Text>

      <View style={styles.iconCircle}>

        <Ionicons
          name="arrow-forward"
          size={18}
          color={Colors.primary}
        />

      </View>

    </TouchableOpacity>
  );
};


export default BottomButtons;


const styles = StyleSheet.create({

  button: {
    width: '100%',

    height: 56,

    borderRadius: Radius.pill,

    backgroundColor: Colors.primary,

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'center',

    paddingLeft: 20,

    paddingRight: 7,

    ...Shadows.medium,

    shadowColor: Colors.primary,

    shadowOpacity: 0.22,

    shadowRadius: 12,

    shadowOffset: {
      width: 0,

      height: 6,
    },

    elevation: 5,
  },

  buttonText: {
    ...Typography.button,

    fontSize: 16,

    fontWeight: '700',

    color: Colors.white,

    marginRight: 12,

    letterSpacing: 0.1,
  },

  iconCircle: {
    width: 42,

    height: 42,

    borderRadius: 21,

    backgroundColor: Colors.white,

    alignItems: 'center',

    justifyContent: 'center',
  },

});