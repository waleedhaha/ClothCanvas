import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },

  },
});

// Export the actions
export const { setUser, setIsAuthenticated } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;
