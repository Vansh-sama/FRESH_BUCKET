import React from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';

import Ionicons from '@react-native-vector-icons/ionicons/static';

import {
  Colors,
  Typography,
  Spacing,
  Radius,
} from '../../theme';

const {width} = Dimensions.get('window');

const OnboardingItem = ({item}) => {
  return (
    <View style={styles.container}>

      {/* IMAGE / ICON */}

      <View style={styles.imageContainer}>

        {item.image ? (
          <Image
            source={item.image}
            style={styles.image}
            resizeMode="contain"
          />
        ) : (
          <Ionicons
            name={item.icon || 'basket-outline'}
            size={100}
            color={Colors.primary}
          />
        )}

      </View>

      {/* TEXT */}

      <View style={styles.textContainer}>

        <Text style={styles.title}>
          {item.title}
        </Text>

        <Text style={styles.description}>
          {item.description}
        </Text>

      </View>

    </View>
  );
};

export default OnboardingItem;

const styles = StyleSheet.create({
  container: {
    width,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
  },

  imageContainer: {
    width: width * 0.78,
    height: width * 0.78,

    borderRadius: Radius.xxl,

    backgroundColor: '#E8F5E9',

    justifyContent: 'center',
    alignItems: 'center',

    marginBottom: Spacing.xxl,
  },

  image: {
    width: '85%',
    height: '85%',
  },

  textContainer: {
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
  },

  title: {
    ...Typography.h2,

    fontWeight: '800',

    color: Colors.text,

    textAlign: 'center',
  },

  description: {
    ...Typography.body,

    color: Colors.textSecondary,

    textAlign: 'center',

    lineHeight: 24,

    marginTop: Spacing.md,
  },
});