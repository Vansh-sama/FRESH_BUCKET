import React from 'react';

import {
  View,
  StyleSheet,
} from 'react-native';

import {Colors} from '../../theme';

const Pagination = ({
  count,
  activeIndex,
}) => {
  return (
    <View style={styles.container}>

      {Array.from({length: count}).map(
        (_, index) => (
          <View
            key={index}
            style={[
              styles.dot,

              index === activeIndex &&
                styles.activeDot,
            ]}
          />
        ),
      )}

    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({

  container: {
    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'center',

    height: 24,

    gap: 8,
  },

  dot: {
    width: 7,

    height: 7,

    borderRadius: 3.5,

    backgroundColor: '#D5DCE0',
  },

  activeDot: {
    backgroundColor: Colors.primary,
  },

});