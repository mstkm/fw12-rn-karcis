import {Box, NativeBaseProvider, ScrollView, Text} from 'native-base';
import React from 'react';
import NavbarUser from '../components/NavbarUser';

const OrderPage = () => {
  return (
    <NativeBaseProvider>
      <ScrollView stickyHeaderIndices={[0]} stickyHeaderHiddenOnScroll={true}>
        <NavbarUser />
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default OrderPage;
