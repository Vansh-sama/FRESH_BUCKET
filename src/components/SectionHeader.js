import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Colors, Spacing, Typography} from '../../theme';

// Used above every horizontal list / grid on Home (Categories, Popular
// Products, Deals) so that pattern only has to be built once.
const SectionHeader = ({title, actionLabel = 'See all', onActionPress}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {onActionPress && (
        <TouchableOpacity onPress={onActionPress}>
          <Text style={styles.action}>{actionLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SectionHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  title: {
    ...Typography.h3,
    color: Colors.textPrimary,
  },
  action: {
    ...Typography.bodyBold,
    fontSize: 13,
    color: Colors.primary,
  },
});
