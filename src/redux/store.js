import {configureStore} from '@reduxjs/toolkit';
// import authReducer from './slice';
// import login from './slice'
import auth from './slice';
export const store = configureStore({
  reducer: {
    update: auth,
  },
});
export default store;
