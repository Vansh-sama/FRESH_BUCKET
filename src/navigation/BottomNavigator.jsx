import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Ionicons from '@react-native-vector-icons/ionicons';

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

// `navigation` here is the REAL stack navigation React Navigation passes
// in automatically (this component is registered as a <Stack.Screen>).
// Previously this prop was dropped entirely and replaced with a fake
// tab-switcher that only understood the 4 tab names — any tab screen
// calling navigation.navigate('ProductDetail') or ('MyOrders') silently
// did nothing. Now tab-name calls switch tabs locally; anything else
// (ProductDetail, ProductListing, Checkout, MyOrders, ...) is forwarded
// to the real stack navigator.
const BottomNavigator = ({navigation}) => {
  const [activeTab, setActiveTab] = React.useState('Home');
  const insets = useSafeAreaInsets();

  const {cartCount} = useCart();

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

  const ActiveScreen = tabs.find(
    tab => tab.name === activeTab,
  ).component;

  const childNavigation = {
    navigate: (screen, params) => {
      if (TAB_NAMES.includes(screen)) {
        setActiveTab(screen);
        return;
      }
      // Not a tab — it's a real stack screen (ProductDetail, Checkout,
      // MyOrders, OrderTracking, ...). Forward it instead of dropping it.
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

      <View style={styles.screen}>
        <ActiveScreen navigation={childNavigation} />
      </View>

      <View
        style={[
          styles.bottomBar,
          { height: 60 + insets.bottom, paddingBottom: insets.bottom },
        ]}>

        {tabs.map(tab => {

          const active = activeTab === tab.name;

          return (
            <TouchableOpacity
              key={tab.name}
              style={styles.tab}
              activeOpacity={0.75}
              onPress={() => setActiveTab(tab.name)}>

              <View style={styles.iconContainer}>

                <Ionicons
                  name={
                    active
                      ? tab.activeIcon
                      : tab.icon
                  }
                  size={25}
                  color={
                    active
                      ? Colors.primary
                      : '#718096'
                  }
                />

                {tab.name === 'Cart' && cartCount > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>
                      {cartCount > 99 ? '99+' : cartCount}
                    </Text>
                  </View>
                )}

              </View>

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
  },

  tab: {
    flex: 1,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconContainer: {
    height: 30,
    width: 35,
    alignItems: 'center',
    justifyContent: 'center',
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