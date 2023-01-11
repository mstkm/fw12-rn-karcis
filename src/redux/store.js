import {configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import reducer from './reducers';
import {persistStore} from 'redux-persist';
import logger from 'redux-logger';

export const store = configureStore({
  reducer,
  middleware: [thunk, logger],
});

export const persistor = persistStore(store);
