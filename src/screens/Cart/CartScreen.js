import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import Ionicons from '@react-native-vector-icons/ionicons';

import {
  Colors,
  Typography,
  Spacing,
  Radius,
} from '../../theme';

const categories = [
  {
    name: 'Fruits',
    icon: 'nutrition-outline',
  },
  {
    name: 'Vegetables',
    icon: 'leaf-outline',
  },
  {
    name: 'Dairy',
    icon: 'cafe-outline',
  },
  {
    name: 'Bakery',
    icon: 'restaurant-outline',
  },
  {
    name: 'Snacks',
    icon: 'fast-food-outline',
  },
  {
    name: 'Drinks',
    icon: 'water-outline',
  },
  {
    name: 'Household',
    icon: 'home-outline',
  },
  {
    name: 'Daily Needs',
    icon: 'basket-outline',
  },
];

const CategoriesScreen = () => {
  return (
    <View style={styles.container}>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>

        <Text style={styles.title}>
          Categories
        </Text>

        <Text style={styles.subtitle}>
          Shop by category
        </Text>

        <View style={styles.grid}>

          {categories.map(category => (

            <TouchableOpacity
              key={category.name}
              style={styles.card}
              activeOpacity={0.8}>

              <View style={styles.iconContainer}>

                <Ionicons
                  name={category.icon}
                  size={32}
                  color={Colors.primary}
                />

              </View>

              <Text style={styles.cardTitle}>
                {category.name}
              </Text>

              <Ionicons
                name="chevron-forward"
                size={18}
                color={Colors.textLight}
              />

            </TouchableOpacity>

          ))}

        </View>

      </ScrollView>

    </View>
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    padding: Spacing.lg,
    paddingBottom: 30,
  },

  title: {
    ...Typography.h1,
    color: Colors.text,
  },

  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginTop: 4,
    marginBottom: Spacing.xl,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  card: {
    width: '48%',
    minHeight: 145,
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    justifyContent: 'center',
    elevation: 2,
  },

  iconContainer: {
    width: 58,
    height: 58,
    borderRadius: Radius.lg,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },

  cardTitle: {
    ...Typography.bodyBold,
    color: Colors.text,
  },

});