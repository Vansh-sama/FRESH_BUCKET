import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';

import CategoryCard from './cards/CaregoryCards';
import {categories} from '../data/Category';

const Categories = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Shop by Category
      </Text>

      <FlatList
        data={categories}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <CategoryCard item={item} />
        )}
        numColumns={4}
        scrollEnabled={false}
        columnWrapperStyle={{
          justifyContent: 'space-between',
        }}
      />
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    paddingHorizontal: 20,
  },

  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: '#263238',
    marginBottom: 20,
  },
});