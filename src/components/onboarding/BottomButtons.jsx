import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import Ionicons from '@react-native-vector-icons/ionicons/static';

import {
  Colors,
  Typography,
  Radius,
  Spacing,
} from '../../theme';

const BottomButtons = ({
  isLastSlide,
  onPress,
}) => {
  return (
    <View style={styles.container}>

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.85}
        onPress={onPress}>

        <Text style={styles.buttonText}>
          {isLastSlide
            ? 'Get Started'
            : 'Next'}
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
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.lg,
  },

  button: {
    height: 56,

    borderRadius: Radius.md,

    backgroundColor: Colors.primary,

    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'center',

    elevation: 4,
  },

  buttonText: {
    ...Typography.button,

    color: Colors.white,

    marginRight: Spacing.sm,
  },
});