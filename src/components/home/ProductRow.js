import React from 'react';

import {
  View,
  FlatList,
  StyleSheet,
} from 'react-native';

import ProductCard from './ProductCard';

import {
  Spacing,
}from '../../theme';


const ProductRow = ({
  products = [],
  onProductPress,
  onAddPress,
}) => {

  if (!products.length) {
    return null;
  }

  return (
    <View style={styles.container}>

      <FlatList
        data={products}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => String(item.id)}
        contentContainerStyle={styles.list}
        renderItem={({item}) => (
          <ProductCard
            product={item}
            onPress={() => onProductPress?.(item)}
            onAddPress={() => onAddPress?.(item)}
          />
        )}
      />

    </View>
  );
};


export default ProductRow;


const styles = StyleSheet.create({

  container: {
    width: '100%',
  },

  list: {
    paddingRight: Spacing.lg,
  },

});