import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import YupPasword from 'yup-password';
YupPasword(Yup);
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

const SignUp = () => {
  const navigation = useNavigation();
  // Form Validation
  const phoneRegExpID = /^(^08)(\d{8,10})$/;
  const SignUpSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    lastName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    phoneNumber: Yup.string()
      .matches(phoneRegExpID, 'Invalid phone number')
      .required('Required'),
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
  const screenHeight = Dimensions.get('window').height;
  return (
    <View style={{height: screenHeight}}>
      <KeyboardAvoidingView behavior="padding">
        <ScrollView>
          <View style={styles.containerImage}>
            <Image
              source={require('../images/bannerKarcis.png')}
              style={styles.image}
            />
          </View>
          <View style={styles.containerHead}>
            <Text style={styles.h1}>Sign Up</Text>
            <Text style={styles.text}>Fill your additional details</Text>
          </View>
          <View style={styles.containerForm}>
            <Formik
              initialValues={{
                firstName: '',
                lastName: '',
                phoneNumber: '',
                email: '',
                password: '',
              }}
              validationSchema={SignUpSchema}
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
                  <View style={styles.containerInput}>
                    <Text style={styles.text}>First Name</Text>
                    <TextInput
                      name="firstName"
                      keyboardType="text"
                      onChangeText={handleChange('firstName')}
                      onBlur={handleBlur('firstName')}
                      value={values.firstName}
                      style={styles.input}
                      placeholder="Write your first name"
                    />
                  </View>
                  {errors.firstName && touched.firstName ? (
                    <Text style={styles.errorText}>{errors.firstName}</Text>
                  ) : null}
                  <View style={styles.containerInput}>
                    <Text style={styles.text}>Last Name</Text>
                    <TextInput
                      name="lastName"
                      keyboardType="text"
                      onChangeText={handleChange('lastName')}
                      onBlur={handleBlur('lastName')}
                      value={values.lastName}
                      style={styles.input}
                      placeholder="Write your last name"
                    />
                  </View>
                  {errors.lastName && touched.lastName ? (
                    <Text style={styles.errorText}>{errors.lastName}</Text>
                  ) : null}
                  <View style={styles.containerInput}>
                    <Text style={styles.text}>Phone Number</Text>
                    <TextInput
                      name="phoneNumber"
                      keyboardType="numeric"
                      onChangeText={handleChange('phoneNumber')}
                      onBlur={handleBlur('phoneNumber')}
                      value={values.phoneNumber}
                      style={styles.input}
                      placeholder="Write your phone number"
                    />
                  </View>
                  {errors.phoneNumber && touched.phoneNumber ? (
                    <Text style={styles.errorText}>{errors.phoneNumber}</Text>
                  ) : null}
                  <View style={styles.containerInput}>
                    <Text style={styles.text}>Email</Text>
                    <TextInput
                      name="email"
                      keyboardType="text"
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
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
                      <Text style={styles.textBtn}>Sign Up</Text>
                    </Pressable>
                  </View>
                </>
              )}
            </Formik>
            <View style={styles.containerText2}>
              <Text style={styles.text2}>Don't have an account? </Text>
              <Pressable onPress={() => navigation.navigate('SignIn')}>
                <Text style={styles.innerText2}>Sign In</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  containerImage: {
    paddingHorizontal: 20,
    paddingTop: 50,
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
    marginBottom: 50,
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

export default SignUp;
