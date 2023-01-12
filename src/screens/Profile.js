/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  HStack,
  NativeBaseProvider,
  ScrollView,
  Text,
  Image,
  Pressable,
  Button,
  Stack,
  Input,
  Skeleton,
  VStack,
  Center,
} from 'native-base';
import React from 'react';
import NavbarUser from '../components/NavbarUser';
import {Formik} from 'formik';
import * as Yup from 'yup';
import YupPasword from 'yup-password';
YupPasword(Yup);
import Icon from 'react-native-vector-icons/Feather';
import Footer from '../components/Footer';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import jwt_decode from 'jwt-decode';
import http from '../helpers/http';
import {logout as logoutAction} from '../redux/reducers/auth';
import {transactionLogout as transactionLogoutAction} from '../redux/reducers/transaction';

const Profile = () => {
  const token = useSelector(state => state?.auth?.token);
  const {id} = jwt_decode(token);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // Get user by id
  const [user, setUser] = React.useState({});
  React.useEffect(() => {
    getUser().then(response => {
      setUser(response?.data?.results);
    });
  }, [user]);
  const getUser = async () => {
    try {
      const response = await http(token).get(`/users/${id}`);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  // Form Validation
  const ResetPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .password()
      .min(8, 'Min lenght 8')
      .minLowercase(1, 'Min lowercase 1')
      .minUppercase(1, 'Min uppercase 1')
      .minSymbols(1, 'Min symbol 1')
      .minNumbers(1, 'Min number 1'),
    confirmPassword: Yup.string().required('Required'),
  });

  // Show or hide password
  const [isPasswordSecure, setIspasswordSecure] = React.useState(true);
  const [iconEye, setIconEye] = React.useState(true);
  const [isConfirmPasswordSecure, setIsConfirmpasswordSecure] =
    React.useState(true);
  const [iconEyeConfirm, setIconEyeConfirm] = React.useState(true);
  const showPassword = () => {
    if (iconEye === true) {
      setIspasswordSecure(false);
      setIconEye(false);
    } else {
      setIspasswordSecure(true);
      setIconEye(true);
    }
  };
  const showConfirmPassword = () => {
    if (iconEyeConfirm === true) {
      setIsConfirmpasswordSecure(false);
      setIconEyeConfirm(false);
    } else {
      setIsConfirmpasswordSecure(true);
      setIconEyeConfirm(true);
    }
  };

  // handleLogout
  const handleLogout = () => {
    dispatch(logoutAction());
    dispatch(transactionLogoutAction());
  };

  // Get data for update
  const [fullName, setFullName] = React.useState('');
  const firstName = String(fullName).split(' ')[0];
  const lastName = String(fullName).split(' ').slice(1).join(' ');
  const [email, setEmail] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');

  // Update Data User
  const [successMessage, setSuccessMessage] = React.useState('');
  const updateDataUser = async () => {
    try {
      // const form = new FormData();
      // form.append('picture', picture)
      // form.append('firstName', firstName);
      // form.append('lastName', lastName);
      // form.append('email', email);
      // form.append('phoneNumber', phoneNumber);
      const response = await http(token).patch('/profile/update', {
        firstName,
        lastName,
        email,
        phoneNumber,
      });
      setSuccessMessage('Successfully updated');
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  // Update Password User
  const [errorPassword, setErrorPassword] = React.useState('');
  const [passwordSuccessMessage, setPasswordSuccessMessage] =
    React.useState('');
  const handleUpdatePassword = async values => {
    const {password, confirmPassword} = values;
    if (password === confirmPassword) {
      try {
        const response = await http(token).patch('/profile/update', {
          password,
        });
        setPasswordSuccessMessage('Successfully updated');
        return response;
      } catch (error) {
        console.log(error);
      }
    } else {
      setErrorPassword("Password and confirm password doesn't match");
    }
  };
  const removeMessage = () => {
    setErrorPassword('');
    setPasswordSuccessMessage('');
  };
  return (
    <NativeBaseProvider>
      <ScrollView stickyHeaderIndices={[0]} stickyHeaderHiddenOnScroll={true}>
        <NavbarUser />
        <HStack px="5" bg="white">
          <Pressable width="50%">
            <Text
              fontSize={16}
              fontWeight="bold"
              textAlign="center"
              py="5"
              borderBottomWidth={2}
              borderBottomColor="#00005C">
              Details Account
            </Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('OrderHistory')}
            width="50%">
            <Text fontSize={16} textAlign="center" py="5">
              Order History
            </Text>
          </Pressable>
        </HStack>
        {user?.firstName ? (
          <>
            <Stack px="5" pt="8" bg="#E5E5E5">
              <Box py="8" bg="white" borderRadius={16}>
                <Text px="5">INFO</Text>
                <Box py="8" alignItems="center">
                  <Image
                    source={{uri: 'https://picsum.photos/200/300'}}
                    width={120}
                    height={120}
                    alt="profile"
                    borderRadius="full"
                    mb="5"
                  />
                  <Text fontSize={18} fontWeight="bold">
                    {`${user?.firstName} ${user?.lastName}`}
                  </Text>
                  <Text>Moviegoers</Text>
                </Box>
                <Box
                  pt="8"
                  alignItems="center"
                  borderTopWidth={1}
                  borderTopColor="#DEDEDE">
                  <Button
                    onPress={handleLogout}
                    width={160}
                    borderRadius={16}
                    bg="#00005C">
                    <Text color="white">Logout</Text>
                  </Button>
                </Box>
              </Box>
            </Stack>
            <Stack px="5" pt="8" bg="#E5E5E5">
              <Text fontSize={16} fontWeight="bold" mb="3">
                Account Settings
              </Text>
              <Box bg="white" px="5" py="8" borderRadius={16}>
                <Text pb="5" borderBottomWidth={1} borderBottomColor="#DEDEDE">
                  Details Information
                </Text>
                <Stack space={5} bg="white" pt="8" borderRadius={16}>
                  <Box>
                    <Text mb="1">Full Name</Text>
                    <Input
                      onFocus={() => setSuccessMessage('')}
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
                      onFocus={() => setSuccessMessage('')}
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
                      onFocus={() => setSuccessMessage('')}
                      onChangeText={value => setPhoneNumber(value)}
                      defaultValue={user?.phoneNumber}
                      fontSize={14}
                      borderRadius={12}
                      borderColor="#DEDEDE"
                    />
                  </Box>
                  {successMessage && (
                    <Text color="green.600" textAlign="center">
                      {successMessage}
                    </Text>
                  )}
                </Stack>
              </Box>
              <Box py="8" alignItems="center">
                <Button
                  onPress={updateDataUser}
                  py="3"
                  width="full"
                  borderRadius={16}
                  bg="#00005C">
                  <Text color="white">Update Changes</Text>
                </Button>
              </Box>
            </Stack>
            <Stack px="5" pb="8" pt="3" bg="#E5E5E5">
              <Box bg="white" px="5" pt="8" borderRadius={16}>
                <Text pb="5" borderBottomWidth={1} borderBottomColor="#DEDEDE">
                  Account and Privacy
                </Text>
                <Box py="5">
                  <Formik
                    initialValues={{
                      password: '',
                      confirmPassword: '',
                    }}
                    validationSchema={ResetPasswordSchema}
                    onSubmit={values => {
                      handleUpdatePassword(values);
                    }}>
                    {({
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      values,
                      errors,
                      touched,
                    }) => (
                      <>
                        <Box position="relative">
                          <Text mb="1">Password</Text>
                          <Input
                            name="password"
                            keyboardType="text"
                            onFocus={() => removeMessage()}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            secureTextEntry={isPasswordSecure ? true : false}
                            autoCapitalize="none"
                            defaultValue="Jonas El Rodriguez"
                            fontSize={14}
                            borderRadius={12}
                            borderColor="#DEDEDE"
                            placeholder="Write your password"
                          />
                          <Box position="absolute" right={3} bottom={3}>
                            <Icon
                              onPress={showPassword}
                              name={iconEye ? 'eye' : 'eye-off'}
                              size={20}
                            />
                          </Box>
                        </Box>
                        {errors.password && touched.password ? (
                          <Text color="red.600">{errors.password}</Text>
                        ) : null}
                        <Box position="relative" mt="5">
                          <Text mb="1">Confirm Password</Text>
                          <Input
                            name="confirmPassword"
                            keyboardType="text"
                            onFocus={() => removeMessage()}
                            onChangeText={handleChange('confirmPassword')}
                            onBlur={handleBlur('confirmPassword')}
                            value={values.confirmPassword}
                            secureTextEntry={
                              isConfirmPasswordSecure ? true : false
                            }
                            autoCapitalize="none"
                            defaultValue="Jonas El Rodriguez"
                            fontSize={14}
                            borderRadius={12}
                            borderColor="#DEDEDE"
                            placeholder="Write your confirm password"
                          />
                          <Box position="absolute" right={3} bottom={3}>
                            <Icon
                              onPress={showConfirmPassword}
                              name={iconEyeConfirm ? 'eye' : 'eye-off'}
                              size={20}
                            />
                          </Box>
                        </Box>
                        {errors.confirmPassword && touched.confirmPassword ? (
                          <Text color="red.600">{errors.confirmPassword}</Text>
                        ) : null}
                        {errorPassword && (
                          <Text color="red.600">{errorPassword}</Text>
                        )}
                        {passwordSuccessMessage && (
                          <Text color="green.600">
                            {passwordSuccessMessage}
                          </Text>
                        )}
                        <Box pt="8" pb="3" alignItems="center">
                          <Button
                            onPress={handleSubmit}
                            py="3"
                            width="full"
                            borderRadius={16}
                            bg="#00005C">
                            <Text color="white">Update Changes</Text>
                          </Button>
                        </Box>
                      </>
                    )}
                  </Formik>
                </Box>
              </Box>
            </Stack>
          </>
        ) : (
          <Center w="100%" py="10">
            <VStack
              w="90%"
              maxW="400"
              borderWidth="1"
              space={6}
              rounded="md"
              alignItems="center"
              _dark={{
                borderColor: 'coolGray.500',
              }}
              _light={{
                borderColor: 'coolGray.200',
              }}>
              <Skeleton h="150" />
              <Skeleton
                borderWidth={1}
                borderColor="coolGray.200"
                endColor="warmGray.50"
                size="40"
                rounded="full"
                mt="-70"
              />
              <HStack space="2">
                <Skeleton size="5" rounded="full" />
                <Skeleton size="5" rounded="full" />
                <Skeleton size="5" rounded="full" />
                <Skeleton size="5" rounded="full" />
                <Skeleton size="5" rounded="full" />
              </HStack>
              <Skeleton.Text lines={3} h="100" alignItems="center" px="12" />
              <Skeleton mb="3" w="40" h="150" py="10" rounded="20" />
            </VStack>
          </Center>
        )}
        <Footer />
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default Profile;
