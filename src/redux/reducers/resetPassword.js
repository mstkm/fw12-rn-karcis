import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  email: null,
};

const resetPasswordReducer = createSlice({
  name: 'resetPassword',
  initialState,
  reducers: {
    resetPassword: (state, {payload}) => {
      state.email = payload.email;
    },
    resetPasswordToNull: (state, {payload}) => {
      state.email = null;
    },
  },
  extraReducers: build => {
    // build.addCase(resetPasswordReducerAction.fulfilled, (state, {payload}) => {
    //   state.email = payload;
    // });
  },
});

export const {resetPassword, resetPasswordToNull} =
  resetPasswordReducer.actions;

export default resetPasswordReducer.reducer;
