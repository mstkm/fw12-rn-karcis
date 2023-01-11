import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  bookingDate: null,
  movieId: null,
  movieTitle: null,
  cinemaId: null,
  price: null,
  cinemaName: null,
  cinemaPicture: null,
  movieScheduleId: null,
  fullName: null,
  email: null,
  phoneNumber: null,
  statusId: null,
  userId: null,
  paymentMethodId: null,
  bookingTime: null,
  seatNum: null,
};

const transactionReducer = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    transaction: (state, {payload}) => {
      state.bookingDate = payload.bookingDate;
      state.movieId = payload.movieId;
      state.movieTitle = payload.movieTitle;
      state.cinemaId = payload.cinemaId;
      state.cinemaName = payload.cinemaName;
      state.cinemaPicture = payload.cinemaPicture;
      state.price = payload.price;
      state.movieScheduleId = payload.movieScheduleId;
      state.fullName = payload.fullName;
      state.email = payload.email;
      state.phoneNumber = payload.phoneNumber;
      state.statusId = payload.statusId;
      state.userId = payload.userId;
      state.paymentMethodId = payload.paymentMethodId;
      state.bookingTime = payload.bookingTime;
      state.seatNum = payload.seatNum;
    },
    transactionLogout: (state, {payload}) => {
      state.bookingDate = null;
      state.movieId = null;
      state.movieTitle = null;
      state.cinemaId = null;
      state.cinemaName = null;
      state.cinemaPicture = null;
      state.price = null;
      state.movieScheduleId = null;
      state.fullName = null;
      state.email = null;
      state.phoneNumber = null;
      state.statusId = null;
      state.userId = null;
      state.paymentMethodId = null;
      state.bookingTime = null;
      state.seatNum = null;
    },
  },
  extraReducers: build => {
    // build.addCase(loginAction.fulfilled, (state, {payload}) => {
    //   state.token = payload;
    // });
  },
});

export const {transaction, transactionLogout} = transactionReducer.actions;

export default transactionReducer.reducer;
