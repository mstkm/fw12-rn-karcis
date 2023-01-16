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
  },
  extraReducers: build => {
    // build.addCase(resetPasswordReducerAction.fulfilled, (state, {payload}) => {
    //   state.email = payload;
    // });
  },
});

export const {resetPassword} = resetPasswordReducer.actions;

export default resetPasswordReducer.reducer;
