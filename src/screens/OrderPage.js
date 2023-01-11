import {
  Box,
  NativeBaseProvider,
  ScrollView,
  Stack,
  Text,
  Pressable,
  HStack,
  Image,
  Button,
} from 'native-base';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import Footer from '../components/Footer';
import NavbarUser from '../components/NavbarUser';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {transaction as transactionAction} from '../redux/reducers/transaction';
import {useNavigation} from '@react-navigation/native';

const OrderPage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {
    bookingDate,
    bookingTime,
    cinemaId,
    cinemaName,
    cinemaPicture,
    movieId,
    movieScheduleId,
    movieTitle,
    price,
  } = useSelector(state => state?.transaction);
  const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  const number1 = [1, 2, 3, 4, 5, 6, 7];
  const number2 = [8, 9, 10, 11, 12, 13, 14];
  const [selectedSeat, setSelectedSeat] = React.useState([]);
  const handleChooseSeat = seat => {
    if (!selectedSeat.includes(seat)) {
      setSelectedSeat([...selectedSeat, seat]);
    } else {
      setSelectedSeat(selectedSeat.filter(el => el !== seat));
    }
  };

  // Handle Checkout
  const handleCheckout = () => {
    dispatch(
      transactionAction({
        bookingDate,
        bookingTime,
        cinemaId,
        cinemaName,
        cinemaPicture,
        movieId,
        movieScheduleId,
        movieTitle,
        price,
        seatNum: selectedSeat,
      }),
    );
    navigation.navigate('PaymentPage');
  };
  return (
    <NativeBaseProvider>
      <ScrollView stickyHeaderIndices={[0]} stickyHeaderHiddenOnScroll={true}>
        <NavbarUser />
        <Stack px="5" py="8" bg="#E5E5E5">
          <Text fontSize={18} fontWeight="bold" mb="3">
            Choose Your Seat
          </Text>
          <Box bg="white" px="3" py="5" borderRadius={8}>
            <Box width="full" height="2" bg="#9570FE" borderRadius="8" />
            <HStack space={3} justifyContent="center" pb="5" pt="3">
              <Box>
                {alphabet.map((alp, i) => {
                  return (
                    <Box key={String(i)} flexDirection="row">
                      {number1.map((num, index) => {
                        const seat = alp + num;
                        return (
                          <Pressable
                            key={String(index)}
                            borderWidth={1}
                            borderRadius={4}
                            w="18px"
                            h="18px"
                            m="0.5"
                            bg={
                              selectedSeat.includes(seat)
                                ? '#00005C'
                                : '#D6D8E7'
                            }
                            onPress={() => handleChooseSeat(seat)}
                          />
                        );
                      })}
                    </Box>
                  );
                })}
              </Box>
              <Box>
                {alphabet.map((alp, i) => {
                  return (
                    <Box key={String(i)} flexDirection="row">
                      {number2.map((num, index) => {
                        const seat = alp + num;
                        return (
                          <Pressable
                            key={String(index)}
                            borderWidth={1}
                            borderRadius={4}
                            w="18px"
                            h="18px"
                            m="0.5"
                            bg={
                              selectedSeat.includes(seat)
                                ? '#00005C'
                                : '#D6D8E7'
                            }
                            onPress={() => handleChooseSeat(seat)}
                          />
                        );
                      })}
                    </Box>
                  );
                })}
              </Box>
            </HStack>
            <Text fontSize={16} fontWeight="bold" mb="3">
              Seating Key
            </Text>
            <HStack space={20} mb="1.5">
              <Box flexDirection="row" alignItems="center">
                <Icon name="arrow-down" size={20} />
                <Text ml="3">A - G</Text>
              </Box>
              <Box flexDirection="row" alignItems="center">
                <Icon name="arrow-right" size={20} />
                <Text ml="3">1 - 14</Text>
              </Box>
            </HStack>
            <HStack space="45px" mb="1.5">
              <Box flexDirection="row">
                <Box
                  borderWidth={1}
                  borderRadius={4}
                  borderColor="#D6D8E7"
                  w="5"
                  h="5"
                  m="0.5"
                  bg="#D6D8E7"
                />
                <Text ml="3">Available</Text>
              </Box>
              <Box flexDirection="row">
                <Box
                  borderWidth={1}
                  borderRadius={4}
                  borderColor="#00005C"
                  w="5"
                  h="5"
                  m="0.5"
                  bg="#00005C"
                />
                <Text ml="3">Selected</Text>
              </Box>
            </HStack>
            <Box flexDirection="row">
              <Box
                borderWidth={1}
                borderRadius={4}
                borderColor="#6E7191"
                w="5"
                h="5"
                m="0.5"
                bg="#6E7191"
              />
              <Text ml="3">Sold</Text>
            </Box>
          </Box>
        </Stack>
        <Stack px="5" bg="#E5E5E5">
          <Text fontSize={18} fontWeight="bold" mb="3">
            Order Info
          </Text>
          <Box p="5" bg="white" alignItems="center" borderRadius={8}>
            <Image
              source={{uri: cinemaPicture}}
              alt={cinemaName}
              width={120}
              height={50}
              resizeMode="contain"
            />
            <Text fontSize={18} mb={1}>
              {cinemaName} Cinema
            </Text>
            <Text mb="5" fontSize={18} fontWeight="bold">
              {movieTitle}
            </Text>
            <HStack mb="2">
              <Text flex={1}>{moment(bookingDate).format('ll')}</Text>
              <Text fontWeight="bold">
                {bookingTime.split(':')[0] +
                  ':' +
                  bookingTime.split(':')[1] +
                  (bookingTime.split(':')[0] < 12 ? 'am' : 'pm')}
              </Text>
            </HStack>
            <HStack mb="2">
              <Text flex={1}>One ticket price</Text>
              <Text fontWeight="bold">
                Rp{new Intl.NumberFormat('en-DE').format(price)}
              </Text>
            </HStack>
            <HStack mb="5">
              <Text flex={1}>Seat choosed</Text>
              <Text fontWeight="bold">
                {selectedSeat.length ? selectedSeat.join(', ') : '-'}
              </Text>
            </HStack>
            <HStack pt="5" borderTopWidth={1} borderTopColor="#E6E6E6">
              <Text flex={1} fontSize={16} fontWeight="bold">
                Total Payment
              </Text>
              <Text fontSize={16} color="#00005C" fontWeight="bold">
                Rp
                {new Intl.NumberFormat('en-DE').format(
                  selectedSeat.length * price,
                )}
              </Text>
            </HStack>
          </Box>
          <Button
            onPress={handleCheckout}
            my="8"
            width="full"
            height={45}
            bg="#00005C"
            borderRadius={12}
            alignItems="center"
            justifyContent="center">
            <Text color="white" fontWeight="bold">
              Checkout Now
            </Text>
          </Button>
        </Stack>
        <Footer />
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default OrderPage;
