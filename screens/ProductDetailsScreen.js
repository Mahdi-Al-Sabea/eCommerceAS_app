import { Text,TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";




function ProductDetailsScreen() {

    const navigation = useNavigation();

    return (
        <>
            <Text style={{marginTop: 200}}>Product Details Screen</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text>Go back</Text>
            </TouchableOpacity>
        </>

    );
}


export default ProductDetailsScreen;