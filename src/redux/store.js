import {configureStore} from '@reduxjs/toolkit';

import userReducer from './slices/userSlice';
import authReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    users: userReducer,

    auth: authReducer,
  },
});

export default store;