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

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>

        {/* =========================
            HEADER
        ========================== */}

        <View style={styles.header}>
          <View>
            <Text style={styles.smallGreeting}>
              Good morning 👋
            </Text>

            <TouchableOpacity
              style={styles.locationRow}
              activeOpacity={0.7}>

              <Ionicons
                name="location"
                size={18}
                color={Colors.primary}
              />

              <Text style={styles.locationText}>
                Your Location
              </Text>

              <Ionicons
                name="chevron-down"
                size={16}
                color={Colors.text}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.notificationButton}
            activeOpacity={0.8}>

            <Ionicons
              name="notifications-outline"
              size={23}
              color={Colors.text}
            />

            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>

        {/* =========================
            SEARCH
        ========================== */}

        <TouchableOpacity
          style={styles.searchBar}
          activeOpacity={0.8}>

          <Ionicons
            name="search-outline"
            size={22}
            color={Colors.textSecondary}
          />

          <Text style={styles.searchPlaceholder}>
            Search groceries, fruits, vegetables...
          </Text>

          <Ionicons
            name="options-outline"
            size={21}
            color={Colors.primary}
          />
        </TouchableOpacity>

        {/* =========================
            OFFER BANNER
        ========================== */}

        <View style={styles.banner}>

          <View style={styles.bannerContent}>

            <Text style={styles.bannerSmall}>
              FRESH DEAL
            </Text>

            <Text style={styles.bannerTitle}>
              Fresh groceries,{'\n'}
              better prices.
            </Text>

            <Text style={styles.bannerDescription}>
              Get up to 30% OFF on your first order
            </Text>

            <TouchableOpacity
              style={styles.shopButton}
              activeOpacity={0.85}>

              <Text style={styles.shopButtonText}>
                Shop Now
              </Text>

              <Ionicons
                name="arrow-forward"
                size={16}
                color={Colors.primaryDark}
              />
            </TouchableOpacity>

          </View>

          <View style={styles.bannerDecoration}>
            <Ionicons
              name="basket-outline"
              size={105}
              color="rgba(255,255,255,0.20)"
            />
          </View>

        </View>

        {/* =========================
            CATEGORIES
        ========================== */}

        <View style={styles.sectionHeader}>

          <Text style={styles.sectionTitle}>
            Categories
          </Text>

          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.seeAll}>
              See all
            </Text>
          </TouchableOpacity>

        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}>

          <Category
            icon="nutrition-outline"
            title="Fruits"
          />

          <Category
            icon="leaf-outline"
            title="Vegetables"
          />

          <Category
            icon="cafe-outline"
            title="Dairy"
          />

          <Category
            icon="fast-food-outline"
            title="Snacks"
          />

          <Category
            icon="water-outline"
            title="Drinks"
          />

          <Category
            icon="basket-outline"
            title="Daily Needs"
          />

        </ScrollView>

        {/* =========================
            POPULAR PRODUCTS
        ========================== */}

        <View style={styles.sectionHeader}>

          <View>
            <Text style={styles.sectionTitle}>
              Popular Products
            </Text>

            <Text style={styles.sectionSubtitle}>
              Fresh picks for you
            </Text>
          </View>

          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.seeAll}>
              See all
            </Text>
          </TouchableOpacity>

        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.productList}>

          <ProductCard
            icon="nutrition-outline"
            name="Fresh Apples"
            quantity="1 kg"
            price="₹120"
            oldPrice="₹150"
          />

          <ProductCard
            icon="leaf-outline"
            name="Fresh Spinach"
            quantity="250 g"
            price="₹35"
            oldPrice="₹45"
          />

          <ProductCard
            icon="cafe-outline"
            name="Fresh Milk"
            quantity="1 litre"
            price="₹58"
            oldPrice="₹65"
          />

        </ScrollView>

        {/* =========================
            QUICK DELIVERY
        ========================== */}

        <TouchableOpacity
          style={styles.deliveryCard}
          activeOpacity={0.85}>

          <View style={styles.deliveryIcon}>

            <Ionicons
              name="flash"
              size={24}
              color={Colors.primary}
            />

          </View>

          <View style={styles.deliveryTextContainer}>

            <Text style={styles.deliveryTitle}>
              Lightning Fast Delivery
            </Text>

            <Text style={styles.deliverySubtitle}>
              Get your groceries delivered quickly
            </Text>

          </View>

          <Ionicons
            name="chevron-forward"
            size={20}
            color={Colors.textSecondary}
          />

        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};


/* =========================================
   CATEGORY COMPONENT
========================================= */

const Category = ({icon, title}) => {
  return (
    <TouchableOpacity
      style={styles.category}
      activeOpacity={0.8}>

      <View style={styles.categoryIcon}>

        <Ionicons
          name={icon}
          size={27}
          color={Colors.primary}
        />

      </View>

      <Text style={styles.categoryTitle}>
        {title}
      </Text>

    </TouchableOpacity>
  );
};


/* =========================================
   PRODUCT COMPONENT
========================================= */

