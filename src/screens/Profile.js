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
} from 'native-base';
import React from 'react';
import NavbarUser from '../components/NavbarUser';
import {Formik} from 'formik';
import * as Yup from 'yup';
import YupPasword from 'yup-password';
YupPasword(Yup);
import Icon from 'react-native-vector-icons/Feather';
import Footer from '../components/Footer';

const Profile = () => {
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
  return (
    <NativeBaseProvider>
      <ScrollView stickyHeaderIndices={[0]} stickyHeaderHiddenOnScroll={true}>
        <NavbarUser />
        <HStack px="5" bg="white">
          <Pressable width="50%">
            <Text
              fontSize={16}
              textAlign="center"
              py="5"
              borderBottomWidth={2}
              borderBottomColor="#00005C">
              Details Account
            </Text>
          </Pressable>
          <Pressable width="50%">
            <Text fontSize={16} textAlign="center" py="5">
              Order History
            </Text>
          </Pressable>
        </HStack>
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
                Jonas El Rodriguez
              </Text>
              <Text>Moviegoers</Text>
            </Box>
            <Box
              pt="8"
              alignItems="center"
              borderTopWidth={1}
              borderTopColor="#DEDEDE">
              <Button width={160} borderRadius={16} bg="#00005C">
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
            <Stack space={5} bg="white" py="8" borderRadius={16}>
              <Box>
                <Text mb="1">Full Name</Text>
                <Input
                  defaultValue="Jonas El Rodriguez"
                  fontSize={14}
                  borderRadius={12}
                  borderColor="#DEDEDE"
                />
              </Box>
              <Box>
                <Text mb="1">Email</Text>
                <Input
                  defaultValue="jonasrodri123@gmail.com"
                  fontSize={14}
                  borderRadius={12}
                  borderColor="#DEDEDE"
                />
              </Box>
              <Box>
                <Text mb="1">Phone Number</Text>
                <Input
                  defaultValue="081445687121"
                  fontSize={14}
                  borderRadius={12}
                  borderColor="#DEDEDE"
                />
              </Box>
            </Stack>
          </Box>
          <Box
            py="8"
            alignItems="center"
            borderTopWidth={1}
            borderTopColor="#DEDEDE">
            <Button width="full" borderRadius={16} bg="#00005C">
              <Text color="white">Update Changes</Text>
            </Button>
          </Box>
        </Stack>
        <Stack px="5" pb="8" pt="3" bg="#E5E5E5">
          <Box bg="white" px="5" py="8" borderRadius={16}>
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
                  console.log(values);
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
                        onChangeText={handleChange('confirmPassword')}
                        onBlur={handleBlur('confirmPassword')}
                        value={values.confirmPassword}
                        secureTextEntry={isConfirmPasswordSecure ? true : false}
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
                      <Text>{errors.confirmPassword}</Text>
                    ) : null}
                  </>
                )}
              </Formik>
            </Box>
          </Box>
          <Box
            pt="8"
            pb="3"
            alignItems="center"
            borderTopWidth={1}
            borderTopColor="#DEDEDE">
            <Button width="full" borderRadius={16} bg="#00005C">
              <Text color="white">Update Changes</Text>
            </Button>
          </Box>
        </Stack>
        <Footer />
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default Profile;
