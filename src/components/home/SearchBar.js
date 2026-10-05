import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import Ionicons from '@react-native-vector-icons/ionicons';

import {
  Colors,
  Radius,
}from '../../theme';

const SearchBar = ({value, onChangeText, onFilterPress}) => {
  return (
    <View style={styles.container}>

      <Ionicons
        name="search-outline"
        size={25}
        color={Colors.text}
      />

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search for groceries..."
        placeholderTextColor="#687795"
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.filterButton}
        onPress={onFilterPress}
        activeOpacity={0.7}>

        <Ionicons
          name="options-outline"
          size={24}
          color={Colors.primary}
        />

      </TouchableOpacity>

    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    height: 57,
    borderRadius: 18,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: '#DDE5E0',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 18,
    elevation: 2,
  },

  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 13,
    fontSize: 16,
    color: Colors.text,
  },

  filterButton: {
    width: 58,
    height: '100%',
    borderLeftWidth: 1,
    borderLeftColor: '#E1E7E3',
    justifyContent: 'center',
    alignItems: 'center',
  },
});