import React, {useEffect} from 'react';

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {getProducts} from '../redux/slices/productSlice';

const ReduxApiScreen = () => {
  const dispatch = useDispatch();

  const {
    products,
    loading,
    error,
  } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const renderProduct = ({item}) => {
    return (
      <View style={styles.card}>
        <Text style={styles.name}>
          {item.name}
        </Text>

        <Text style={styles.price}>
          ₹{item.price}
        </Text>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />

        <Text style={styles.loadingText}>
          Loading products...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Redux API Products
      </Text>

      {error && (
        <Text style={styles.error}>
          {error}
        </Text>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={() => dispatch(getProducts())}>
        <Text style={styles.buttonText}>
          Refresh Products
        </Text>
      </TouchableOpacity>

      <FlatList
        data={products}
        keyExtractor={(item, index) =>
          item._id?.toString() ||
          index.toString()
        }
        renderItem={renderProduct}
        ListEmptyComponent={
          !loading ? (
            <Text style={styles.empty}>
              No products found
            </Text>
          ) : null
        }
      />
    </View>
  );
};

export default ReduxApiScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 25,
    fontWeight: '700',
    marginBottom: 20,
  },

  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#2E7D32',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  card: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
  },

  name: {
    fontSize: 18,
    fontWeight: '600',
  },

  price: {
    marginTop: 5,
    fontSize: 16,
  },

  error: {
    color: 'red',
    marginBottom: 10,
  },

  empty: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
  },
});