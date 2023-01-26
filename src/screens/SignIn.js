/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import YupPasword from 'yup-password';
YupPasword(Yup);
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import http from '../helpers/http';
import {useDispatch} from 'react-redux';
import {login as loginAction} from '../redux/reducers/auth';
import {Spinner} from 'native-base';

const SignIn = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // Form Validation
  const SignInSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
      .password()
      .min(8, 'Min lenght 8')
      .minLowercase(1, 'Min lowercase 1')
      .minUppercase(1, 'Min uppercase 1')
      .minSymbols(1, 'Min symbol 1')
      .minNumbers(1, 'Min number 1'),
  });

  // Show or hide password
  const [isPasswordSecure, setIspasswordSecure] = React.useState(true);
  const [iconEye, setIconEye] = React.useState(true);
  const showPassword = () => {
    if (iconEye === true) {
      setIspasswordSecure(false);
      setIconEye(false);
    } else {
      setIspasswordSecure(true);
      setIconEye(true);
    }
  };

  // Login
  const [loadingSignin, setLoadingSignin] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState(null);
  const [errorMessage, setErrorMessage] = React.useState(null);
  const login = async form => {
    setLoadingSignin(true);
    setSuccessMessage(null);
    setErrorMessage(null);
    try {
      const response = await http().post('/auth/login', form);
      const token = response?.data?.results;
      setLoadingSignin(false);
      setSuccessMessage(response?.data?.message);
      setTimeout(() => {
        dispatch(loginAction(token));
      }, 1000);
    } catch (error) {
      console.log(error);
      setLoadingSignin(false);
      setErrorMessage(error?.response?.data?.message);
    }
  };
  return (
    <ScrollView>
      <View style={styles.containerImage}>
        <Image
          source={require('../images/bannerKarcis.png')}
          style={styles.image}
        />
      </View>
      <View style={styles.containerHead}>
        <Text style={styles.h1}>Sign In</Text>
        <Text style={styles.text}>
          Sign in with your data that you entered during your registration
        </Text>
      </View>
      {loadingSignin && <Spinner style={{marginTop: 20}} size="lg" />}
      {successMessage && (
        <>
          <View style={styles.alertSuccess}>
            <Icon name="alert-circle" size={20} color="black" />
            <Text style={styles.alertMessage}>{successMessage}</Text>
          </View>
        </>
      )}
      {errorMessage && (
        <View style={styles.alertError}>
          <Icon name="alert-triangle" size={20} color="black" />
          <Text style={styles.alertMessage}>{errorMessage}</Text>
        </View>
      )}
      <View style={styles.containerForm}>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={SignInSchema}
          onSubmit={values => {
            login(values);
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
              <View style={styles.containerInput}>
                <Text style={styles.text}>Email</Text>
                <TextInput
                  name="email"
                  keyboardType="text"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  onFocus={() => setErrorMessage(false)}
                  value={values.email}
                  autoCapitalize="none"
                  style={styles.input}
                  placeholder="Write your email"
                />
              </View>
              {errors.email && touched.email ? (
                <Text style={styles.errorText}>{errors.email}</Text>
              ) : null}
              <View style={styles.containerInput}>
                <Text style={styles.text}>Password</Text>
                <TextInput
                  name="password"
                  keyboardType="text"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  onFocus={() => setErrorMessage(false)}
                  value={values.password}
                  secureTextEntry={isPasswordSecure ? true : false}
                  autoCapitalize="none"
                  style={styles.input}
                  placeholder="Write your password"
                />
                <Icon
                  onPress={showPassword}
                  name={iconEye ? 'eye' : 'eye-off'}
                  style={styles.icon}
                  size={20}
                />
              </View>
              {errors.password && touched.password ? (
                <Text style={styles.errorText}>{errors.password}</Text>
              ) : null}
              <View style={styles.containerBtn}>
                <Pressable onPress={handleSubmit} style={styles.btn}>
                  <Text style={styles.textBtn}>Sign In</Text>
                </Pressable>
              </View>
            </>
          )}
        </Formik>
      </View>
      <View style={styles.containerText2}>
        <Text style={styles.text2}>Forgot your password? </Text>
        <Pressable onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.innerText2}>Reset now</Text>
        </Pressable>
      </View>
      <View style={styles.containerText2}>
        <Text style={styles.text2}>Don't have an account? </Text>
        <Pressable onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.innerText2}>Sign Up</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  alertSuccess: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 30,
    borderWidth: 1,
    height: 50,
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 16,
    backgroundColor: '#42BA96',
    borderColor: 'green',
  },
  alertError: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 30,
    borderWidth: 1,
    height: 50,
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 16,
    backgroundColor: '#FF4D4D',
    borderColor: 'red',
  },
  alertMessage: {
    color: 'black',
    marginLeft: 20,
  },
  containerImage: {
    paddingHorizontal: 20,
    marginTop: 50,
  },
  image: {
    width: 150,
    height: 50,
    resizeMode: 'contain',
  },
  containerHead: {
    paddingHorizontal: 20,
    marginTop: 40,
  },
  h1: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
  },
  text: {
    color: 'black',
    fontSize: 16,
  },
  containerForm: {
    marginTop: 30,
  },
  containerInput: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  input: {
    height: 50,
    marginVertical: 5,
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
    fontSize: 16,
  },
  icon: {
    position: 'absolute',
    bottom: 20,
    right: 30,
  },
  containerBtn: {
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  btn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#00005C',
    borderRadius: 12,
  },
  textBtn: {
    fontWeight: 'bold',
    color: 'white',
  },
  containerText2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  text2: {
    textAlign: 'center',
  },
  innerText2: {
    color: '#00005C',
    textDecorationLine: 'underline',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    paddingHorizontal: 20,
  },
});

export default SignIn;
