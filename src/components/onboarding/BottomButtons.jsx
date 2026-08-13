import React from 'react';

import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  Colors,
  Radius,
  Spacing,
  Sizes,
  Typography,
  Shadows,
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
          name="arrow-forward"
          size={Sizes.iconSmall}
          color={Colors.white}
        />

      </TouchableOpacity>

    </View>
  );
};

export default BottomButtons;

const styles = StyleSheet.create({

  container: {
    paddingHorizontal: Spacing.xs,

    paddingBottom: Spacing.xs,
  },

  button: {
    height: Sizes.buttonHeight,

    width: '100%',

    borderRadius: Radius.pill,

    backgroundColor: Colors.primary,

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'center',

    ...Shadows.medium,

    shadowColor: Colors.primary,
  },

  buttonText: {
    ...Typography.button,

    color: Colors.white,

    marginRight: Spacing.sm,
  },

});