import React, {useState, useMemo} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import Ionicons from '@react-native-vector-icons/ionicons';

import products from '../../data/products';
import {useCart} from '../../context/CartContext';

import {
  Colors,
  Typography,
}from '../../theme';

const SORT_OPTIONS = [
  {id: 'default', label: 'Recommended'},
  {id: 'price_low', label: 'Price: Low to High'},
  {id: 'price_high', label: 'Price: High to Low'},
  {id: 'name', label: 'Name: A to Z'},
];

// Reached from CategoriesScreen tapping a category card.
const ProductListingScreen = ({navigation, route}) => {
  const category = route?.params?.category;
  const {addToCart} = useCart();

  const [search, setSearch] = useState('');
  const [sortVisible, setSortVisible] = useState(false);
  const [sortBy, setSortBy] = useState('default');

  // products.js doesn't have a category field yet, so this can't do
  // a real category match — it shows the full catalog, filtered only
  // by search, with the category name as context in the header. Once
  // products have a `category` field, swap the filter below for
  // `p.category === category.label`.
  const filtered = useMemo(() => {
    let list = products.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()),
    );

    switch (sortBy) {
      case 'price_low':
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case 'name':
        list = [...list].sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return list;
  }, [search, sortBy]);

  const activeSortLabel =
    SORT_OPTIONS.find(o => o.id === sortBy)?.label ?? 'Sort';

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>

      {/* HEADER */}
      <View style={styles.header}>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.goBack()}
          hitSlop={10}>
          <Ionicons name="arrow-back" size={22} color={Colors.text} />
        </TouchableOpacity>

        <Text style={styles.headerTitle} numberOfLines={1}>
          {category?.label ?? 'All Products'}
        </Text>

        <View style={styles.iconButton} />

      </View>

      {/* SEARCH */}
      <View style={styles.searchBox}>
        <Ionicons name="search-outline" size={19} color={Colors.textSecondary} />
        <TextInput
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
          placeholder="Search products..."
          placeholderTextColor={Colors.textLight}
        />
      </View>

      {/* SORT / FILTER ROW */}
      <View style={styles.toolRow}>

        <TouchableOpacity
          style={styles.toolButton}
          activeOpacity={0.8}
          onPress={() => setSortVisible(true)}>
          <Ionicons name="swap-vertical-outline" size={16} color={Colors.text} />
          <Text style={styles.toolButtonText} numberOfLines={1}>
            {activeSortLabel}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.toolButton}
          activeOpacity={0.8}
          onPress={() =>
            // No real filter attributes in the product data yet
            // (brand, dietary tags, price range, etc.) — being honest
            // that this isn't wired rather than faking a filter that
            // does nothing.
            setSortVisible(false)
          }>
          <Ionicons name="options-outline" size={16} color={Colors.text} />
          <Text style={styles.toolButtonText}>Filter</Text>
        </TouchableOpacity>

      </View>

      {/* GRID */}
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.gridContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={40} color={Colors.textLight} />
            <Text style={styles.emptyText}>No products found</Text>
          </View>
        }
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.85}
            onPress={() =>
              navigation.navigate('ProductDetail', {product: item})
            }>

            <View style={styles.cardImageBox}>
              <Image
                source={item.image}
                style={styles.cardImage}
                resizeMode="contain"
              />
            </View>

            <Text style={styles.cardName} numberOfLines={1}>
              {item.name}
            </Text>

            <Text style={styles.cardPrice}>
              ₹{item.price} <Text style={styles.cardUnit}>/kg</Text>
            </Text>

            <TouchableOpacity
              style={styles.addButton}
              activeOpacity={0.8}
              onPress={() => addToCart(item)}>
              <Ionicons name="add" size={19} color={Colors.white} />
            </TouchableOpacity>

          </TouchableOpacity>
        )}
      />

      {/* SORT MODAL */}
      <Modal
        visible={sortVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setSortVisible(false)}>

        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setSortVisible(false)}>

          <View style={styles.sortSheet}>

            <Text style={styles.sortTitle}>Sort by</Text>

            {SORT_OPTIONS.map(option => {
              const active = sortBy === option.id;

              return (
                <TouchableOpacity
                  key={option.id}
                  style={styles.sortOption}
                  activeOpacity={0.75}
                  onPress={() => {
                    setSortBy(option.id);
                    setSortVisible(false);
                  }}>

                  <Text
                    style={[
                      styles.sortOptionText,
                      active && styles.sortOptionTextActive,
                    ]}>
                    {option.label}
                  </Text>

                  {active && (
                    <Ionicons name="checkmark" size={18} color={Colors.primary} />
                  )}

                </TouchableOpacity>
              );
            })}

          </View>

        </TouchableOpacity>

      </Modal>

    </SafeAreaView>
  );
};

export default ProductListingScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
  },

  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerTitle: {
    ...Typography.h3,
    fontSize: 18,
    fontWeight: '900',
    color: Colors.text,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 8,
  },

  searchBox: {
    height: 48,
    marginHorizontal: 20,
    marginTop: 6,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    gap: 10,
  },

  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 14,
    color: Colors.text,
  },

  toolRow: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 20,
    marginTop: 12,
    marginBottom: 6,
  },

  toolButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    height: 38,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
  },

  toolButtonText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: Colors.text,
    maxWidth: 130,
  },

  gridContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 24,
  },

  row: {
    justifyContent: 'space-between',
    marginBottom: 14,
  },

  card: {
    width: '48%',
    backgroundColor: Colors.surface,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: '#E0E7E2',
    padding: 12,
  },

  cardImageBox: {
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cardImage: {
    width: '80%',
    height: '80%',
  },

  cardName: {
    ...Typography.bodySmall,
    fontSize: 13.5,
    fontWeight: '800',
    color: Colors.text,
    marginTop: 6,
  },

  cardPrice: {
    fontSize: 14,
    fontWeight: '900',
    color: Colors.primary,
    marginTop: 4,
  },

  cardUnit: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.textSecondary,
  },

  addButton: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyState: {
    alignItems: 'center',
    paddingTop: 80,
  },

  emptyText: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    marginTop: 10,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },

  sortSheet: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 28,
  },

  sortTitle: {
    ...Typography.h4,
    fontSize: 16,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 8,
  },

  sortOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: '#EDF0ED',
  },

  sortOptionText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
  },

  sortOptionTextActive: {
    color: Colors.text,
    fontWeight: '800',
  },
});