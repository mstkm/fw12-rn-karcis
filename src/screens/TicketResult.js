/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  HStack,
  Image,
  NativeBaseProvider,
  ScrollView,
  Stack,
  Text,
} from 'native-base';
import React from 'react';
import Footer from '../components/Footer';
import NavbarUser from '../components/NavbarUser';
import http from '../helpers/http';
import {useSelector} from 'react-redux';
import moment from 'moment';

const TicketResult = id => {
  const token = useSelector(state => state?.auth?.token);
  const transactionId = id.route.params;
  // Get transactions by id
  const [transaction, setTransaction] = React.useState({});
  React.useEffect(() => {
    getTransaction().then(response => {
      setTransaction(response?.data?.results);
    });
  }, []);
  const getTransaction = async () => {
    try {
      const response = await http(token).get(
        `/profile/transaction/details/${transactionId}`,
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  console.log(transaction);
  return (
    <NativeBaseProvider>
      <ScrollView stickyHeaderIndices={[0]} stickyHeaderHiddenOnScroll={true}>
        <NavbarUser />
        <Box p="10" bg="#E5E5E5" zIndex={-100}>
          <Box bg="#FFFFFF" borderRadius={8}>
            <Box alignItems="center" pb="10" pt="8">
              <Image
                source={require('../images/qr-code.png')}
                alt="qrcode"
                width={200}
                height={200}
              />
            </Box>
            <Stack
              space={5}
              p="10"
              borderTopWidth={2}
              borderTopColor="#DEDEDE"
              borderStyle="dashed"
              position="relative">
              <Box
                w="12"
                h="12"
                borderRadius="full"
                top={-24}
                left={-28}
                bg="#E5E5E5"
                position="absolute"
              />
              <Box
                w="12"
                h="12"
                borderRadius="full"
                top={-24}
                right={-28}
                bg="#E5E5E5"
                position="absolute"
              />
              <HStack>
                <Box width="40%">
                  <Text>Movie</Text>
                  <Text numberOfLines={1} fontWeight="bold">
                    {transaction?.movieTitle}
                  </Text>
                </Box>
                <Box ml="12">
                  <Text>Category</Text>
                  <Text fontWeight="bold">Action</Text>
                </Box>
              </HStack>
              <HStack>
                <Box width="40%">
                  <Text>Date</Text>
                  <Text numberOfLines={1} fontWeight="bold">
                    {
                      String(
                        moment(transaction?.bookingDate).format('ll'),
                      ).split(',')[0]
                    }
                  </Text>
                </Box>
                <Box ml="12">
                  <Text>Time</Text>
                  <Text fontWeight="bold">
                    {String(transaction?.bookingTime).split(':')[0] +
                      ':' +
                      String(transaction?.bookingTime).split(':')[1] +
                      (String(transaction?.bookingTime).split(':')[0] < 12
                        ? 'am'
                        : 'pm')}
                  </Text>
                </Box>
              </HStack>
              <HStack>
                <Box width="40%">
                  <Text>Count</Text>
                  <Text numberOfLines={1} fontWeight="bold">
                    {
                      String(transaction?.seatNum)
                        .replace(/{/g, '')
                        .replace(/}/g, '')
                        .split(',').length
                    }{' '}
                    pcs
                  </Text>
                </Box>
                <Box ml="12">
                  <Text>Seats</Text>
                  <Text width={100} numberOfLines={2} fontWeight="bold">
                    {String(transaction?.seatNum)
                      .replace(/{/g, '')
                      .replace(/}/g, '')
                      .replace(/"/g, '')
                      .replace(/,/g, ', ')}
                  </Text>
                </Box>
              </HStack>
              <HStack
                borderWidth={1}
                borderRadius={4}
                height={45}
                alignItems="center"
                justifyContent="center"
                px="5">
                <Text flex={1} fontSize={16}>
                  Total
                </Text>
                <Text fontSize={16} fontWeight="bold">
                  Rp
                  {new Intl.NumberFormat('en-DE').format(
                    transaction?.totalPrice,
                  )}
                </Text>
              </HStack>
            </Stack>
          </Box>
        </Box>
        <Footer />
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default TicketResult;
