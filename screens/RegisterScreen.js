import { Text,TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";




function RegisterScreen() {

    const navigation = useNavigation();

    return (
        <>
            <Text style={{marginTop: 200}}>Register Screen</Text>
            <TouchableOpacity onPress={() => navigation.replace('Main')}>
                <Text>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text>Go to Login</Text>
            </TouchableOpacity>

        </>

    );
}


export default RegisterScreen;