import React, {useEffect, useRef} from 'react';
import {
  View,
  Animated,
  StyleSheet,
} from 'react-native';

import {Colors, Spacing, Radius} from '../../theme';

const PaginationDot = ({active}) => {
  const scale = useRef(new Animated.Value(active ? 1 : 0.8)).current;
  const opacity = useRef(new Animated.Value(active ? 1 : 0.55)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: active ? 1 : 0.8,
        friction: 7,
        tension: 60,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: active ? 1 : 0.55,
        duration: 220,
        useNativeDriver: true,
      }),
    ]).start();
  }, [active, opacity, scale]);

  return (
    <Animated.View
      style={[
        styles.dot,
        {
          width: active ? 26 : 8,
          opacity,
          transform: [{scale}],
        },
      ]}
    />
  );
};

const Pagination = ({count = 3, activeIndex = 0}) => {
  return (
    <View style={styles.container}>
      {Array.from({length: count}).map((_, index) => (
        <PaginationDot
          key={index}
          active={index === activeIndex}
        />
      ))}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.lg,
  },

  dot: {
    height: 8,
    borderRadius: Radius.pill,
    backgroundColor: Colors.primary,
    marginHorizontal: 4,
  },
});