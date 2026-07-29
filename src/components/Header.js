import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Header = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.deliver}>Deliver To</Text>

        <View style={styles.locationRow}>
          <Ionicons
            name="location"
            size={18}
            color="#FF8F00"
          />

          <Text style={styles.location}>
            Sirsa, Haryana
          </Text>

          <Ionicons
            name="chevron-down"
            size={18}
            color="#263238"
          />
        </View>
      </View>

      <TouchableOpacity style={styles.profile}>
        <Ionicons
          name="person"
          size={24}
          color="#2E7D32"
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: '#F8F7F3',
  },

  deliver: {
    fontSize: 13,
    color: '#64748B',
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },

  location: {
    fontSize: 18,
    fontWeight: '700',
    color: '#263238',
    marginHorizontal: 5,
  },

  profile: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
});