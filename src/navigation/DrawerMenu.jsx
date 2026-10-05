import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';

import Ionicons from '@react-native-vector-icons/ionicons';

import {
  Colors,
  Typography,
  Spacing,
  Radius,
  Shadows,
} from '../theme';


const DrawerMenu = ({
  visible,
  onClose,
  navigation,
}) => {

  const navigateTo = screen => {
    onClose();

    if (navigation && screen) {
      navigation.navigate(screen);
    }
  };


  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>

      <View style={styles.overlay}>

        {/* BACKDROP */}

        <Pressable
          style={styles.backdrop}
          onPress={onClose}
        />


        {/* DRAWER */}

        <View style={styles.drawer}>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.drawerContent}>

            {/* HEADER */}

            <View style={styles.profileHeader}>

              <View style={styles.logoContainer}>
                <Ionicons
                  name="basket-outline"
                  size={28}
                  color={Colors.primary}
                />
              </View>


              <View style={styles.profileInfo}>

                <Text style={styles.brandName}>
                  Fresh Basket
                </Text>

                <Text style={styles.welcomeText}>
                  Fresh groceries, delivered
                </Text>

              </View>


              <TouchableOpacity
                style={styles.closeButton}
                activeOpacity={0.75}
                onPress={onClose}>

                <Ionicons
                  name="close"
                  size={21}
                  color={Colors.text}
                />

              </TouchableOpacity>

            </View>


            {/* DIVIDER */}

            <View style={styles.divider} />


            {/* MAIN MENU */}

            <Text style={styles.menuLabel}>
              SHOP
            </Text>


            <DrawerItem
              icon="home-outline"
              title="Home"
              subtitle="Browse groceries"
              onPress={() => navigateTo('Home')}
            />


            <DrawerItem
              icon="grid-outline"
              title="Categories"
              subtitle="Explore all categories"
              onPress={() => navigateTo('Categories')}
            />


            <DrawerItem
              icon="cart-outline"
              title="My Cart"
              subtitle="View your basket"
              onPress={() => navigateTo('Cart')}
            />


            <DrawerItem
              icon="receipt-outline"
              title="My Orders"
              subtitle="Track your orders"
              onPress={() => navigateTo('Orders')}
            />


            {/* ACCOUNT */}

            <Text style={styles.menuLabel}>
              ACCOUNT
            </Text>


            <DrawerItem
              icon="person-outline"
              title="Profile"
              subtitle="Manage your account"
              onPress={() => navigateTo('Profile')}
            />


            <DrawerItem
              icon="location-outline"
              title="Saved Addresses"
              subtitle="Manage delivery addresses"
              onPress={() => navigateTo('Addresses')}
            />


            {/* SUPPORT */}

            <Text style={styles.menuLabel}>
              SUPPORT
            </Text>


            <DrawerItem
              icon="help-circle-outline"
              title="Help & Support"
              subtitle="Get help with your order"
              onPress={() => {}}
            />


            <DrawerItem
              icon="information-circle-outline"
              title="About Fresh Basket"
              subtitle="Learn more about us"
              onPress={() => {}}
            />


            {/* PROMO CARD */}

            <View style={styles.promoCard}>

              <View style={styles.promoIcon}>

                <Ionicons
                  name="leaf-outline"
                  size={22}
                  color={Colors.primary}
                />

              </View>


              <View style={styles.promoContent}>

                <Text style={styles.promoTitle}>
                  Freshness first
                </Text>

                <Text style={styles.promoText}>
                  Quality groceries for your everyday needs.
                </Text>

              </View>

            </View>


            {/* FOOTER */}

            <View style={styles.footer}>

              <Text style={styles.footerText}>
                Fresh Basket
              </Text>

              <Text style={styles.version}>
                Version 1.0.0
              </Text>

            </View>

          </ScrollView>

        </View>

      </View>

    </Modal>
  );
};


/* ═══════════════════════════════════════════
   DRAWER ITEM
═══════════════════════════════════════════ */

const DrawerItem = ({
  icon,
  title,
  subtitle,
  onPress,
}) => {

  return (
    <TouchableOpacity
      style={styles.item}
      activeOpacity={0.75}
      onPress={onPress}>

      <View style={styles.itemIcon}>

        <Ionicons
          name={icon}
          size={21}
          color={Colors.primary}
        />

      </View>


      <View style={styles.itemContent}>

        <Text style={styles.itemTitle}>
          {title}
        </Text>

        <Text style={styles.itemSubtitle}>
          {subtitle}
        </Text>

      </View>


      <Ionicons
        name="chevron-forward"
        size={17}
        color={Colors.textLight}
      />

    </TouchableOpacity>
  );
};


export default DrawerMenu;


/* ═══════════════════════════════════════════
   STYLES
═══════════════════════════════════════════ */

const styles = StyleSheet.create({

  overlay: {
    flex: 1,
    flexDirection: 'row',
  },


  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.42)',
  },


  drawer: {
    width: '82%',
    maxWidth: 340,
    height: '100%',
    backgroundColor: Colors.background,
    ...Shadows.large,
  },


  drawerContent: {
    paddingTop: 55,
    paddingHorizontal: 17,
    paddingBottom: 25,
  },


  /* HEADER */

  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },


  logoContainer: {
    width: 50,
    height: 50,
    borderRadius: 17,
    backgroundColor: Colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },


  profileInfo: {
    flex: 1,
    marginLeft: 11,
  },


  brandName: {
    ...Typography.h3,
    fontSize: 19,
    fontWeight: '900',
    color: Colors.text,
  },


  welcomeText: {
    fontSize: 10,
    color: Colors.textSecondary,
    marginTop: 3,
  },


  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },


  divider: {
    height: 1,
    backgroundColor: Colors.divider,
    marginVertical: 20,
  },


  /* LABEL */

  menuLabel: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
    color: Colors.textLight,
    marginBottom: 8,
    marginTop: 5,
  },


  /* ITEM */

  item: {
    minHeight: 63,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Radius.md,
    paddingHorizontal: 8,
    marginBottom: 3,
  },


  itemIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },


  itemContent: {
    flex: 1,
    marginLeft: 11,
  },


  itemTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.text,
  },


  itemSubtitle: {
    fontSize: 9.5,
    color: Colors.textSecondary,
    marginTop: 2,
  },


  /* PROMO */

  promoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primarySoft,
    borderRadius: Radius.lg,
    padding: 13,
    marginTop: 18,
  },


  promoIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },


  promoContent: {
    flex: 1,
    marginLeft: 10,
  },


  promoTitle: {
    fontSize: 12,
    fontWeight: '900',
    color: Colors.text,
  },


  promoText: {
    fontSize: 9.5,
    lineHeight: 14,
    color: Colors.textSecondary,
    marginTop: 3,
  },


  /* FOOTER */

  footer: {
    alignItems: 'center',
    marginTop: 25,
  },


  footerText: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.textSecondary,
  },


  version: {
    fontSize: 9,
    color: Colors.textLight,
    marginTop: 3,
  },

});