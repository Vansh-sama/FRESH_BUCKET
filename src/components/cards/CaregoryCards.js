import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const CategoryCard = ({item}) => {
  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.iconBox}>
        <Text style={styles.icon}>{item.icon}</Text>
      </View>

      <Text numberOfLines={2} style={styles.title}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  card: {
    width: '23%',
    alignItems: 'center',
    marginBottom: 18,
  },

  iconBox: {
    width: 68,
    height: 68,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  icon: {
    fontSize: 30,
  },

  title: {
    marginTop: 8,
    textAlign: 'center',
    fontSize: 12,
    color: '#263238',
    fontWeight: '600',
  },
});