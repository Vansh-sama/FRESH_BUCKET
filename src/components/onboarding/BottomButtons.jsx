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
  Radius,
  Spacing,
  Sizes,
  Typography,
  Shadows,
} from '../../theme';

const BottomButtons = ({isLastSlide, onPress}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.85}
        onPress={onPress}>

        <Text style={styles.buttonText}>
          {isLastSlide ? 'Get Started' : 'Next'}
        </Text>

        {/* chevron sits in its own chip, not floating loose next to
            the label — closer to Blinkit/Zomato CTA styling */}
        <View style={styles.iconChip}>
          <Ionicons
            name="chevron-forward"
            size={16}
            color={Colors.primary}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default BottomButtons;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: Spacing.xs,
  },

  button: {
    height: 56,
    width: '100%',
    borderRadius: Radius.pill,
    backgroundColor: Colors.primary,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    paddingLeft: 24,
    paddingRight: 6,

    ...Shadows.medium,

    shadowColor: Colors.primary,
    shadowOpacity: 0.24,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 5,
  },

  buttonText: {
    ...Typography.button,
    fontSize: 16,
    color: Colors.white,
    marginRight: 12,
  },

  iconChip: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});