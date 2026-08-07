import React from 'react';
import {View, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SearchBar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <Ionicons
          name="search-outline"
          size={22}
          color="#64748B"
        />

        <TextInput
          placeholder="Search fruits, vegetables..."
          placeholderTextColor="#94A3B8"
          style={styles.input}
        />
      </View>

      <TouchableOpacity style={styles.filterBtn}>
        <Ionicons
          name="options-outline"
          size={22}
          color="#FFFFFF"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
  },

  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    height: 55,
    borderRadius: 18,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    elevation: 2,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    color: '#263238',
    fontSize: 15,
  },

  filterBtn: {
    width: 55,
    height: 55,
    backgroundColor: '#2E7D32',
    marginLeft: 12,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
});