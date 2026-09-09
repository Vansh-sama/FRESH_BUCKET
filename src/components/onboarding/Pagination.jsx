import React, {useEffect, useRef} from 'react';

import {
  View,
  StyleSheet,
  Animated,
} from 'react-native';

import {Colors} from '../../theme';

const Dot = ({active}) => {
  const widthAnim = useRef(new Animated.Value(active ? 20 : 7)).current;

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: active ? 20 : 7,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [active, widthAnim]);

  return (
    <Animated.View
      style={[
        styles.dot,
        {width: widthAnim},
        active && styles.activeDot,
      ]}
    />
  );
};

const Pagination = ({
  count,
  activeIndex,
}) => {
  return (
    <View style={styles.container}>

      {Array.from({length: count}).map((_, index) => (
        <Dot key={index} active={index === activeIndex} />
      ))}

    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  container: {
    height: 24,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    gap: 7,
  },

  dot: {
    height: 7,

    borderRadius: 3.5,

    backgroundColor: '#D5DAD6',
  },

  activeDot: {
    backgroundColor: Colors.primary,
  },
});