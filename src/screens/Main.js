import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';
import SignIn from './SignIn';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import HomePage from './HomePage';
import ViewAll from './ViewAll';
import MovieDetails from './MovieDetails';
import OrderPage from './OrderPage';
import PaymentPage from './PaymentPage';
import Profile from './Profile';
import OrderHistory from './OrderHistory';
import TicketResult from './TicketResult';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const Main = () => {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Stack.Navigator>
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ResetPassword"
            component={ResetPassword}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="HomePage"
            component={HomePage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ViewAll"
            component={ViewAll}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="MovieDetails"
            component={MovieDetails}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="OrderPage"
            component={OrderPage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PaymentPage"
            component={PaymentPage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="OrderHistory"
            component={OrderHistory}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="TicketResult"
            component={TicketResult}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  );
};

export default Main;
