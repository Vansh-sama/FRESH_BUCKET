import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit';

import {getUsersApi} from '../../services/userService';

// =====================================================
// GET USERS THUNK
// =====================================================

export const getUsers = createAsyncThunk(
  'users/getUsers',

  async (_, {rejectWithValue}) => {
    try {
      const response = await getUsersApi();

      console.log(
        'API RESPONSE:',
        response,
      );

      return response;
    } catch (error) {
      console.log(
        'GET USERS ERROR:',
        error?.response?.data || error.message,
      );

      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          'Failed to fetch users',
      );
    }
  },
);

// =====================================================
// INITIAL STATE
// =====================================================

const initialState = {
  users: [],
  loading: false,
  error: null,
};

// =====================================================
// SLICE
// =====================================================

const userSlice = createSlice({
  name: 'users',

  initialState,

  reducers: {
    clearUsers: state => {
      state.users = [];
      state.error = null;
    },
  },

  extraReducers: builder => {
    // =================================================
    // PENDING
    // =================================================

    builder.addCase(
      getUsers.pending,
      state => {
        state.loading = true;
        state.error = null;
      },
    );

    // =================================================
    // SUCCESS
    // =================================================

    builder.addCase(
      getUsers.fulfilled,
      (state, action) => {
        state.loading = false;

        state.users =
          action.payload?.message || [];

        state.error = null;

        console.log(
          'USERS STORED:',
          state.users,
        );
      },
    );

    // =================================================
    // ERROR
    // =================================================

    builder.addCase(
      getUsers.rejected,
      (state, action) => {
        state.loading = false;

        state.error =
          action.payload ||
          'Something went wrong';

        state.users = [];
      },
    );
  },
});

// =====================================================
// ACTIONS
// =====================================================

export const {
  clearUsers,
} = userSlice.actions;

// =====================================================
// SELECTORS
// =====================================================

export const selectUsers = state =>
  state.users.users;

export const selectUsersLoading = state =>
  state.users.loading;

export const selectUsersError = state =>
  state.users.error;

// =====================================================
// REDUCER
// =====================================================

export default userSlice.reducer;