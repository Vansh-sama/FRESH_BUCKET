import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import Ionicons from '@react-native-vector-icons/ionicons';

import {useOrders} from '../../context/OrdersContext';

import {
  Colors,
  Typography,
}from '../../theme';

git add const ProfileScreen = ({navigation, route}) => {
  const user = route?.params?.user ?? null;
  const isGuest = !user;

  const {orders} = useOrders();
  const mostRecentOrder = orders[0];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>

        {/* HEADER */}

        <View style={styles.header}>

          <Text style={styles.headerTitle}>
            My Profile
          </Text>

          <TouchableOpacity style={styles.settingsButton}>
            <Ionicons
              name="settings-outline"
              size={23}
              color={Colors.text}
            />
          </TouchableOpacity>

        </View>

        {/* PROFILE / GUEST CARD */}

        {isGuest ? (

          <View style={styles.profileCard}>

            <View style={styles.avatar}>

              <Ionicons
                name="person-outline"
                size={38}
                color={Colors.primary}
              />

            </View>

            <View style={styles.profileInfo}>

              <Text style={styles.name}>
                Guest
              </Text>

              <Text style={styles.email}>
                Log in to see your orders, addresses & saved items
              </Text>

              <TouchableOpacity
                onPress={() => navigation.replace('Signup')}>

                <Text style={styles.editProfile}>
                  Log In / Sign Up
                </Text>

              </TouchableOpacity>

            </View>

          </View>

        ) : (

          <View style={styles.profileCard}>

            <View style={styles.avatar}>

              <Ionicons
                name="person"
                size={42}
                color={Colors.primary}
              />

            </View>

            <View style={styles.profileInfo}>

              <Text style={styles.name}>
                {user.name}
              </Text>

              <Text style={styles.email}>
                {user.email}
              </Text>

              {!!user.phone && (
                <Text style={styles.phone}>
                  {user.phone}
                </Text>
              )}

              <TouchableOpacity>

                <Text style={styles.editProfile}>
                  Edit Profile
                </Text>

              </TouchableOpacity>

            </View>

          </View>

        )}

        {/* MY ORDERS — only meaningful once logged in */}

        {!isGuest && (

          <>

            <Text style={styles.sectionTitle}>
              My Orders
            </Text>

            <View style={styles.menuCard}>

              <ProfileOption
                icon="receipt-outline"
                title="Order History"
                onPress={() => navigation.navigate('MyOrders')}
              />

              <ProfileOption
                icon="navigate-outline"
                title="Track Orders"
                onPress={() => {
                  if (mostRecentOrder) {
                    navigation.navigate('OrderTracking', {
                      orderId: mostRecentOrder.id,
                    });
                  } else {
                    navigation.navigate('MyOrders');
                  }
                }}
              />

              <ProfileOption icon="location-outline" title="Address Book" />
              <ProfileOption icon="card-outline" title="Payment Methods" last />

            </View>

          </>

        )}

        {/* MORE */}

        <Text style={styles.sectionTitle}>
          More
        </Text>

        <View style={styles.menuCard}>

          <ProfileOption
            icon="notifications-outline"
            title="Notifications"
          />

          <ProfileOption
            icon="help-circle-outline"
            title="Help & Support"
          />

          <ProfileOption
            icon="information-circle-outline"
            title="About Fresh Basket"
            last={isGuest}
          />

          {!isGuest && (

            <TouchableOpacity
              style={[styles.option, styles.lastOption]}
              activeOpacity={0.75}
              onPress={() => navigation.replace('Signup')}>

              <View style={styles.optionIcon}>

                <Ionicons
                  name="log-out-outline"
                  size={19}
                  color="#D64545"
                />

              </View>

              <Text style={[styles.optionTitle, styles.logoutText]}>
                Logout
              </Text>

            </TouchableOpacity>

          )}

        </View>

      </ScrollView>

    </SafeAreaView>
  );
};

const ProfileOption = ({icon, title, last, onPress}) => {
  return (
    <TouchableOpacity
      style={[styles.option, last && styles.lastOption]}
      activeOpacity={0.75}
      onPress={onPress}>

      <View style={styles.optionIcon}>

        <Ionicons
          name={icon}
          size={19}
          color={Colors.primary}
        />

      </View>

      <Text style={styles.optionTitle}>
        {title}
      </Text>

      <Ionicons
        name="chevron-forward"
        size={18}
        color={Colors.textLight}
      />

    </TouchableOpacity>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    paddingHorizontal: 20,
    paddingBottom: 35,
  },

  header: {
    height: 65,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  headerTitle: {
    ...Typography.h2,
    fontSize: 24,
    fontWeight: '900',
    color: Colors.text,
  },

  settingsButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },

  profileCard: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 17,
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#DDF4DF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  profileInfo: {
    flex: 1,
    marginLeft: 14,
  },

  name: {
    ...Typography.h4,
    fontWeight: '900',
    color: Colors.text,
  },

  email: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: 4,
  },

  phone: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: 2,
  },

  editProfile: {
    ...Typography.caption,
    color: Colors.primary,
    fontWeight: '800',
    marginTop: 7,
  },

  sectionTitle: {
    ...Typography.h3,
    fontSize: 18,
    fontWeight: '900',
    color: Colors.text,
    marginTop: 25,
    marginBottom: 11,
  },

  menuCard: {
    backgroundColor: Colors.surface,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },

  option: {
    minHeight: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#EDF0ED',
  },

  lastOption: {
    borderBottomWidth: 0,
  },

  optionIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#E7F6E8',
    justifyContent: 'center',
    alignItems: 'center',
  },

  optionTitle: {
    ...Typography.bodySmall,
    fontWeight: '700',
    color: Colors.text,
    flex: 1,
    marginLeft: 13,
  },

  logoutText: {
    color: '#D64545',
  },
});