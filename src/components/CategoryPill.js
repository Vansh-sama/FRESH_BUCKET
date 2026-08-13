import React from 'react';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import {Colors, Spacing, Typography} from '../theme';

// Vertical icon-over-label chip, the standard grocery-app category pattern.
// `active` lets Home highlight whichever category the user has selected.
const CategoryPill = ({icon, name, active, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={[styles.iconCircle, active && styles.iconCircleActive]}>
        <Ionicons
          name={icon}
          size={24}
          color={active ? Colors.textInverse : Colors.primary}
        />
      </View>
      <Text style={[styles.label, active && styles.labelActive]}>{name}</Text>
    </TouchableOpacity>
  );
};

export default CategoryPill;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginRight: Spacing.md,
    width: 68,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primarySoft,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  iconCircleActive: {
    backgroundColor: Colors.primary,
  },
  label: {
    ...Typography.caption,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  labelActive: {
    color: Colors.primary,
    fontWeight: '700',
  },
});
