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
  Modal,
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
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import NavbarAdmin from '../components/NavbarAdmin';
import {Spinner} from 'native-base';

const Profile = () => {
  const token = useSelector(state => state?.auth?.token);
  const {id} = jwt_decode(token);
  const {role} = jwt_decode(token);
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

  // Image Picker
  const [showModal, setShowModal] = React.useState(false);
  const [image, setImage] = React.useState(null);
  const fileName = image?.assets && image.assets[0].fileName;
  const type = image?.assets && image.assets[0].type;
  const uri = image?.assets && image.assets[0].uri;
  const fileSize = image?.assets && image.assets[0].fileSize;

  const onImageLibraryPress = React.useCallback(() => {
    const options = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    };
    launchImageLibrary(options, setImage);
    setImage(null);
    setErrorPicture(null);
    setSuccessPicture(null);
  }, []);

  const onCameraPress = async () => {
    const results = await launchCamera();
    setImage(results);
  };

  // Open modal
  const openModal = () => {
    setShowModal(true);
    setErrorPicture(null);
    setSuccessPicture(null);
    setImage(null);
  };

  // Update Picture
  const [loadingPicture, setLoadingPicture] = React.useState(false);
  const [successPicture, setSuccessPicture] = React.useState(null);
  const [errorPicture, setErrorPicture] = React.useState(null);
  const updatePicture = async () => {
    setLoadingPicture(true);
    setSuccessPicture(null);
    setErrorPicture(null);
    if (image && fileSize <= 5024 * 1024) {
      try {
        const form = new FormData();
        form.append('picture', {
          name: fileName,
          type: type,
          uri: uri,
        });
        const response = await http(token).patch('/profile/update', form, {
          headers: {
            'Content-type': 'multipart/form-data',
          },
        });
        setLoadingPicture(false);
        setSuccessPicture('Successfully updated');
        setTimeout(() => {
          setShowModal(false);
        }, 3000);
        return response;
      } catch (error) {
        setLoadingPicture(false);
        console.log(error);
      }
    } else if (!image) {
      setLoadingPicture(false);
      setErrorPicture('Image not found');
    } else {
      setLoadingPicture(false);
      setErrorPicture('File to large');
    }
  };

  // Get data for update
  const [fullName, setFullName] = React.useState('');
  const firstName = String(fullName).split(' ')[0];
  const lastName = String(fullName).split(' ').slice(1).join(' ');
  const [email, setEmail] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');

  // Update Data User
  const [loadingInformation, setLoadingInformation] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState(null);
  const [errorMessage, setErrorMessage] = React.useState(null);
  const updateDataUser = async () => {
    setLoadingInformation(true);
    setSuccessMessage(null);
    setErrorMessage(null);
    try {
      const response = await http(token).patch(`/users/${id}`, {
        firstName,
        lastName,
        email,
        phoneNumber,
      });
      setLoadingInformation(false);
      setSuccessMessage('Successfully updated');
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
      return response;
    } catch (error) {
      console.log(error);
      setLoadingInformation(false);
      setErrorMessage(error?.response?.data?.message);
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  // Update Password User
  const [loadingPassword, setLoadingPassword] = React.useState(false);
  const [errorPassword, setErrorPassword] = React.useState(null);
  const [passwordSuccessMessage, setPasswordSuccessMessage] =
    React.useState('');
  const handleUpdatePassword = async values => {
    const {password, confirmPassword} = values;
    setLoadingPassword(true);
    setPasswordSuccessMessage(null);
    setErrorPassword(null);
    if (password === confirmPassword) {
      try {
        const response = await http(token).patch(`/users/${id}`, {
          password,
        });
        setLoadingPassword(false);
        setPasswordSuccessMessage('Successfully updated');
        setTimeout(() => {
          setPasswordSuccessMessage(false);
        }, 3000);
        return response;
      } catch (error) {
        console.log(error);
        setLoadingPassword(false);
        setErrorPassword(error?.response?.data?.message);
        setTimeout(() => {
          setErrorPassword(false);
        }, 3000);
      }
    } else {
      setLoadingPassword(false);
      setErrorPassword("Password and confirm password doesn't match");
      setTimeout(() => {
        setErrorPassword(false);
      }, 3000);
    }
  };
  const removeMessage = () => {
    setErrorPassword(null);
    setPasswordSuccessMessage(null);
  };
  return (
    <NativeBaseProvider>
      <ScrollView stickyHeaderIndices={[0]} stickyHeaderHiddenOnScroll={true}>
        {role === '2' ? <NavbarUser /> : <NavbarAdmin />}
        {role === '2' && (
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
        )}
        {user?.email ? (
          <>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
              <Modal.Content maxWidth="400px">
                <Modal.CloseButton />
                <Modal.Header>Upload Picture</Modal.Header>
                <Modal.Body>
                  <Button
                    onPress={onImageLibraryPress}
                    bg="#00005C"
                    borderRadius={16}>
                    <Text color="white">Browse a picture</Text>
                  </Button>
                  <Button
                    onPress={onCameraPress}
                    my="3"
                    bg="#00005C"
                    borderRadius={16}>
                    <Text color="white">Take a picture</Text>
                  </Button>
                  {image && (
                    <Box pb="3" justifyContent="center" alignItems="center">
                      <Image
                        source={{uri: uri}}
                        width="150"
                        height="150"
                        alt="preview image"
                        resizeMode="contain"
                      />
                    </Box>
                  )}
                  {loadingPicture && <Spinner pb="3" size="lg" />}
                  {successPicture && (
                    <Text pb="3" color="green.600" textAlign="center">
                      {successPicture}
                    </Text>
                  )}
                  {errorPicture && (
                    <Text pb="3" color="red.600" textAlign="center">
                      {errorPicture}
                    </Text>
                  )}
                  <Box alignItems="center">
                    <Button
                      onPress={updatePicture}
                      bg="#00005C"
                      width="150"
                      borderRadius={16}>
                      <Text color="white">Update Changes</Text>
                    </Button>
                  </Box>
                </Modal.Body>
              </Modal.Content>
            </Modal>
            <Stack px="5" pt="8" bg="#E5E5E5">
              <Box py="8" bg="white" borderRadius={16}>
                <Text px="5">INFO</Text>
                <Box py="8" alignItems="center" position="relative">
                  <Image
                    source={{
                      uri: user?.picture
                        ? user.picture
                        : 'https://res.cloudinary.com/dvzrmzldr/image/upload/v1673836551/Desain_tanpa_judul_bsia1l.png',
                    }}
                    width={150}
                    height={150}
                    alt="profile"
                    borderRadius="full"
                    mb="5"
                  />
                  <Pressable
                    onPress={openModal}
                    w="8"
                    h="8"
                    borderWidth={1}
                    borderRadius="full"
                    justifyContent="center"
                    alignItems="center"
                    backgroundColor="#00005C"
                    position="absolute"
                    top="145px"
                    right="100px">
                    <Icon name="edit-2" size={18} color="white" />
                  </Pressable>
                  <Text fontSize={20} fontWeight="bold">
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
                    width={180}
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
                  {loadingInformation && <Spinner pb="3" size="lg" />}
                  {successMessage && (
                    <Text color="green.600" textAlign="center">
                      {successMessage}
                    </Text>
                  )}
                  {errorMessage && (
                    <Text color="red.600" textAlign="center">
                      {errorMessage}
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
                        {loadingPassword && <Spinner pb="3" size="lg" />}
                        {errorPassword && (
                          <Text color="red.600" textAlign="center" mt="5">
                            {errorPassword}
                          </Text>
                        )}
                        {passwordSuccessMessage && (
                          <Text color="green.600" textAlign="center" mt="5">
                            {passwordSuccessMessage}
                          </Text>
                        )}
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
