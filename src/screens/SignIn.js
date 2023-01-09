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

const SignIn = () => {
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
      <View style={styles.containerForm}>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={SignInSchema}
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
                  <Text style={styles.textBtn}>Sign In</Text>
                </Pressable>
              </View>
            </>
          )}
        </Formik>
      </View>
      <View style={styles.containerText2}>
        <Text style={styles.text2}>
          Forgot your password? <Text style={styles.innerText2}>Reset now</Text>
        </Text>
      </View>
      <View style={styles.containerText2}>
        <Text style={styles.text2}>
          Don'nt have an account? <Text style={styles.innerText2}>Sign Up</Text>
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  text2: {
    textAlign: 'center',
  },
  innerText2: {
    color: '#00005C',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    paddingHorizontal: 20,
  },
});

export default SignIn;
