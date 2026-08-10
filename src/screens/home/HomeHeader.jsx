import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  Colors,
  Spacing,
  Radius,
} from '../../theme';

const HomeHeader = () => {
  return (
    <LinearGradient
      colors={[
        Colors.primaryDark,
        Colors.primary,
        Colors.primaryLight,
      ]}
      style={styles.container}>

      {/* Top Row */}
      <View style={styles.topRow}>

        <View>

          <View style={styles.locationRow}>
            <Ionicons
              name="location"
              size={18}
              color="#fff"
            />

            <Text style={styles.deliverText}>
              Deliver To
            </Text>

            <Ionicons
              name="chevron-down"
              size={16}
              color="#fff"
            />
          </View>

          <Text style={styles.address}>
            Sector 62, Noida
          </Text>

        </View>

        <TouchableOpacity style={styles.profile}>
          <Ionicons
            name="person"
            size={28}
            color={Colors.primary}
          />
        </TouchableOpacity>

      </View>

      {/* Search */}

      <View style={styles.searchRow}>

        <View style={styles.searchBox}>

          <Ionicons
            name="search"
            size={22}
            color="#999"
          />

          <TextInput
            placeholder="Search groceries..."
            placeholderTextColor="#999"
            style={styles.input}
          />

        </View>

        <TouchableOpacity style={styles.notification}>

          <Ionicons
            name="notifications-outline"
            size={24}
            color={Colors.primary}
          />

          <View style={styles.badge}>
            <Text style={styles.badgeText}>2</Text>
          </View>

        </TouchableOpacity>

      </View>

    </LinearGradient>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({

  container: {
    paddingTop: 55,
    paddingHorizontal: 20,
    paddingBottom: 25,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  deliverText: {
    color: '#fff',
    fontSize: 14,
    marginHorizontal: 5,
    fontWeight: '700',
  },

  address: {
    color: '#fff',
    marginTop: 4,
    fontSize: 18,
    fontWeight: '700',
  },

  profile: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  searchRow: {
    flexDirection: 'row',
    marginTop: 24,
    alignItems: 'center',
  },

  searchBox: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 18,
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    color: '#000',
    fontSize: 16,
  },

  notification: {
    width: 55,
    height: 55,
    marginLeft: 12,
    backgroundColor: '#fff',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },

  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#ff4d4f',
    justifyContent: 'center',
    alignItems: 'center',
  },

  badgeText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 10,
  },

});