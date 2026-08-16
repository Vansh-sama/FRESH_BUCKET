import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit';

import {getProductsApi} from '../../services/productService';

// ======================================
// GET PRODUCTS THUNK
// ======================================

export const getProducts = createAsyncThunk(
  'products/getProducts',

  async (_, {rejectWithValue}) => {
    try {
      const data = await getProductsApi();

      return data;
    } catch (error) {
      console.log(
        'PRODUCT API ERROR:',
        error?.response?.data || error.message,
      );

      return rejectWithValue(
        error?.response?.data?.message ||
          error.message ||
          'Failed to fetch products',
      );
    }
  },
);

// ======================================
// INITIAL STATE
// ======================================

const initialState = {
  products: [],
  loading: false,
  error: null,
};

// ======================================
// SLICE
// ======================================

const productSlice = createSlice({
  name: 'products',

  initialState,

  reducers: {
    clearProducts: state => {
      state.products = [];
      state.error = null;
    },
  },

  extraReducers: builder => {
    // PENDING

    builder.addCase(
      getProducts.pending,
      state => {
        state.loading = true;
        state.error = null;
      },
    );

    // SUCCESS

    builder.addCase(
      getProducts.fulfilled,
      (state, action) => {
        state.loading = false;

        // If API directly returns array
        if (Array.isArray(action.payload)) {
          state.products = action.payload;
        }

        // If API returns {products: []}
        else {
          state.products =
            action.payload?.products || [];
        }

        state.error = null;
      },
    );

    // ERROR

    builder.addCase(
      getProducts.rejected,
      (state, action) => {
        state.loading = false;

        state.error =
          action.payload ||
          'Something went wrong';
      },
    );
  },
});

export const {clearProducts} =
  productSlice.actions;

export default productSlice.reducer;