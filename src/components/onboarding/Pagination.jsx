import React from 'react';

import {
  View,
  StyleSheet,
} from 'react-native';

import {
  Colors,
  Spacing,
  Radius,
} from '../../theme';

const Pagination = ({
  count,
  activeIndex,
}) => {
  return (
    <View style={styles.container}>

      {Array.from({length: count}).map((_, index) => (

        <View
          key={index}
          style={[
            styles.dot,
            index === activeIndex
              ? styles.activeDot
              : styles.inactiveDot,
          ]}
        />

      ))}

    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',

    justifyContent: 'center',
    alignItems: 'center',

    marginBottom: Spacing.lg,
  },

  dot: {
    height: 7,

    borderRadius: Radius.round,

    marginHorizontal: 4,
  },

  activeDot: {
    width: 24,

    backgroundColor: Colors.primary,
  },

  inactiveDot: {
    width: 7,

    backgroundColor: Colors.border,
  },
});