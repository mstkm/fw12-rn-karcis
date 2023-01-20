/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  HStack,
  NativeBaseProvider,
  ScrollView,
  Text,
  Stack,
  Image,
  Pressable,
  Input,
  Button,
  Skeleton,
} from 'native-base';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import Footer from '../components/Footer';
import NavbarUser from '../components/NavbarUser';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {transaction as transactionAction} from '../redux/reducers/transaction';
import http from '../helpers/http';
import jwt_decode from 'jwt-decode';

const PaymentPage = () => {
  const token = useSelector(state => state?.auth?.token);
  const {id} = jwt_decode(token);
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
    seatNum,
  } = useSelector(state => state?.transaction);

  // Get payment methods
  const [paymentMethods, setPaymentMethods] = React.useState([]);
  React.useEffect(() => {
    getPaymentMethods().then(response => {
      setPaymentMethods(response?.data?.results);
    });
  }, []);
  const getPaymentMethods = async () => {
    try {
      const response = await http().get('/paymentMethod?limit=10');
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  // Selected Payment Method
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    React.useState(null);

  // Get user by id
  const [user, setUser] = React.useState({});
  React.useEffect(() => {
    getUser().then(response => {
      setUser(response?.data?.results);
    });
  }, []);
  const getUser = async () => {
    try {
      const response = await http(token).get(`/users/${id}`);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  // Handle Pay Order
  const [fullName, setFullName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const handlePayOrder = async () => {
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
        seatNum,
        email: email ? email : user?.email,
        fullName: fullName ? fullName : `${user?.firstName} ${user?.lastName}`,
        phoneNumber: phoneNumber ? phoneNumber : user?.phoneNumber,
        statusId: 1,
        userId: id,
        paymentMethodId: selectedPaymentMethod,
      }),
    );
    createTransaction();
  };
  console.log();

  // Create Transaction
  const createTransaction = async () => {
    try {
      const response = await http(token).post('/profile/transaction', {
        bookingDate,
        movieId,
        userId: id,
        cinemaName,
        cinemaPicture,
        cinemaId,
        movieScheduleId,
        movieTitle,
        fullName: fullName ? fullName : `${user?.firstName} ${user?.lastName}`,
        email: email ? email : user?.email,
        phoneNumber: phoneNumber ? phoneNumber : user?.phoneNumber,
        paymentMethodId: selectedPaymentMethod,
        statusId: 1,
        seatNum: seatNum.join(', '),
        bookingTime,
        totalPrice: seatNum.length * price,
      });
      // navigation.navigate('OrderHistory');
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'HomePage',
          },
          {
            name: 'OrderHistory',
          },
        ],
      });
      return response;
    } catch (error) {
      console.log(error?.response);
    }
  };

  return (
    <NativeBaseProvider>
      <ScrollView stickyHeaderIndices={[0]} stickyHeaderHiddenOnScroll={true}>
        <NavbarUser />
        {paymentMethods[0]?.picture ? (
          <>
            <HStack px="5" py="5" bg="white" borderBottomRadius={16}>
              <Text flex={1} fontSize={18}>
                Total Payment
              </Text>
              <Text fontWeight="bold" fontSize={18}>
                Rp
                {new Intl.NumberFormat('en-DE').format(seatNum.length * price)}
              </Text>
            </HStack>
            <Stack px="5" pt="8" bg="#E5E5E5">
              <Text fontSize={18} fontWeight="bold" mb="3">
                Payment Method
              </Text>
              <Box bg="white" px="3" py="5" borderRadius={16}>
                <Box space="10px" flexDirection="row" flexWrap="wrap">
                  {paymentMethods?.map(paymentMethod => {
                    return (
                      <Pressable
                        onPress={() =>
                          setSelectedPaymentMethod(paymentMethod?.id)
                        }
                        key={String(paymentMethod?.id)}
                        borderWidth={1}
                        borderRadius={8}
                        borderColor="#DEDEDE"
                        backgroundColor={
                          selectedPaymentMethod === paymentMethod?.id
                            ? '#00005C'
                            : 'white'
                        }
                        width="100px"
                        justifyContent="center"
                        alignItems="center"
                        padding="3px"
                        my="3px"
                        mx="3px">
                        <Image
                          source={{uri: paymentMethod?.picture}}
                          alt={paymentMethod?.name}
                          width="80px"
                          height="50px"
                          resizeMode="contain"
                        />
                      </Pressable>
                    );
                  })}
                </Box>
                <Box
                  py="5"
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="center">
                  <Box width="120px" height="1px" bg="#DEDEDE" />
                  <Text flex={1} textAlign="center">
                    or
                  </Text>
                  <Box width="120px" height="1px" bg="#DEDEDE" />
                </Box>
                <Box flexDirection="row" justifyContent="center" mb="3">
                  <Text>Pay via cash.</Text>
                  <Text color="#00005C">See how it work.</Text>
                </Box>
              </Box>
            </Stack>
          </>
        ) : (
          <Box px="5" py="10">
            <Skeleton h="500px" />
            <Skeleton.Text py="4" />
            <Skeleton px="4" my="4" rounded="xl" h="20" startColor="gray.300" />
          </Box>
        )}
        <Stack px="5" py="8" bg="#E5E5E5">
          <Text fontSize={18} fontWeight="bold" mb="3">
            Personal Info
          </Text>
          <Stack space={5} bg="white" px="5" py="8" borderRadius={16}>
            <Box>
              <Text mb="1">Full Name</Text>
              <Input
                onChangeText={value => setFullName(value)}
                defaultValue={`${user?.firstName} ${user?.lastName}`}
                fontSize={14}
                borderRadius={12}
                borderColor="#DEDEDE"
              />
            </Box>
            <Box>
              <Text mb="1">Email</Text>
              <Input
                onChangeText={value => setEmail(value)}
                defaultValue={user?.email}
                fontSize={14}
                borderRadius={12}
                borderColor="#DEDEDE"
              />
            </Box>
            <Box>
              <Text mb="1">Phone Number</Text>
              <Input
                onChangeText={value => setPhoneNumber(value)}
                defaultValue={user?.phoneNumber}
                fontSize={14}
                borderRadius={12}
                borderColor="#DEDEDE"
              />
            </Box>
            <Box
              mt="3"
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
              height={45}
              borderWidth={1}
              fontSize={14}
              borderRadius={12}
              bg="rgba(244, 183, 64, 0.3)"
              borderColor="#DEDEDE">
              <Icon name="alert-triangle" size={20} />
              <Text ml="5">Fill Your Data Correctly</Text>
            </Box>
          </Stack>
        </Stack>
        <Box px="5" pb="8" bg="#E5E5E5">
          <Button
            onPress={handlePayOrder}
            width="full"
            height={45}
            bg="#00005C"
            borderRadius={12}
            alignItems="center"
            justifyContent="center">
            <Text color="white" fontWeight="bold">
              Pay Your Order
            </Text>
          </Button>
        </Box>
        <Footer />
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default PaymentPage;
