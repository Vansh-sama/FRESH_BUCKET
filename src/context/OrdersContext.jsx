import React, {
  createContext,
  useContext,
  useState,
} from 'react';

// Stores placed orders in memory so "My Orders" / "Track Orders" have
// something real to show. CheckoutScreen should call placeOrder(...)
// BEFORE clearCart() runs, or the order will have no items in it.

const OrdersContext = createContext(undefined);

export const OrdersProvider = ({children}) => {
  const [orders, setOrders] = useState([]);

  // Call this from CheckoutScreen's handlePlaceOrder, passing the cart
  // items and total BEFORE clearCart() wipes them.
  const placeOrder = ({items, subtotal, address}) => {
    const order = {
      id: `ORD-${Date.now()}`,
      items,
      subtotal,
      address,
      status: 'placed', // placed -> preparing -> out_for_delivery -> delivered
      placedAt: new Date().toISOString(),
    };

    setOrders(prev => [order, ...prev]);
    return order;
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders(prev =>
      prev.map(o => (o.id === orderId ? {...o, status} : o)),
    );
  };

  const getOrderById = orderId =>
    orders.find(o => o.id === orderId);

  const value = {
    orders,
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