import React, {useState} from 'react';

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  Dimensions,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import Ionicons from '@react-native-vector-icons/ionicons';

import categories from '../../data/categories';

import {
  Colors,
  Typography,
} from '../../theme';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SIDEBAR_WIDTH = 110;
const GRID_WIDTH = SCREEN_WIDTH - SIDEBAR_WIDTH;

const CategoriesScreen = ({navigation}) => {
  const [selected, setSelected] = useState('All');
  const [search, setSearch] = useState('');

  const sidebarItems = ['All', ...categories.map(c => c.label)];

  const visibleCategories = categories.filter(item =>
    (selected === 'All' || item.label === selected) &&
    item.label.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>

      {/* HEADER */}

      <View style={styles.header}>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>

          <Ionicons
            name="arrow-back"
            size={22}
            color={Colors.text}
          />

        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Categories
        </Text>

        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => navigation.navigate('Cart')}>

          <Ionicons
            name="cart-outline"
            size={24}
            color={Colors.text}
          />

        </TouchableOpacity>

      </View>

      {/* SEARCH */}

      <View style={styles.searchBox}>

        <Ionicons
          name="search-outline"
          size={22}
          color={Colors.textSecondary}
        />

        <TextInput
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
          placeholder="Search categories..."
          placeholderTextColor={Colors.textLight}
        />

      </View>

      {/* BODY: SIDEBAR + GRID — explicit pixel widths, not flex,
          so the two columns can't fight each other for space. */}

      <View style={styles.body}>

        {/* SIDEBAR */}

        <View style={{width: SIDEBAR_WIDTH}}>

          <FlatList
            data={sidebarItems}
            keyExtractor={item => item}
            contentContainerStyle={styles.sidebarContent}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => {

              const active = selected === item;

              return (
                <TouchableOpacity
                  style={[
                    styles.sidebarItem,
                    active && styles.sidebarItemActive,
                  ]}
                  onPress={() => setSelected(item)}
                  activeOpacity={0.75}>

                  <Text
                    style={[
                      styles.sidebarText,
                      active && styles.sidebarTextActive,
                    ]}
                    numberOfLines={2}>

                    {item === 'All' ? 'All Categories' : item}

                  </Text>

                </TouchableOpacity>
              );
            }}
          />

        </View>

        {/* CATEGORY CARDS */}

        <View style={{width: GRID_WIDTH}}>

          <FlatList
            data={visibleCategories}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.gridContent}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (

              <TouchableOpacity
                style={styles.categoryCard}
                activeOpacity={0.85}
                onPress={() =>
                  navigation.navigate('ProductListing', {category: item})
                }>

                <View style={styles.categoryImageBox}>

                  {item.image ? (
                    <Image
                      source={item.image}
                      style={styles.categoryImage}
                      resizeMode="contain"
                    />
                  ) : (
                    <Ionicons
                      name={item.icon}
                      size={28}
                      color={Colors.primary}
                    />
                  )}

                </View>

                <View style={styles.categoryTextBox}>

                  <Text
                    style={styles.categoryLabel}
                    numberOfLines={1}>

                    {item.label}

                  </Text>

                  <Text
                    style={styles.categoryDescription}
                    numberOfLines={1}>

                    {item.description}

                  </Text>

                </View>

                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color={Colors.textLight}
                />

              </TouchableOpacity>

            )}
          />

        </View>

      </View>

    </SafeAreaView>
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  header: {
    height: 62,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerTitle: {
    ...Typography.h2,
    fontSize: 23,
    fontWeight: '900',
    color: Colors.text,
    flex: 1,
    textAlign: 'center',
  },

  cartButton: {
    width: 42,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
  },

  searchBox: {
    height: 52,
    marginHorizontal: 20,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },

  searchInput: {
    flex: 1,
    height: '100%',
    marginLeft: 10,
    fontSize: 14,
    color: Colors.text,
  },

  body: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 16,
  },

  sidebarContent: {
    paddingVertical: 6,
  },

  sidebarItem: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderLeftWidth: 3,
    borderLeftColor: 'transparent',
  },

  sidebarItemActive: {
    backgroundColor: Colors.background,
    borderLeftColor: Colors.primary,
  },

  sidebarText: {
    ...Typography.caption,
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
    lineHeight: 16,
    flexShrink: 1,
  },

  sidebarTextActive: {
    color: Colors.primary,
    fontWeight: '800',
  },

  gridContent: {
    paddingHorizontal: 14,
    paddingBottom: 14,
  },

  categoryCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },

  categoryImageBox: {
    width: 52,
    height: 52,
    borderRadius: 13,
    backgroundColor: '#F7FAF6',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },

  categoryImage: {
    width: 38,
    height: 38,
  },

  categoryTextBox: {
    flex: 1,
    flexShrink: 1,
    minWidth: 0,
    marginLeft: 12,
    marginRight: 6,
  },

  categoryLabel: {
    ...Typography.body,
    fontSize: 14,
    fontWeight: '800',
    color: Colors.text,
    flexShrink: 1,
  },

  categoryDescription: {
    ...Typography.caption,
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 3,
    flexShrink: 1,
  },
});