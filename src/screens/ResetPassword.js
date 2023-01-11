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

const ResetPassword = () => {
  const navigation = useNavigation();
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

  // Handle Reset Password
  const handleResetPassword = () => {
    navigation.navigate('SignIn');
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
        <Text style={styles.h1}>Set Password</Text>
        <Text style={styles.text}>set your new password</Text>
      </View>
      <View style={styles.containerForm}>
        <Formik
          initialValues={{
            password: '',
            confirmPassword: '',
          }}
          validationSchema={ResetPasswordSchema}
          onSubmit={values => {
            handleResetPassword(values);
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
              <View style={styles.containerInput}>
                <Text style={styles.text}>Confirm Password</Text>
                <TextInput
                  name="confirmPassword"
                  keyboardType="text"
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  secureTextEntry={isConfirmPasswordSecure ? true : false}
                  autoCapitalize="none"
                  style={styles.input}
                  placeholder="Write your confirm password"
                />
                <Icon
                  onPress={showConfirmPassword}
                  name={iconEyeConfirm ? 'eye' : 'eye-off'}
                  style={styles.icon}
                  size={20}
                />
              </View>
              {errors.confirmPassword && touched.confirmPassword ? (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              ) : null}
              <View style={styles.containerBtn}>
                <Pressable onPress={handleSubmit} style={styles.btn}>
                  <Text style={styles.textBtn}>Submit</Text>
                </Pressable>
              </View>
            </>
          )}
        </Formik>
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

export default ResetPassword;
