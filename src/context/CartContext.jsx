import React, {
  createContext,
  useContext,
  useReducer,
  useMemo,
} from 'react';

// Shared cart state — HomeScreen's "+" buttons and CartScreen both read
// and write through this, instead of each screen holding its own
// disconnected copy (which is why adding items from Home never showed
// up in the cart before).

const CartContext = createContext(undefined);

const initialState = {
  items: [], // starts empty — no more hardcoded seed items
};

function cartReducer(state, action) {
  switch (action.type) {

    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.id === action.payload.id);

      if (existing) {
        return {
          items: state.items.map(i =>
            i.id === action.payload.id
              ? {...i, quantityCount: i.quantityCount + 1}
              : i,
          ),
        };
      }

      return {
        items: [
          ...state.items,
          {...action.payload, quantityCount: 1},
        ],
      };
    }

    case 'UPDATE_QUANTITY': {
      return {
        items: state.items
          .map(i =>
            i.id === action.payload.id
              ? {
                  ...i,
                  quantityCount:
                    i.quantityCount + action.payload.amount,
                }
              : i,
          )
          .filter(i => i.quantityCount > 0),
      };
    }

    case 'REMOVE_ITEM':
      return {
        items: state.items.filter(
          i => i.id !== action.payload.id,
        ),
      };

    case 'CLEAR_CART':
      return {items: []};

    default:
      return state;
  }
}

export const CartProvider = ({children}) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = product =>
    dispatch({type: 'ADD_ITEM', payload: product});

  const updateQuantity = (id, amount) =>
    dispatch({type: 'UPDATE_QUANTITY', payload: {id, amount}});

  const removeFromCart = id =>
    dispatch({type: 'REMOVE_ITEM', payload: {id}});

  const clearCart = () => dispatch({type: 'CLEAR_CART'});

  const cartCount = useMemo(
    () =>
      state.items.reduce(
        (sum, i) => sum + i.quantityCount,
        0,
      ),
    [state.items],
  );

  const cartSubtotal = useMemo(
    () =>
      state.items.reduce(
        (sum, i) => sum + i.price * i.quantityCount,
        0,
      ),
    [state.items],
  );

  const value = {
    cart: state.items,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartCount,
    cartSubtotal,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);

  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return ctx;
};