// store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer'; // Import your root reducer

const store = configureStore({
  reducer: rootReducer,
  // Add middleware or other store configurations here if needed
});

export default store;
// Compare this snippet from App.js: