import React, { useState } from 'react';
import { View, StyleSheet,ScrollView } from 'react-native';
import { TextInput, Button, Text, useTheme, Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
export default function RegisterScreen() {



const navigation = useNavigation();
const { colors } = useTheme();


const styles = StyleSheet.create({
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
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
    paddingVertical: 4,
  },
});


  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {

    console.log({ name, email, password, confirmPassword });
    navigation.replace('Main'); // redirect after success
  };

  return (

      <ScrollView contentContainerStyle={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="headlineMedium" style={styles.title}>
              Create Account
            </Text>

            <TextInput
              label="Full Name"
              mode="outlined"
              value={name}
              onChangeText={setName}
              left={<TextInput.Icon icon="account" />}
              style={styles.input}
            />
            <TextInput
              label="Email"
              mode="outlined"
              value={email}
              onChangeText={setEmail}
              left={<TextInput.Icon icon="email" />}
              keyboardType="email-address"
              style={styles.input}
              autoCapitalize="none"
            />
            <TextInput
              label="Password"
              mode="outlined"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              left={<TextInput.Icon icon="lock" />}
              style={styles.input}
            />
            <TextInput
              label="Confirm Password"
              mode="outlined"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              left={<TextInput.Icon icon="lock-check" />}
              style={styles.input}
            />

            <Button
              mode="contained"
              onPress={handleRegister}
              style={styles.button}
            >
              Sign Up
            </Button>

            <Button
              onPress={() => navigation.goBack()}
              textColor={colors.primary}
            >
              Already have an account? Login
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>
  );
}

