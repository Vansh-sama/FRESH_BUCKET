import React, {useEffect} from 'react';

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  getUsers,
  selectUsers,
  selectUsersLoading,
  selectUsersError,
} from '../../redux/slices/userSlice';

const ReduxUsersScreen = () => {
  const dispatch = useDispatch();

  // ===================================================
  // REDUX STATE
  // ===================================================

  const users = useSelector(selectUsers);

  const loading = useSelector(
    selectUsersLoading,
  );

  const error = useSelector(
    selectUsersError,
  );

  // ===================================================
  // API CALL
  // ===================================================

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  // ===================================================
  // REFRESH
  // ===================================================

  const handleRefresh = () => {
    dispatch(getUsers());
  };

  // ===================================================
  // USER CARD
  // ===================================================

  const renderUser = ({item, index}) => {
    return (
      <View style={styles.card}>

        {/* HEADER */}

        <View style={styles.cardHeader}>

          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {item.name
                ? item.name.charAt(0).toUpperCase()
                : 'U'}
            </Text>
          </View>

          <View style={styles.headerInfo}>

            <Text style={styles.name}>
              {item.name || 'Unknown User'}
            </Text>

            <Text style={styles.userId}>
              ID: {item.id ?? 'N/A'}
            </Text>

          </View>

          <View
            style={[
              styles.statusBadge,
              item.status === 'active'
                ? styles.activeBadge
                : styles.defaultBadge,
            ]}>

            <Text
              style={[
                styles.statusText,
                item.status === 'active'
                  ? styles.activeText
                  : styles.defaultText,
              ]}>

              {item.status || 'Unknown'}

            </Text>

          </View>

        </View>

        {/* EMAIL */}

        <View style={styles.infoRow}>

          <Text style={styles.label}>
            Email
          </Text>

          <Text style={styles.value}>
            {item.email || 'N/A'}
          </Text>

        </View>

        {/* COURSE */}

        <View style={styles.infoRow}>

          <Text style={styles.label}>
            Course
          </Text>

          <Text style={styles.value}>
            {item.course || 'N/A'}
          </Text>

        </View>

        {/* DATABASE ID */}

        <View style={styles.infoRow}>

          <Text style={styles.label}>
            Mongo ID
          </Text>

          <Text
            style={styles.mongoId}
            numberOfLines={1}>

            {item._id}

          </Text>

        </View>

      </View>
    );
  };

  // ===================================================
  // LOADING
  // ===================================================

  if (loading && users.length === 0) {
    return (
      <View style={styles.center}>

        <ActivityIndicator
          size="large"
        />

        <Text style={styles.loadingText}>
          Loading users...
        </Text>

      </View>
    );
  }

  // ===================================================
  // UI
  // ===================================================

  return (
    <View style={styles.container}>

      {/* HEADER */}

      <View style={styles.pageHeader}>

        <View>

          <Text style={styles.title}>
            Users
          </Text>

          <Text style={styles.subtitle}>
            Data fetched using Redux
          </Text>

        </View>

        <View style={styles.countBox}>

          <Text style={styles.count}>
            {users.length}
          </Text>

          <Text style={styles.countLabel}>
            Users
          </Text>

        </View>

      </View>

      {/* ERROR */}

      {error ? (
        <View style={styles.errorBox}>

          <Text style={styles.errorText}>
            {error}
          </Text>

          <TouchableOpacity
            onPress={handleRefresh}>

            <Text style={styles.retryText}>
              Retry
            </Text>

          </TouchableOpacity>

        </View>
      ) : null}

      {/* LIST */}

      <FlatList
        data={users}
        keyExtractor={(item, index) =>
          item._id ||
          index.toString()
        }
        renderItem={renderUser}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          users.length === 0
            ? styles.emptyContainer
            : styles.list
        }
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={handleRefresh}
          />
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No users found
          </Text>
        }
      />

    </View>
  );
};

export default ReduxUsersScreen;

// =====================================================
// STYLES
// =====================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7F5',
    paddingHorizontal: 16,
    paddingTop: 50,
  },

  pageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1B1B1B',
  },

  subtitle: {
    fontSize: 13,
    color: '#777',
    marginTop: 4,
  },

  countBox: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 12,
    alignItems: 'center',
  },

  count: {
    fontSize: 20,
    fontWeight: '800',
    color: '#2E7D32',
  },

  countLabel: {
    fontSize: 10,
    color: '#2E7D32',
  },

  list: {
    paddingBottom: 30,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,

    elevation: 3,

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.08,

    shadowRadius: 5,
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#2E7D32',
  },

  headerInfo: {
    flex: 1,
    marginLeft: 12,
  },

  name: {
    fontSize: 17,
    fontWeight: '700',
    color: '#222',
  },

  userId: {
    fontSize: 12,
    color: '#888',
    marginTop: 3,
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },

  activeBadge: {
    backgroundColor: '#E8F5E9',
  },

  defaultBadge: {
    backgroundColor: '#F0F0F0',
  },

  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },

  activeText: {
    color: '#2E7D32',
  },

  defaultText: {
    color: '#777',
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 9,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },

  label: {
    fontSize: 13,
    color: '#888',
    fontWeight: '600',
  },

  value: {
    fontSize: 13,
    color: '#333',
    fontWeight: '600',
    maxWidth: '65%',
  },

  mongoId: {
    fontSize: 10,
    color: '#999',
    maxWidth: '65%',
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    marginTop: 10,
    fontSize: 15,
    color: '#666',
  },

  errorBox: {
    backgroundColor: '#FFEBEE',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  errorText: {
    color: '#C62828',
    flex: 1,
    fontSize: 13,
  },

  retryText: {
    color: '#C62828',
    fontWeight: '800',
    marginLeft: 10,
  },

  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyText: {
    fontSize: 16,
    color: '#888',
  },
});