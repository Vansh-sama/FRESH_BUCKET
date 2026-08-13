import React from 'react';

import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

import Ionicons from '@react-native-vector-icons/ionicons';

import {
  Colors,
  Typography,
  Spacing,
  Radius,
} from '../../theme';

const BottomButtons = ({
  isLastSlide,
  onPress,
}) => {
  return (
    <View style={styles.container}>

      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
        activeOpacity={0.85}>

        <Text style={styles.buttonText}>
          {isLastSlide ? 'Get Started' : 'Next'}
        </Text>

        <Ionicons
          name={
            isLastSlide
              ? 'checkmark'
              : 'arrow-forward'
          }
          size={20}
          color={Colors.white}
        />

      </TouchableOpacity>

    </View>
  );
};

export default BottomButtons;

const styles = StyleSheet.create({

  container: {
    width: '100%',
    marginTop: Spacing.md,
  },

  button: {
    height: 56,

    borderRadius: Radius.lg,

    backgroundColor: Colors.primary,

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'center',

    gap: 8,

    elevation: 4,

    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },

  buttonText: {
    ...Typography.button,
    color: Colors.white,
  },

});