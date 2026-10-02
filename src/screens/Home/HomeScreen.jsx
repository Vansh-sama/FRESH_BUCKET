import React, {useState, useEffect} from 'react';

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import Ionicons from '@react-native-vector-icons/ionicons';

import Header from '../../components/home/Header';
import SearchBar from '../../components/home/SearchBar';
import LocationCard from '../../components/home/LocationCard';
import OfferBanner from '../../components/home/OfferBanner';
import CategoryCard from '../../components/home/CategoryCard';
import ProductCard from '../../components/home/ProductCard';
//import DrawerMenu from '../../components/navigation/DrawerMenu.jsx';

import {getCategoriesApi, getProductsApi} from '../../services/catalogService';

import {useCart} from '../../context/CartContext';

import {
  Colors,
  Typography,
} from '../../theme';

const HomeScreen = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const [categoryData, productData] = await Promise.all([
          getCategoriesApi(),
          getProductsApi({limit: 50}),
        ]);
        setCategories(categoryData);
        setProducts(productData.products);
      } catch (error) {
        console.log('HOME API ERROR:', error?.response?.data || error?.message);
      }
    };
    load();
  }, []);

  const {addToCart} = useCart();

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>

        <Header
          onMenuPress={() => setDrawerVisible(true)}
        />

        <SearchBar
          value={search}
          onChangeText={setSearch}
        />

        <LocationCard />

        <OfferBanner />

        {/* CATEGORY HEADER */}

        <View style={styles.sectionHeader}>

          <Text style={styles.sectionTitle}>
            Shop by Category
          </Text>

          <TouchableOpacity
            onPress={() => navigation.navigate('Categories')}>

            <View style={styles.seeAll}>
              <Text style={styles.seeAllText}>
                See All
              </Text>

              <Ionicons
                name="chevron-forward"
                size={17}
                color={Colors.primary}
              />
            </View>

          </TouchableOpacity>

        </View>

        {/* CATEGORIES */}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}>

          {categories.slice(0, 4).map(item => (
            <CategoryCard
              key={item.id}
              item={item}
              onPress={() =>
                navigation.navigate('ProductListing', {category: item})
              }
            />
          ))}

        </ScrollView>

        {/* PRODUCT HEADER */}

        <View style={styles.sectionHeader}>

          <Text style={styles.sectionTitle}>
            Featured Products
          </Text>

          <TouchableOpacity
            onPress={() => navigation.navigate('Categories')}>
            <View style={styles.seeAll}>

              <Text style={styles.seeAllText}>
                See All
              </Text>

              <Ionicons
                name="chevron-forward"
                size={17}
                color={Colors.primary}
              />

            </View>
          </TouchableOpacity>

        </View>

        {/* PRODUCTS */}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}>

          {filteredProducts.map(item => (
            <ProductCard
              key={item.id}
              item={item}
              onPress={product =>
                navigation.navigate('ProductDetail', {product})
              }
              onAdd={() => addToCart(item)}
            />
          ))}

        </ScrollView>

        <View style={styles.bottomSpace} />

      </ScrollView>

      <DrawerMenu
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        navigation={navigation}
      />

    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 12,
  },

  sectionTitle: {
    ...Typography.h3,
    fontSize: 20,
    fontWeight: '900',
    color: Colors.text,
  },

  seeAll: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  seeAllText: {
    ...Typography.bodySmall,
    fontWeight: '800',
    color: Colors.primary,
  },

  horizontalList: {
    paddingRight: 10,
  },

  bottomSpace: {
    height: 20,
  },
});