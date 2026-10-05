import React, {useMemo, useState} from 'react';

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

import Ionicons from '@react-native-vector-icons/ionicons';

import Header from '../../components/home/Header';
import SearchBar from '../../components/home/SearchBar';
import LocationCard from '../../components/home/LocationCard';
import CategoryCard from '../../components/home/CategoryCard';
import ProductRow from '../../components/home/ProductRow';
import OfferCard from '../../components/home/OfferCard';
import DrawerMenu from '../../navigation/DrawerMenu.jsx';

import categories from '../../data/categories';
import products from '../../data/products';

import {useCart} from '../../context/CartContext';

import {
  Colors,
  Typography,
  Spacing,
  Radius,
  Shadows,
}from '../../theme';


const HomeScreen = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [drawerVisible, setDrawerVisible] = useState(false);

  const {addToCart} = useCart();


  /* ───────────────── SEARCH ───────────────── */

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return products;
    }

    return products.filter(product =>
      product.name?.toLowerCase().includes(query),
    );
  }, [search]);


  /* ───────────────── PRODUCT ACTIONS ───────────────── */

  const handleProductPress = product => {
    navigation.navigate('ProductDetail', {
      product,
    });
  };


  const handleAddProduct = product => {
    addToCart(product);
  };


  /* ───────────────── CATEGORY ACTION ───────────────── */

  const handleCategoryPress = category => {
    navigation.navigate('ProductListing', {
      category,
    });
  };


  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={['top', 'left', 'right']}>

      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.background}
      />


      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}>


        {/* ═══════════════════════════════════════
            HEADER
        ═══════════════════════════════════════ */}

        <Header
          onMenuPress={() => setDrawerVisible(true)}
          onNotificationPress={() => {}}
        />


        {/* ═══════════════════════════════════════
            LOCATION
        ═══════════════════════════════════════ */}

        <LocationCard />


        {/* ═══════════════════════════════════════
            SEARCH
        ═══════════════════════════════════════ */}

        <View style={styles.searchWrapper}>

          <SearchBar
            value={search}
            onChangeText={setSearch}
          />

        </View>


        {/* ═══════════════════════════════════════
            SEARCH RESULT STATE
        ═══════════════════════════════════════ */}

        {search.trim().length > 0 ? (

          <View style={styles.searchResultHeader}>

            <View>

              <Text style={styles.searchResultTitle}>
                Search results
              </Text>

              <Text style={styles.searchResultSubtitle}>
                {filteredProducts.length}{' '}
                {filteredProducts.length === 1
                  ? 'product'
                  : 'products'}{' '}
                found
              </Text>

            </View>


            {search.length > 0 && (

              <TouchableOpacity
                style={styles.clearSearchButton}
                activeOpacity={0.75}
                onPress={() => setSearch('')}>

                <Ionicons
                  name="close"
                  size={17}
                  color={Colors.textSecondary}
                />

                <Text style={styles.clearSearchText}>
                  Clear
                </Text>

              </TouchableOpacity>

            )}

          </View>

        ) : null}


        {/* ═══════════════════════════════════════
            PROMOTIONAL OFFER
        ═══════════════════════════════════════ */}

        {!search.trim() && (

          <OfferCard
            title="Fresh deals for you"
            subtitle="Save more on your everyday groceries."
            discount="20% OFF"
            buttonText="Shop Now"
            icon="basket-outline"
            onPress={() =>
              navigation.navigate('Categories')
            }
          />

        )}


        {/* ═══════════════════════════════════════
            CATEGORIES
        ═══════════════════════════════════════ */}

        {!search.trim() && (

          <>

            <View style={styles.sectionHeader}>

              <View>

                <Text style={styles.sectionTitle}>
                  Shop by Category
                </Text>

                <Text style={styles.sectionSubtitle}>
                  Find what you need quickly
                </Text>

              </View>


              <TouchableOpacity
                style={styles.seeAllButton}
                activeOpacity={0.75}
                onPress={() =>
                  navigation.navigate('Categories')
                }>

                <Text style={styles.seeAllText}>
                  See all
                </Text>

                <Ionicons
                  name="chevron-forward"
                  size={15}
                  color={Colors.primary}
                />

              </TouchableOpacity>

            </View>


            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoryList}>

              {categories.slice(0, 5).map(item => (

                <CategoryCard
                  key={item.id}
                  item={item}
                  onPress={() =>
                    handleCategoryPress(item)
                  }
                />

              ))}

            </ScrollView>

          </>

        )}


        {/* ═══════════════════════════════════════
            SEARCH RESULTS
        ═══════════════════════════════════════ */}

        {search.trim() ? (

          filteredProducts.length > 0 ? (

            <View style={styles.searchProducts}>

              <ProductRow
                products={filteredProducts}
                onProductPress={handleProductPress}
                onAddPress={handleAddProduct}
              />

            </View>

          ) : (

            <View style={styles.emptySearch}>

              <View style={styles.emptySearchIcon}>

                <Ionicons
                  name="search-outline"
                  size={30}
                  color={Colors.primary}
                />

              </View>


              <Text style={styles.emptySearchTitle}>
                No products found
              </Text>


              <Text style={styles.emptySearchText}>
                We couldn't find anything matching "{search}".
              </Text>


              <TouchableOpacity
                style={styles.browseButton}
                activeOpacity={0.85}
                onPress={() => setSearch('')}>

                <Text style={styles.browseButtonText}>
                  Browse groceries
                </Text>

              </TouchableOpacity>

            </View>

          )

        ) : (

          /* ═══════════════════════════════════════
             NORMAL HOME CONTENT
          ═══════════════════════════════════════ */

          <>

            {/* FEATURED PRODUCTS */}

            <View style={styles.sectionHeader}>

              <View>

                <Text style={styles.sectionTitle}>
                  Featured Products
                </Text>

                <Text style={styles.sectionSubtitle}>
                  Fresh picks for your basket
                </Text>

              </View>


              <TouchableOpacity
                style={styles.seeAllButton}
                activeOpacity={0.75}
                onPress={() =>
                  navigation.navigate('Categories')
                }>

                <Text style={styles.seeAllText}>
                  See all
                </Text>

                <Ionicons
                  name="chevron-forward"
                  size={15}
                  color={Colors.primary}
                />

              </TouchableOpacity>

            </View>


            <ProductRow
              products={filteredProducts.slice(0, 8)}
              onProductPress={handleProductPress}
              onAddPress={handleAddProduct}
            />


            {/* QUICK BENEFITS */}

            <View style={styles.benefitsCard}>

              <View style={styles.benefitItem}>

                <View style={styles.benefitIcon}>

                  <Ionicons
                    name="leaf-outline"
                    size={19}
                    color={Colors.primary}
                  />

                </View>


                <View style={styles.benefitContent}>

                  <Text style={styles.benefitTitle}>
                    Fresh quality
                  </Text>

                  <Text style={styles.benefitText}>
                    Carefully selected groceries
                  </Text>

                </View>

              </View>


              <View style={styles.benefitDivider} />


              <View style={styles.benefitItem}>

                <View style={styles.benefitIcon}>

                  <Ionicons
                    name="bicycle-outline"
                    size={19}
                    color={Colors.primary}
                  />

                </View>


                <View style={styles.benefitContent}>

                  <Text style={styles.benefitTitle}>
                    Easy delivery
                  </Text>

                  <Text style={styles.benefitText}>
                    Groceries at your doorstep
                  </Text>

                </View>

              </View>


              <View style={styles.benefitDivider} />


              <View style={styles.benefitItem}>

                <View style={styles.benefitIcon}>

                  <Ionicons
                    name="shield-checkmark-outline"
                    size={19}
                    color={Colors.primary}
                  />

                </View>


                <View style={styles.benefitContent}>

                  <Text style={styles.benefitTitle}>
                    Simple shopping
                  </Text>

                  <Text style={styles.benefitText}>
                    Easy and convenient ordering
                  </Text>

                </View>

              </View>

            </View>


            {/* BOTTOM OFFER */}

            <OfferCard
              title="Complete your basket"
              subtitle="Stock up on your everyday essentials."
              discount="FRESH PICKS"
              buttonText="Explore"
              icon="cart-outline"
              onPress={() =>
                navigation.navigate('Categories')
              }
            />

          </>

        )}


        {/* BOTTOM SPACE */}

        <View style={styles.bottomSpace} />

      </ScrollView>


      {/* ═══════════════════════════════════════
          DRAWER
      ═══════════════════════════════════════ */}

      <DrawerMenu
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        navigation={navigation}
      />

    </SafeAreaView>
  );
};


