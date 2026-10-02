import React, {
  createContext,
  useContext,
  useState,
  useCallback,
} from 'react';

import {
  createOrderApi,
  getOrdersApi,
  getOrderApi,
} from '../services/catalogService';

const OrdersContext = createContext(undefined);

export const OrdersProvider = ({children}) => {
  const [orders, setOrders] = useState([]);

  const loadOrders = useCallback(async () => {
    const data = await getOrdersApi();
    setOrders(data);
    return data;
  }, []);

  const placeOrder = async ({
    items,
    address,
    paymentMethod,
  }) => {
    const order = await createOrderApi({
      items: items.map(item => ({
        productId: item.id || item._id,
        quantity: item.quantityCount,
      })),
      address,
      paymentMethod,
    });

    setOrders(prev => [order, ...prev]);
    return order;
  };

  const getOrderById = async orderId => {
    const local = orders.find(
      o => String(o.id) === String(orderId),
    );

    if (local) return local;

    try {
      return await getOrderApi(orderId);
    } catch (error) {
      console.log('ORDER API ERROR:', error?.response?.data || error?.message);
      return null;
    }
  };

  const updateOrderStatus = () => {
    // Status is controlled by the backend/admin.
    // The mobile app does not fake or auto-advance it.
  };

  const value = {
    orders,
    loadOrders,
    placeOrder,
    updateOrderStatus,
    getOrderById,
  };

  return (
    <OrdersContext.Provider value={value}>
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => {
  const ctx = useContext(OrdersContext);

  if (!ctx) {
    throw new Error('useOrders must be used within an OrdersProvider');
  }

  return ctx;
};
