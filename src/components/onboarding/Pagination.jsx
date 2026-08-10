import React, {useRef, useEffect} from 'react';
import {View, StyleSheet, Animated} from 'react-native';

const Dot = ({active}) => {
  const widthAnim = useRef(new Animated.Value(active ? 32 : 10)).current;

  useEffect(() => {
    Animated.spring(widthAnim, {
      toValue: active ? 32 : 10,
      useNativeDriver: false,
      friction: 8,
    }).start();
  }, [active]);

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

const Pagination = ({count, activeIndex}) => {
  return (
    <View style={styles.container}>
      {Array.from({length: count}).map((_, index) => (
        <Dot key={index} active={activeIndex === index} />
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

    marginTop: 30,
    marginBottom: 36,
  },

  dot: {
    height: 10,
    borderRadius: 5,

    backgroundColor: '#D7D7D7',

    marginHorizontal: 6,
  },

  activeDot: {
    backgroundColor: '#2E7D32',
  },
});