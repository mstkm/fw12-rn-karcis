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
import {useNavigation} from '@react-navigation/native';
import http from '../helpers/http';
import Icon from 'react-native-vector-icons/Feather';
import {useDispatch} from 'react-redux';
import {resetPassword as resetPasswordAction} from '../redux/reducers/resetPassword';

const ForgotPassword = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // Form Validation
  const SignInSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
  });

  // Check email
  const [users, setUsers] = React.useState([]);
  const emailUsers = users?.map(user => user.email);
  React.useEffect(() => {
    getUsers().then(response => {
      setUsers(response?.data?.results);
    });
  }, []);
  const getUsers = async () => {
    try {
      const response = await http().get('/users');
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  // Handle Forgot Password
  const [errorMessage, setErrorMessage] = React.useState(null);
  const handleForgotPassword = async value => {
    const email = value.email;
    if (emailUsers.includes(email)) {
      try {
        await http().post('/auth/forgotPassword', {email});
        dispatch(resetPasswordAction({email}));
        navigation.navigate('ResetPassword');
      } catch (error) {
        console.log(error);
      }
    } else {
      setErrorMessage('Email is not registered');
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
        <Text style={styles.h1}>Forgot Password</Text>
        <Text style={styles.text}>we'll send a link to your email shortly</Text>
      </View>
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
          }}
          validationSchema={SignInSchema}
          onSubmit={value => {
            handleForgotPassword(value);
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
                  onFocus={() => setErrorMessage(null)}
                  value={values.email}
                  autoCapitalize="none"
                  style={styles.input}
                  placeholder="Write your email"
                />
              </View>
              {errors?.email && touched?.email ? (
                <Text style={styles.errorText}>{errors.email}</Text>
              ) : null}
              <View style={styles.containerBtn}>
                <Pressable onPress={handleSubmit} style={styles.btn}>
                  <Text style={styles.textBtn}>Send</Text>
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
  errorText: {
    color: 'red',
    fontSize: 12,
    paddingHorizontal: 20,
  },
});

export default ForgotPassword;
