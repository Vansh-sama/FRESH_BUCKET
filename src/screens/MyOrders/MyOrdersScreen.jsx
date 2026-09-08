import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons';

import {useOrders} from '../../context/OrdersContext';
import {Colors, Typography} from '../../theme';

const STATUS_LABEL = {
  placed: 'Order Placed',
  preparing: 'Preparing',
  out_for_delivery: 'Out for Delivery',
  delivered: 'Delivered',
};

const STATUS_COLOR = {
  placed: '#3B82F6',
  preparing: '#F59E0B',
  out_for_delivery: '#F59E0B',
  delivered: Colors.primary,
};

const MyOrdersScreen = ({navigation}) => {
  const {orders} = useOrders();

  const renderOrder = ({item}) => {
    const itemCount = item.items.reduce(
      (sum, i) => sum + i.quantityCount,
      0,
    );

    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.85}
        onPress={() =>
          navigation.navigate('OrderTracking', {orderId: item.id})
        }>

        <View style={styles.cardHeader}>
          <Text style={styles.orderId}>{item.id}</Text>
          <View
            style={[
              styles.statusPill,
              {backgroundColor: `${STATUS_COLOR[item.status]}1A`},
            ]}>
            <Text
              style={[
                styles.statusText,
                {color: STATUS_COLOR[item.status]},
              ]}>
              {STATUS_LABEL[item.status]}
            </Text>
          </View>
        </View>

        <Text style={styles.itemsSummary}>
          {itemCount} item{itemCount !== 1 ? 's' : ''} ·{' '}
          {new Date(item.placedAt).toLocaleDateString()}
        </Text>

        <View style={styles.cardFooter}>
          <Text style={styles.subtotal}>
            ₹{item.subtotal.toFixed(2)}
          </Text>

          <View style={styles.trackRow}>
            <Text style={styles.trackText}>Track Order</Text>
            <Ionicons
              name="chevron-forward"
              size={16}
              color={Colors.primary}
            />
          </View>
        </View>

      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
          onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={Colors.text} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>My Orders</Text>

        <View style={{width: 22}} />
      </View>

      {orders.length === 0 ? (
        <View style={styles.emptyState}>
          <View style={styles.emptyIcon}>
            <Ionicons
              name="receipt-outline"
              size={40}
              color={Colors.primary}
            />
          </View>
          <Text style={styles.emptyTitle}>No orders yet</Text>
          <Text style={styles.emptySubtitle}>
            Your placed orders will show up here
          </Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={item => item.id}
          renderItem={renderOrder}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

    </SafeAreaView>
  );
};

export default MyOrdersScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },

  backButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
  },

  headerTitle: {
    ...Typography.h3,
    fontSize: 18,
    fontWeight: '900',
    color: Colors.text,
  },

  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  card: {
    backgroundColor: Colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 16,
    marginBottom: 14,
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  orderId: {
    ...Typography.bodySmall,
    fontWeight: '800',
    color: Colors.text,
  },

  statusPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  statusText: {
    fontSize: 11,
    fontWeight: '800',
  },

  itemsSummary: {
    ...Typography.caption,
    color: Colors.textLight,
    marginTop: 6,
  },

  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#EDF0ED',
    paddingTop: 12,
  },

  subtotal: {
    ...Typography.bodySmall,
    fontWeight: '900',
    color: Colors.text,
  },

  trackRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  trackText: {
    ...Typography.caption,
    fontWeight: '800',
    color: Colors.primary,
    marginRight: 2,
  },

  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },

  emptyIcon: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: '#E7F6E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },

  emptyTitle: {
    ...Typography.h4,
    fontWeight: '900',
    color: Colors.text,
  },

  emptySubtitle: {
    ...Typography.caption,
    color: Colors.textLight,
    marginTop: 6,
    textAlign: 'center',
  },
});