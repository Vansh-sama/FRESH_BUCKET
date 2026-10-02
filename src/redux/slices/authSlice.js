import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

import {
  loginApi,
  registerApi,
  getProfileApi,
  logoutApi,
} from '../../services/authService';


// ======================================================
// LOGIN USER
// ======================================================

export const loginUser = createAsyncThunk(
  'auth/loginUser',

  async (userData, {rejectWithValue}) => {
    try {
      console.log('LOGIN REQUEST:', userData);

      const response = await loginApi(userData);

      console.log('LOGIN RESPONSE:', response);

      // Make sure backend returned success
      if (!response?.success) {
        return rejectWithValue(
          response?.message ||
            'Invalid email or password.',
        );
      }

      return response;

    } catch (error) {
      console.log(
        'LOGIN API ERROR:',
        error?.response?.data || error?.message,
      );

      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          'Unable to connect to server.',
      );
    }
  },
);


// ======================================================
// REGISTER USER
// ======================================================

export const registerUser = createAsyncThunk(
  'auth/registerUser',

  async (userData, {rejectWithValue}) => {
    try {
      console.log('REGISTER REQUEST:', userData);

      const response = await registerApi(userData);

      console.log(
        'REGISTER RESPONSE:',
        response,
      );

      if (!response?.success) {
        return rejectWithValue(
          response?.message ||
            'Registration failed.',
        );
      }

      return response;

    } catch (error) {
      console.log(
        'REGISTER API ERROR:',
        error?.response?.data || error?.message,
      );

      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          'Unable to register user.',
      );
    }
  },
);


// ======================================================
// GET PROFILE
// ======================================================

export const getProfile = createAsyncThunk(
  'auth/getProfile',

  async (token, {rejectWithValue}) => {
    try {
      if (!token) {
        return rejectWithValue(
          'Authentication token is missing.',
        );
      }

      const response =
        await getProfileApi(token);

      console.log(
        'PROFILE RESPONSE:',
        response,
      );

      if (!response?.success) {
        return rejectWithValue(
          response?.message ||
            'Failed to load profile.',
        );
      }

      return response;

    } catch (error) {
      console.log(
        'PROFILE API ERROR:',
        error?.response?.data || error?.message,
      );

      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          'Failed to load profile.',
      );
    }
  },
);


// ======================================================
// INITIAL STATE
// ======================================================

const initialState = {
  user: null,

  token: null,

  loading: false,

  error: null,

  isAuthenticated: false,
};


// ======================================================
// AUTH SLICE
// ======================================================

const authSlice = createSlice({
  name: 'auth',

  initialState,

  reducers: {

    // ================================================
    // LOGOUT
    // ================================================

    logout: state => {
      logoutApi();
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      state.isAuthenticated = false;
    },


    // ================================================
    // CLEAR ERROR
    // ================================================

    clearAuthError: state => {
      state.error = null;
    },


    // ================================================
    // CLEAR AUTH
    // ================================================

    clearAuth: state => {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      state.isAuthenticated = false;
    },
  },


  // ==================================================
  // ASYNC ACTIONS
  // ==================================================

  extraReducers: builder => {
    builder


      // ==================================================
      // LOGIN
      // ==================================================

      .addCase(
        loginUser.pending,
        state => {
          state.loading = true;
          state.error = null;
        },
      )


      .addCase(
        loginUser.fulfilled,
        (state, action) => {
          state.loading = false;

          state.user =
            action.payload?.user || null;

          state.token =
            action.payload?.accessToken ||
            action.payload?.token || null;

          state.isAuthenticated =
            Boolean(state.token);

          state.error = null;
        },
      )


      .addCase(
        loginUser.rejected,
        (state, action) => {
          state.loading = false;

          state.user = null;
          state.token = null;

          state.isAuthenticated = false;

          state.error =
            action.payload ||
            'Login failed.';
        },
      )


      // ==================================================
      // REGISTER
      // ==================================================

      .addCase(
        registerUser.pending,
        state => {
          state.loading = true;
          state.error = null;
        },
      )


      .addCase(
        registerUser.fulfilled,
        (state, action) => {
          state.loading = false;

          state.user =
            action.payload?.user || null;

          state.token =
            action.payload?.accessToken ||
            action.payload?.token || null;

          state.isAuthenticated =
            Boolean(state.token);

          state.error = null;
        },
      )


      .addCase(
        registerUser.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload ||
            'Registration failed.';
        },
      )


      // ==================================================
      // PROFILE
      // ==================================================

      .addCase(
        getProfile.pending,
        state => {
          state.loading = true;
          state.error = null;
        },
      )


      .addCase(
        getProfile.fulfilled,
        (state, action) => {
          state.loading = false;

          state.user =
            action.payload?.user || null;

          state.error = null;
        },
      )


      .addCase(
        getProfile.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload ||
            'Failed to load profile.';
        },
      );
  },
});


// ======================================================
// ACTIONS
// ======================================================

export const {
  logout,
  clearAuthError,
  clearAuth,
} = authSlice.actions;


// ======================================================
// SELECTORS
// ======================================================

export const selectAuth =
  state => state.auth;

export const selectUser =
  state => state.auth.user;

export const selectToken =
  state => state.auth.token;

export const selectIsAuthenticated =
  state => state.auth.isAuthenticated;

export const selectAuthLoading =
  state => state.auth.loading;

export const selectAuthError =
  state => state.auth.error;


// ======================================================
// REDUCER
// ======================================================

export default authSlice.reducer;