import React, {
  createContext,
  useContext,
  useState,
} from 'react';

// Shared delivery-address state. Starts as null (no hardcoded default
// address) so LocationCard shows a "Select delivery address" prompt
// until the user actually sets one — exactly what they enter, nothing
// pre-filled.

const AddressContext = createContext(undefined);

export const AddressProvider = ({children}) => {
  const [address, setAddressState] = useState(null);

  const setAddress = text => {
    const trimmed = text.trim();
    setAddressState(trimmed.length > 0 ? trimmed : null);
  };

  const clearAddress = () => setAddressState(null);

  const value = {
    address,
    hasAddress: !!address,
    setAddress,
    clearAddress,
  };

  return (
    <AddressContext.Provider value={value}>
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = () => {
  const ctx = useContext(AddressContext);

  if (!ctx) {
    throw new Error('useAddress must be used within an AddressProvider');
  }

  return ctx;
};