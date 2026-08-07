import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors, Spacing} from '../../theme';

// Purely presentational dot row - takes the total count and which index
// is active, renders nothing else. Reusable anywhere else you paginate
// (e.g. a future promo carousel on Home).
const Pagination = ({count, activeIndex}) => {
  return (
    <View style={styles.row}>
      {Array.from({length: count}).map((_, index) => (
        <View
          key={index}
          style={[styles.dot, index === activeIndex && styles.dotActive]}
        />
      ))}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Spacing.lg,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.border,
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: Colors.primary,
    width: 20,
  },
});
