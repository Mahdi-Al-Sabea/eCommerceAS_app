import { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import {
  TextInput,
  Button,
  Text,
  useTheme,
  Card,
  Snackbar,
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/authSclice';
import serverIP from '../constants/serverIP';

// 🛡️ Yup Validation Schema
const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name too short')
    .required('Full name is required'),

  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),

  password: Yup.string()
    .min(4, 'Password must be at least 4 characters')
    .required('Password is required'),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords do not match')
    .required('Confirm password is required'),
});

export default function RegisterScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { colors } = useTheme();

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');

  const showError = (msg) => {
    setSnackbarMsg(msg);
    setSnackbarVisible(true);
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles(colors).container}>
        <Card style={styles(colors).card}>
          <Card.Content>
            <Text variant="headlineMedium" style={styles(colors).title}>
              Create Account
            </Text>

            <Formik
              initialValues={{
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
              }}
              validationSchema={RegisterSchema}
              validateOnChange
              validateOnBlur
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  const response = await fetch(`http://${serverIP}:4000/auth/signup`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      fullname: values.name,
                      email: values.email,
                      password: values.password,
                    }),
                  });

                  if (!response.ok) {
                    const error = await response.json();
                    showError(error.message || 'Registration failed');
                    setSubmitting(false);
                    return;
                  }

                  const data = await response.json();
                  dispatch(loginSuccess({ user: data.user, token: data.token }));

                } catch (error) {
                  showError(`Network error. Try again. ${error.message}`);
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
                isSubmitting,
              }) => (
                <>
                  {/* Full Name */}
                  <TextInput
                    label="Full Name"
                    mode="outlined"
                    value={values.name}
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    left={<TextInput.Icon icon="account" />}
                    style={styles(colors).input}
                    error={touched.name && !!errors.name}
                  />
                  {touched.name && errors.name && (
                    <Text style={styles(colors).errorText}>{errors.name}</Text>
                  )}

                  {/* Email */}
                  <TextInput
                    label="Email"
                    mode="outlined"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    left={<TextInput.Icon icon="email" />}
                    keyboardType="email-address"
                    style={styles(colors).input}
                    autoCapitalize="none"
                    error={touched.email && !!errors.email}
                  />
                  {touched.email && errors.email && (
                    <Text style={styles(colors).errorText}>{errors.email}</Text>
                  )}

                  {/* Password */}
                  <TextInput
                    label="Password"
                    mode="outlined"
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    secureTextEntry
                    left={<TextInput.Icon icon="lock" />}
                    style={styles(colors).input}
                    error={touched.password && !!errors.password}
                  />
                  {touched.password && errors.password && (
                    <Text style={styles(colors).errorText}>{errors.password}</Text>
                  )}

                  {/* Confirm Password */}
                  <TextInput
                    label="Confirm Password"
                    mode="outlined"
                    value={values.confirmPassword}
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    secureTextEntry
                    left={<TextInput.Icon icon="lock-check" />}
                    style={styles(colors).input}
                    error={touched.confirmPassword && !!errors.confirmPassword}
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <Text style={styles(colors).errorText}>{errors.confirmPassword}</Text>
                  )}

                  {/* Sign Up Button */}
                  <Button
                    mode="contained"
                    onPress={handleSubmit}
                    loading={isSubmitting}
                    disabled={isSubmitting}
                    style={styles(colors).button}
                  >
                    Sign Up
                  </Button>

                  {/* Go to Login */}
                  <Button
                    onPress={() => navigation.goBack()}
                    textColor={colors.primary}
                  >
                    Already have an account? Login
                  </Button>
                </>
              )}
            </Formik>
          </Card.Content>
        </Card>
      </ScrollView>

      {/* Snackbar for API errors */}
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        action={{ label: 'OK', onPress: () => setSnackbarVisible(false) }}
      >
        {snackbarMsg}
      </Snackbar>
    </>
  );
}

const styles = (colors) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      justifyContent: 'center',
      padding: 20,
      backgroundColor: colors.secondaryContainer,
    },
    card: {
      borderRadius: 16,
      elevation: 4,
      paddingVertical: 8,
    },
    title: {
      textAlign: 'center',
      marginBottom: 24,
      fontWeight: '600',
    },
    input: {
      marginBottom: 12,
    },
    button: {
      marginTop: 8,
      paddingVertical: 4,
    },
    errorText: {
      color: colors.error,
      marginBottom: 8,
      marginLeft: 4,
    },
  });