export default HomeScreen;


/* ═══════════════════════════════════════════
   STYLES
═══════════════════════════════════════════ */

const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },


  content: {
    paddingHorizontal: Spacing.screenHorizontal,
    paddingBottom: 20,
  },


  /* SEARCH */

  searchWrapper: {
    marginTop: 14,
  },


  searchResultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 23,
    marginBottom: 12,
  },


  searchResultTitle: {
    fontSize: 19,
    fontWeight: '900',
    color: Colors.text,
  },


  searchResultSubtitle: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 3,
  },


  clearSearchButton: {
    height: 34,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 11,
    borderRadius: Radius.pill,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },


  clearSearchText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textSecondary,
    marginLeft: 4,
  },


  /* SECTION HEADER */

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: 27,
    marginBottom: 13,
  },


  sectionTitle: {
    fontSize: 19,
    lineHeight: 24,
    fontWeight: '900',
    color: Colors.text,
  },


  sectionSubtitle: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 3,
  },


  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingLeft: 7,
  },


  seeAllText: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.primary,
    marginRight: 2,
  },


  /* CATEGORIES */

  categoryList: {
    paddingRight: 10,
  },


  /* SEARCH PRODUCTS */

  searchProducts: {
    marginTop: 10,
  },


  /* EMPTY SEARCH */

  emptySearch: {
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.xl,
    paddingHorizontal: 25,
    paddingVertical: 38,
    marginTop: 20,
  },


  emptySearchIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primarySoft,
    marginBottom: 15,
  },


  emptySearchTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: Colors.text,
  },


  emptySearchText: {
    fontSize: 12,
    lineHeight: 18,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 6,
    maxWidth: 270,
  },


  browseButton: {
    height: 42,
    paddingHorizontal: 18,
    borderRadius: Radius.pill,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 17,
  },


  browseButtonText: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.white,
  },


  /* BENEFITS */

  benefitsCard: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.xl,
    paddingHorizontal: 14,
    paddingVertical: 5,
    marginTop: 27,
    ...Shadows.small,
  },


  benefitItem: {
    minHeight: 58,
    flexDirection: 'row',
    alignItems: 'center',
  },


  benefitIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primarySoft,
  },


  benefitContent: {
    flex: 1,
    marginLeft: 11,
  },


  benefitTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.text,
  },


  benefitText: {
    fontSize: 10.5,
    color: Colors.textSecondary,
    marginTop: 2,
  },


  benefitDivider: {
    height: 1,
    backgroundColor: Colors.divider,
    marginLeft: 49,
  },


  /* BOTTOM */

  bottomSpace: {
    height: 35,
  },

});