import { Text,TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";




function MainScreen() {

    const navigation = useNavigation();

    return (
        <>
            <Text style={{marginTop: 200}}>Main Screen</Text>
            <TouchableOpacity onPress={() => navigation.navigate('ProductDetailsScreen')}>
                <Text>Go to Details</Text>
            </TouchableOpacity>
        </>

    );
}


export default MainScreen;