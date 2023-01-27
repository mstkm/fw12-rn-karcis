import React from 'react';
import Main from './src/screens/Main';
import {Provider} from 'react-redux';
import {store, persistor} from './src/redux/store';
import {PersistGate} from 'redux-persist/lib/integration/react';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  SplashScreen.hide();
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Main />
      </PersistGate>
    </Provider>
  );
};

export default App;
