import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  Colors,
  Spacing,Radius,
  Typography,
} from '../../theme';

// The pill CTA at the bottom - "Next" mid-flow, "Get Started" (with an
// arrow, matching the reference) on the final slide.
const BottomButtons = ({isLastSlide, onPress}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.9}>
      <Text style={styles.label}>{isLastSlide ? 'Get Started' : 'Next'}</Text>
      <Ionicons
        name="arrow-forward"
        size={18}
        color={Colors.textInverse}
        style={styles.icon}
      />
    </TouchableOpacity>
  );
};

export default BottomButtons;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: Radius.pill,
    height: 56,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.xl,
    marginBottom: Spacing.lg,
  },
  label: {
    ...Typography.h3,
    color: Colors.textInverse,
    marginRight: Spacing.sm,
  },
  icon: {
    marginTop: 1,
  },
});
