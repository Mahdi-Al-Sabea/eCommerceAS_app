import { Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function LoginScreen() {
  const navigation = useNavigation();

  return (
    <>
      <Text style={{marginTop: 200}}>Login Screen</Text>
      <TouchableOpacity onPress={() => navigation.replace('Main')}>
        <Text>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text>Go to Register</Text>
      </TouchableOpacity>
    </>
  );
}

export default LoginScreen;
