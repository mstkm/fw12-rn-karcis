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

const ForgotPassword = () => {
  // Form Validation
  const SignInSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
  });
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
      <View style={styles.containerForm}>
        <Formik
          initialValues={{
            email: '',
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
              <View style={styles.containerBtn}>
                <Pressable onPress={handleSubmit} style={styles.btn}>
                  <Text style={styles.textBtn}>Sign In</Text>
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
