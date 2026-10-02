import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
} from 'react-native';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

import HomeScreen from '../screens/Home/HomeScreen';
import CategoriesScreen from '../screens/Categories/CategoriesScreen';
import CartScreen from '../screens/Cart/CartScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

import {useCart} from '../context/CartContext';

import {
  Colors,
  Typography,
} from '../theme';

const TAB_NAMES = ['Home', 'Categories', 'Cart', 'Profile'];

const tabs = [
  {
    name: 'Home',
    icon: 'home-outline',
    activeIcon: 'home',
    component: HomeScreen,
  },
  {
    name: 'Categories',
    icon: 'grid-outline',
    activeIcon: 'grid',
    component: CategoriesScreen,
  },
  {
    name: 'Cart',
    icon: 'cart-outline',
    activeIcon: 'cart',
    component: CartScreen,
  },
  {
    name: 'Profile',
    icon: 'person-outline',
    activeIcon: 'person',
    component: ProfileScreen,
  },
];

/*
 * BottomNavigator
 *
 * This component is registered inside the real Stack Navigator.
 *
 * Tab screens are handled locally:
 *   Home
 *   Categories
 *   Cart
 *   Profile
 *
 * Any other screen is forwarded to the real Stack Navigator:
 *   ProductDetail
 *   ProductListing
 *   Checkout
 *   MyOrders
 *   OrderTracking
 *   etc.
 */
const BottomNavigator = ({navigation}) => {
  const [activeTab, setActiveTab] = React.useState('Home');

  const insets = useSafeAreaInsets();

  const {cartCount} = useCart();

  /*
   * Android hardware back button
   *
   * If user is on another tab -> go back to Home.
   * If already on Home -> exit the application.
   */
  React.useEffect(() => {
    const onBackPress = () => {
      if (activeTab !== 'Home') {
        setActiveTab('Home');
        return true;
      }

      BackHandler.exitApp();
      return true;
    };

    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress,
    );

    return () => subscription.remove();
  }, [activeTab]);

  /*
   * Find currently selected tab screen.
   */
  const activeTabData = tabs.find(
    tab => tab.name === activeTab,
  );

  const ActiveScreen = activeTabData?.component || HomeScreen;

  /*
   * Child navigation object.
   *
   * Tab navigation:
   *   navigation.navigate('Cart')
   *   navigation.navigate('Profile')
   *
   * will switch the custom bottom tab.
   *
   * Other screens:
   *   navigation.navigate('ProductDetail')
   *   navigation.navigate('Checkout')
   *
   * will go through the actual Stack Navigator.
   */
  const childNavigation = {
    navigate: (screen, params) => {
      if (TAB_NAMES.includes(screen)) {
        setActiveTab(screen);
        return;
      }

      navigation.navigate(screen, params);
    },

    goBack: () => {
      if (activeTab !== 'Home') {
        setActiveTab('Home');
        return;
      }

      navigation.goBack();
    },

    replace: (screen, params) => {
      if (TAB_NAMES.includes(screen)) {
        setActiveTab(screen);
        return;
      }

      navigation.replace(screen, params);
    },
  };

  return (
    <View style={styles.container}>
      {/* Active Screen */}
      <View style={styles.screen}>
        <ActiveScreen navigation={childNavigation} />
      </View>

      {/* Bottom Navigation */}
      <View
        style={[
          styles.bottomBar,
          {
            height: 60 + insets.bottom,
            paddingBottom: insets.bottom,
          },
        ]}>
        {tabs.map(tab => {
          const active = activeTab === tab.name;

          return (
            <TouchableOpacity
              key={tab.name}
              style={styles.tab}
              activeOpacity={0.75}
              onPress={() => setActiveTab(tab.name)}>
              
              {/* Icon */}
              <View style={styles.iconContainer}>
                <Text
                  style={[
                    styles.icon,
                    active && styles.activeIcon,
                  ]}>
                  {getTabIcon(tab.name, active)}
                </Text>

                {/* Cart Badge */}
                {tab.name === 'Cart' && cartCount > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>
                      {cartCount > 99 ? '99+' : cartCount}
                    </Text>
                  </View>
                )}
              </View>

              {/* Label */}
              <Text
                style={[
                  styles.tabText,
                  active && styles.activeText,
                ]}>
                {tab.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

/*
 * Simple icon mapping.
 *
 * Using text symbols here keeps this file independent from
 * react-native-vector-icons.
 *
 * If your project already uses Ionicons, you can replace this
 * with Ionicons later.
 */
const getTabIcon = (tabName, active) => {
  switch (tabName) {
    case 'Home':
      return active ? '⌂' : '⌂';

    case 'Categories':
      return '▦';

    case 'Cart':
      return '🛒';

    case 'Profile':
      return '●';

    default:
      return '•';
  }
};

export default BottomNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  screen: {
    flex: 1,
  },

  bottomBar: {
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: '#E4E9E5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    elevation: 15,
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: -2,
    },
  },

  tab: {
    flex: 1,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconContainer: {
    height: 30,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  icon: {
    fontSize: 24,
    color: '#718096',
    fontWeight: '600',
  },

  activeIcon: {
    color: Colors.primary,
    fontWeight: '800',
  },

  tabText: {
    ...Typography.caption,
    fontSize: 11,
    fontWeight: '600',
    color: '#718096',
    marginTop: 4,
  },

  activeText: {
    color: Colors.primary,
    fontWeight: '800',
  },

  badge: {
    position: 'absolute',
    top: -4,
    right: -3,
    minWidth: 19,
    height: 19,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.surface,
  },

  badgeText: {
    fontSize: 9,
    fontWeight: '900',
    color: Colors.white,
  },
});