import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import Ionicons from '@react-native-vector-icons/ionicons';

import {Colors, Typography, Radius}from '../../theme';

const CategoryCard = ({item, onPress}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}>

      <View style={styles.imageContainer}>

        {/* Category data shape is {id, label, description, icon,
            image?} per CategoriesScreen — this was reading item.name
            (always undefined) instead of item.label, and had no
            fallback for categories that only have an icon. */}
        {item.image ? (
          <Image
            source={item.image}
            style={styles.image}
            resizeMode="contain"
          />
        ) : (
          <Ionicons
            name={item.icon}
            size={30}
            color={Colors.primary}
          />
        )}

      </View>

      <Text style={styles.name} numberOfLines={1}>
        {item.label}
      </Text>

    </TouchableOpacity>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  container: {
    width: 102,
    height: 117,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E1E7E3',
    alignItems: 'center',
    paddingTop: 8,
    marginRight: 10,
    elevation: 1,
  },

  imageContainer: {
    height: 69,
    width: 85,
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    width: 76,
    height: 65,
  },

  name: {
    ...Typography.bodySmall,
    fontSize: 12,
    fontWeight: '700',
    color: Colors.text,
    textAlign: 'center',
    lineHeight: 15,
    marginTop: 3,
    paddingHorizontal: 4,
  },
});