import React from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';

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

      {/* IMAGE */}

      <View style={styles.imageContainer}>

        <View style={styles.imageBackground}>
          <Image
            source={item.image}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

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
    width: '100%',
    alignItems: 'center',
    marginTop: -30,
  },

  imageBackground: {
    width: width * 0.78,
    height: width * 0.78,

    borderRadius: Radius.xxl,

    backgroundColor: Colors.surface,

    justifyContent: 'center',
    alignItems: 'center',

    elevation: 3,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.06,
    shadowRadius: 10,
  },

  image: {
    width: '88%',
    height: '88%',
  },

  textContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: Spacing.xxl,
  },

  title: {
    ...Typography.h2,

    color: Colors.text,

    textAlign: 'center',

    lineHeight: 34,
  },

  description: {
    ...Typography.body,

    color: Colors.textSecondary,

    textAlign: 'center',

    lineHeight: 24,

    marginTop: Spacing.md,

    paddingHorizontal: Spacing.md,
  },

});