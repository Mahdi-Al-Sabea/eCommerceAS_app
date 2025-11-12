import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Text, useTheme, Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
export default function LoginScreen() {



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

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
 
    console.log({ email, password });
    navigation.replace('Main'); // redirect after success
  };

  return (

      <ScrollView contentContainerStyle={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="headlineMedium" style={styles.title}>
              Login
            </Text>


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

            <Button
              mode="contained"
              onPress={handleLogin}
              style={styles.button}
            >
              Login
            </Button>

            <Button
              onPress={() => navigation.navigate('Register')}
              textColor={colors.primary}
            >
              Don't have an account? Register
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>
  );
}

