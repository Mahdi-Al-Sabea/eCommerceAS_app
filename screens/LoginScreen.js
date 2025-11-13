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
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/authSclice';
import { Formik } from 'formik';
import * as Yup from 'yup';
import serverIP from '../constants/serverIP';

// 🔒 Yup validation schema
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),

  password: Yup.string()
    .min(4, 'Password too short')
    .required('Password is required'),
});

export default function LoginScreen() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const dispatch = useDispatch();

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
              Login
            </Text>

            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={LoginSchema}
              validateOnChange={true}
              validateOnBlur={true}
              onSubmit={async (values, { setSubmitting }) => {
                console.log('Logging in with:', values);
                try {
                  const response = await fetch(`http://${serverIP}:4000/auth/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(values),
                  });

                  if (!response.ok) {
                    const error = await response.json();
                    showError(error.message || 'Login failed');
                    setSubmitting(false);
                    return;
                  }

                  const data = await response.json();
                  dispatch(loginSuccess({ user: data.user, token: data.token }));
                } catch (err) {
                  showError(`Network error. Try again. ${err.message}`);
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
                  {/* Email Field */}
                  <TextInput
                    label="Email"
                    mode="outlined"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    left={<TextInput.Icon icon="email" />}
                    style={styles(colors).input}
                    error={touched.email && !!errors.email}
                    autoCapitalize="none"
                    keyboardType="email-address"
                  />
                  {touched.email && errors.email && (
                    <Text style={styles(colors).errorText}>{errors.email}</Text>
                  )}

                  {/* Password Field */}
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

                  {/* Login Button */}
                  <Button
                    mode="contained"
                    onPress={handleSubmit}
                    loading={isSubmitting}
                    disabled={isSubmitting}
                    style={styles(colors).button}
                  >
                    Login
                  </Button>

                  {/* Go to Register */}
                  <Button
                    onPress={() => navigation.navigate('Register')}
                    textColor={colors.primary}
                  >
                    Don't have an account? Register
                  </Button>
                </>
              )}
            </Formik>
          </Card.Content>
        </Card>
      </ScrollView>

      {/* Snackbar for backend/API errors */}
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


