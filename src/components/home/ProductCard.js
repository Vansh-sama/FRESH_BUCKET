import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import Ionicons from '@react-native-vector-icons/ionicons';

import {Colors, Typography} from '../../theme';

const ProductCard = ({item, onAdd}) => {
  return (
    <View style={styles.container}>

      <View style={styles.imageContainer}>
        <Image
          source={item.image}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.name} numberOfLines={1}>
        {item.name}
      </Text>

      <Text style={styles.quantity}>
        {item.quantity}
      </Text>

      <View style={styles.bottom}>

        <Text style={styles.price}>
          ₹{item.price}
          <Text style={styles.unit}>
            {' '} /kg
          </Text>
        </Text>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => onAdd?.(item)}
          activeOpacity={0.8}>

          <Ionicons
            name="add"
            size={21}
            color={Colors.white}
          />

        </TouchableOpacity>

      </View>

    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    width: 137,
    height: 178,
    backgroundColor: Colors.surface,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: '#E0E7E2',
    padding: 10,
    marginRight: 12,
  },

  imageContainer: {
    height: 94,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    width: 105,
    height: 90,
  },

  name: {
    ...Typography.bodySmall,
    fontSize: 13,
    fontWeight: '800',
    color: Colors.text,
    marginTop: 3,
  },

  quantity: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: 2,
  },

  bottom: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },

  price: {
    fontSize: 15,
    fontWeight: '900',
    color: Colors.primary,
  },

  unit: {
    fontSize: 11,
    fontWeight: '600',
  },

  addButton: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});