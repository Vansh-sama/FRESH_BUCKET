import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

const OfferBanner = () => {
  return (
    <View style={styles.banner}>
      <View style={{flex: 1}}>
        <Text style={styles.offer}>🔥 UP TO 50% OFF</Text>

        <Text style={styles.title}>
          Fresh Fruits &
          {'\n'}
          Vegetables
        </Text>

        <Text style={styles.subtitle}>
          Delivered in just 15 minutes
        </Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Shop Now</Text>

          <Ionicons
            name="arrow-forward"
            color="#2E7D32"
            size={18}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.emoji}>🥬</Text>
    </View>
  );
};

export default OfferBanner;

const styles = StyleSheet.create({
  banner: {
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: '#2E7D32',
    borderRadius: 24,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },

  offer: {
    color: '#FFECB3',
    fontSize: 14,
    fontWeight: '700',
  },

  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
  },

  subtitle: {
    color: '#E8F5E9',
    marginTop: 8,
    fontSize: 14,
  },

  button: {
    marginTop: 18,
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-start',
    borderRadius: 25,
    paddingHorizontal: 18,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  buttonText: {
    color: '#2E7D32',
    fontWeight: '700',
    marginRight: 6,
  },

  emoji: {
    fontSize: 80,
    marginLeft: 10,
  },
});