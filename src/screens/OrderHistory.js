/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  NativeBaseProvider,
  ScrollView,
  Text,
  HStack,
  Pressable,
  Image,
  Stack,
  Button,
  Skeleton,
} from 'native-base';
import React from 'react';
import NavbarUser from '../components/NavbarUser';
import Footer from '../components/Footer';
import http from '../helpers/http';
import {useSelector} from 'react-redux';
import jwt_decode from 'jwt-decode';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';

const OrderHistory = () => {
  const navigation = useNavigation();
  const token = useSelector(state => state?.auth?.token);
  const {id} = jwt_decode(token);
  // Get Transactions by user id
  const [transactions, setTransactions] = React.useState([]);
  React.useEffect(() => {
    getTransactions().then(response => {
      setTransactions(response?.data?.results);
    });
  }, []);
  const getTransactions = async () => {
    try {
      const response = await http(token).get(`/transactions/${id}`);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  // Handle show ticket
  const handleShowTicket = transactionId => {
    navigation.navigate('TicketResult', transactionId);
  };
  return (
    <NativeBaseProvider>
      <ScrollView stickyHeaderIndices={[0]} stickyHeaderHiddenOnScroll={true}>
        <NavbarUser />
        <HStack px="5" bg="white">
          <Pressable onPress={() => navigation.navigate('Profile')} width="50%">
            <Text fontSize={16} textAlign="center" py="5">
              Details Account
            </Text>
          </Pressable>
          <Pressable width="50%">
            <Text
              fontSize={16}
              textAlign="center"
              py="5"
              borderBottomWidth={2}
              fontWeight="bold"
              borderBottomColor="#00005C">
              Order History
            </Text>
          </Pressable>
        </HStack>
        {transactions[0]?.cinemaPicture ? (
          <Stack space={5} py="10" bg="#E5E5E5">
            {transactions?.map(transaction => {
              return (
                <Box key={String(transaction?.id)} px="5">
                  <Box bg="white" py="5" borderRadius={16}>
                    <Box pb="8" px="5">
                      <Image
                        source={{uri: transaction?.cinemaPicture}}
                        alt="cineone21"
                        width={120}
                        height={50}
                        resizeMode="contain"
                        mb="3"
                      />
                      <Text>
                        {moment(transaction?.bookingDate).format('ll')}
                        {'   -   '}
                        {transaction?.bookingTime.split(':')[0] +
                          ':' +
                          transaction?.bookingTime.split(':')[1] +
                          (transaction?.bookingTime.split(':')[0] < 12
                            ? 'am'
                            : 'pm')}
                      </Text>
                      <Text fontWeight="bold" fontSize={18}>
                        {transaction?.movieTitle}
                      </Text>
                    </Box>
                    <Box
                      pt="8"
                      pb="3"
                      px="5"
                      borderTopWidth={1}
                      borderTopColor="#DEDEDE">
                      <Button
                        onPress={() => handleShowTicket(transaction?.id)}
                        borderRadius={8}
                        bg="#00BA88">
                        <Text color="#FFFFFF">Ticket in active</Text>
                      </Button>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Stack>
        ) : (
          <Box px="5" py="10">
            <Skeleton h="400px" />
            <Skeleton.Text py="4" />
            <Skeleton px="4" my="4" rounded="xl" h="20" startColor="gray.300" />
          </Box>
        )}
        <Footer />
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default OrderHistory;
