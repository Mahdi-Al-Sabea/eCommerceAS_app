import { Text,TouchableOpacity } from "react-native";
import { View, StyleSheet,ScrollView } from 'react-native';
import { TextInput, Button, useTheme, Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useEffect,useState } from "react";
import WeatherCard from "../Components/WeatherComponent";
import { SafeAreaView } from "react-native-safe-area-context";

function MainScreen() {

    const { colors } = useTheme();

    const [products, setProducts] = useState([]);

    const navigation = useNavigation();

    useEffect(() => {
        fetchProducts();
    }, []);


    const fetchProducts = async () => {
        try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        console.log(data);
        setProducts(data); 
        } catch (error) {
            
        }

    };


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: colors.secondaryContainer,
  },
  button: {
    marginTop: 8,
    paddingVertical: 4,
  },
});



    return (
        <>
        <SafeAreaView style={{ flex: 1 }}>
           <ScrollView contentContainerStyle={styles.container}>
            <WeatherCard />
            {products.map((product) => (
                <Card key={product.id} style={{margin:10}} onPress={() => navigation.navigate('ProductDetailsScreen', { productId: product.id })}>
                    <Card.Cover source={{ uri: product.image }} />
                    <Card.Title title={product.title} subtitle={`$${product.price}`} />
                     
                </Card>
            ))}
            <Button style={styles.button} mode="contained" onPress={() => {navigation.replace('Auth')}}>Logout</Button>
            
           </ScrollView>
        </SafeAreaView>



          

        </>

    );
}


export default MainScreen;