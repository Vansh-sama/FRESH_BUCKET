import React from 'react';
import {View, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import {Colors, Spacing, Radius, Typography} from '../theme';

// Presentational only - the parent screen owns the value/state and
// decides what happens on submit/filter press. Keeps this reusable
// (Home uses it now, a dedicated Search screen can reuse it later).
const SearchBar = ({value, onChangeText, onFilterPress, placeholder}) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputWrap}>
        <Ionicons
          name="search-outline"
          size={20}
          color={Colors.textMuted}
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder={placeholder || 'Search for groceries...'}
          placeholderTextColor={Colors.textMuted}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
      <TouchableOpacity style={styles.filterButton} onPress={onFilterPress}>
        <Ionicons name="options-outline" size={20} color={Colors.textInverse} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.md,
  },
  inputWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    height: 48,
  },
  icon: {
    marginRight: Spacing.sm,
  },
  input: {
    flex: 1,
    ...Typography.body,
    color: Colors.textPrimary,
    height: '100%',
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: Radius.md,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: Spacing.sm,
  },
});
