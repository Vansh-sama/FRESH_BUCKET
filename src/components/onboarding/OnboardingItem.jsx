import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const OnboardingItem = ({item}) => {
  const {width, height} = useWindowDimensions();

  return (
    <View style={[styles.container, {width, height}]}>
      {/* Top Illustration Section */}
      <View style={styles.imageContainer}>
        {/* Decorative Background */}
        <View style={styles.bigCircle} />
        <View style={styles.smallCircleLeft} />
        <View style={styles.smallCircleRight} />

        <Image
          source={item.image}
          resizeMode="contain"
          style={styles.image}
        />

        {/* Brand icon badge — reuse this icon later on the matching app screen */}
        <View style={styles.iconBadge}>
          <Ionicons name={item.icon} size={22} color="#2E7D32" />
        </View>
      </View>

      {/* Bottom Content */}
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>

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
    flex: 1,
    backgroundColor: '#F8F7F3',
  },

  imageContainer: {
    flex: 0.58,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },

  image: {
    width: '92%',
    height: '92%',
    zIndex: 5,
  },

  iconBadge: {
    position: 'absolute',
    top: 40,
    left: 28,
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 6,

    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 4},
    elevation: 6,
  },

  content: {
    flex: 0.42,
    backgroundColor: '#FFFFFF',

    borderTopLeftRadius: 42,
    borderTopRightRadius: 42,

    alignItems: 'center',

    paddingHorizontal: 32,
    paddingTop: 28,

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: -5,
    },

    elevation: 12,
  },

  title: {
    fontSize: 25,
    fontWeight: '800',
    color: '#2E7D32',
    textAlign: 'center',
    lineHeight: 34,
  },

  description: {
    marginTop: 18,
    fontSize: 18,
    color: '#5C6B60',
    lineHeight: 29,
    textAlign: 'center',
    paddingHorizontal: 12,
  },

  bigCircle: {
    position: 'absolute',
    width: 360,
    height: 360,
    borderRadius: 180,
    backgroundColor: 'rgba(46, 125, 50, 0.07)',
    top: -60,
    right: -80,
  },

  smallCircleLeft: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(255, 179, 0, 0.08)',
    left: -70,
    top: 110,
  },

  smallCircleRight: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255, 107, 53, 0.08)',
    bottom: 60,
    right: 20,
  },
});