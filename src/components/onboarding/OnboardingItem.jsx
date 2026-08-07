import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  Colors,
  Spacing,
  Typography,
} from '../../theme';

const OnboardingItem = ({item}) => {
  const {width} = useWindowDimensions();

  return (
    <View style={[styles.container, {width}]}>
      {item.image ? (
        <View style={styles.illustrationWrap}>
          <Image
            source={item.image}
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>
      ) : (
        <View style={styles.illustrationWrap}>
          <View style={styles.iconCircle}>
            <Ionicons
              name={item.icon}
              size={90}
              color={Colors.primary}
            />
          </View>
        </View>
      )}

      <Text style={styles.title}>{item.title}</Text>

      <Text style={styles.description}>
        {item.description}
      </Text>
    </View>
  );
};

export default OnboardingItem;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
  },

  illustrationWrap: {
    height: 260,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },

  illustration: {
    width: '100%',
    height: '100%',
  },

  iconCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    ...Typography.h1,
    color: Colors.primary,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },

  description: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: Spacing.md,
  },
});