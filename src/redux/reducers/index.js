import {combineReducers} from '@reduxjs/toolkit';
import auth from './auth';
import transaction from './transaction';
import resetPassword from './resetPassword';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const authConfig = {
  key: 'auth',
  storage: AsyncStorage,
};
const transactionConfig = {
  key: 'transaction',
  storage: AsyncStorage,
};
const resetPasswordConfig = {
  key: 'resetPassword',
  storage: AsyncStorage,
};

const reducer = combineReducers({
  auth: persistReducer(authConfig, auth),
  transaction: persistReducer(transactionConfig, transaction),
  resetPassword: persistReducer(resetPasswordConfig, resetPassword),
});

export default reducer;