const ProductCard = ({
  icon,
  name,
  quantity,
  price,
  oldPrice,
}) => {
  return (
    <TouchableOpacity
      style={styles.productCard}
      activeOpacity={0.85}>

      <View style={styles.productImage}>

        <Ionicons
          name={icon}
          size={62}
          color={Colors.primary}
        />

        <View style={styles.discountBadge}>

          <Text style={styles.discountText}>
            SALE
          </Text>

        </View>

      </View>

      <Text
        style={styles.productName}
        numberOfLines={1}>
        {name}
      </Text>

      <Text style={styles.productQuantity}>
        {quantity}
      </Text>

      <View style={styles.priceRow}>

        <Text style={styles.price}>
          {price}
        </Text>

        <Text style={styles.oldPrice}>
          {oldPrice}
        </Text>

        <TouchableOpacity
          style={styles.addButton}
          activeOpacity={0.8}>

          <Ionicons
            name="add"
            size={20}
            color={Colors.white}
          />

        </TouchableOpacity>

      </View>

    </TouchableOpacity>
  );
};


/* =========================================
   STYLES
========================================= */

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  scrollContent: {
    paddingHorizontal: Spacing.screenHorizontal,
    paddingTop: Spacing.md,
    paddingBottom: 30,
  },


  /* =========================
     HEADER
  ========================== */

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
  },

  smallGreeting: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  locationText: {
    ...Typography.body,
    fontWeight: '700',
    color: Colors.text,
    marginHorizontal: 5,
  },

  notificationButton: {
    width: 46,
    height: 46,
    borderRadius: Radius.round,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',

    elevation: 2,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },

  notificationDot: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: Radius.round,
    backgroundColor: Colors.error,
    top: 10,
    right: 11,
    borderWidth: 1.5,
    borderColor: Colors.surface,
  },


  /* =========================
     SEARCH
  ========================== */

  searchBar: {
    height: 54,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,

    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,

    elevation: 2,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },

  searchPlaceholder: {
    flex: 1,
    ...Typography.bodySmall,
    color: Colors.textLight,
    marginLeft: Spacing.sm,
  },


  /* =========================
     BANNER
  ========================== */

  banner: {
    height: 190,
    borderRadius: Radius.xl,
    backgroundColor: Colors.primary,
    overflow: 'hidden',
    marginBottom: Spacing.xxxl,
  },

  bannerContent: {
    padding: Spacing.xl,
    width: '72%',
    zIndex: 2,
  },

  bannerSmall: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
    color: '#C8E6C9',
    marginBottom: 7,
  },

  bannerTitle: {
    fontSize: 25,
    lineHeight: 30,
    fontWeight: '800',
    color: Colors.white,
  },

  bannerDescription: {
    fontSize: 12,
    color: '#E8F5E9',
    marginTop: 6,
  },

  shopButton: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: Colors.white,

    paddingHorizontal: 14,
    paddingVertical: 9,

    borderRadius: Radius.round,

    marginTop: 13,
  },

  shopButtonText: {
    color: Colors.primaryDark,
    fontSize: 12,
    fontWeight: '800',
    marginRight: 5,
  },

  bannerDecoration: {
    position: 'absolute',
    right: -8,
    bottom: 15,

    transform: [
      {
        rotate: '-12deg',
      },
    ],
  },


  /* =========================
     SECTION
  ========================== */

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },

  sectionTitle: {
    ...Typography.h3,
    fontWeight: '800',
    color: Colors.text,
  },

  sectionSubtitle: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    marginTop: 3,
  },

  seeAll: {
    ...Typography.bodySmall,
    fontWeight: '700',
    color: Colors.primary,
  },


  /* =========================
     CATEGORIES
  ========================== */

  categoryList: {
    paddingBottom: Spacing.xxxl,
  },

  category: {
    alignItems: 'center',
    marginRight: 18,
    width: 68,
  },

  categoryIcon: {
    width: 62,
    height: 62,
    borderRadius: 21,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 7,
  },

  categoryTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
  },


  /* =========================
     PRODUCTS
  ========================== */

  productList: {
    paddingBottom: Spacing.xl,
  },

  productCard: {
    width: 170,
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    padding: Spacing.md,
    marginRight: 14,

    elevation: 2,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },

  productImage: {
    height: 135,
    backgroundColor: '#F1F8F2',
    borderRadius: Radius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
    position: 'relative',
  },

  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: Colors.accent,
    borderRadius: Radius.sm,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },

  discountText: {
    fontSize: 9,
    fontWeight: '800',
    color: Colors.white,
  },

  productName: {
    ...Typography.body,
    fontWeight: '700',
    color: Colors.text,
  },

  productQuantity: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    marginTop: 3,
  },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 9,
  },

  /* FIXED:
     Previously:
     fontSize: Typography.body

     Typography.body is an object.
     */

  price: {
    ...Typography.body,
    fontWeight: '800',
    color: Colors.primary,
  },

  oldPrice: {
    fontSize: 11,
    color: Colors.textLight,
    textDecorationLine: 'line-through',
    marginLeft: 6,
  },

  addButton: {
    marginLeft: 'auto',
    width: 32,
    height: 32,
    borderRadius: Radius.round,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },


  /* =========================
     DELIVERY
  ========================== */

  deliveryCard: {
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: Colors.surface,

    borderRadius: Radius.xl,

    padding: 15,

    marginBottom: 20,

    elevation: 2,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },

  deliveryIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#FFF8E1',
    justifyContent: 'center',
    alignItems: 'center',
  },

  deliveryTextContainer: {
    flex: 1,
    marginLeft: 12,
  },

  deliveryTitle: {
    ...Typography.body,
    fontWeight: '700',
    color: Colors.text,
  },

  deliverySubtitle: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    marginTop: 3,
  },

});

export default HomeScreen;