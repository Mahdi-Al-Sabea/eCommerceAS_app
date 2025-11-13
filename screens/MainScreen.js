import { View, StyleSheet, FlatList } from 'react-native';
import { Button, useTheme, ActivityIndicator } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import WeatherCard from '../Components/WeatherCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/authSclice';
import ProductCard from '../Components/ProductCard';

export default function MainScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      setProducts(data);
      console.log('Fetched products:', data);
    } catch (error) {
      console.error('Products fetch error', error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <ProductCard
      item={item}
      onPress={() =>
        navigation.navigate('ProductDetailsScreen', { productId: item.id })
      }
    />
  );

  if (loading || products.length === 0)
    return (
      <View style={styles(colors).loadingContainer}>
        <ActivityIndicator size={'large'} animating={true} />
      </View>
    );

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.secondaryContainer }}
    >
      <FlatList
        ListHeaderComponent={<WeatherCard />}
        data={products}
        renderItem={renderItem}
        numColumns={2}
        keyExtractor={item => item.id.toString()}
        columnWrapperStyle={styles(colors).row}
        contentContainerStyle={styles(colors).container}
        refreshing={loading}
        onRefresh={fetchProducts}
      />

      <Button
        mode="contained"
        onPress={() => dispatch(logout())}
        style={styles(colors).logout}
      >
        Logout
      </Button>
    </SafeAreaView>
  );
}

const styles = colors =>
  StyleSheet.create({
    logout: {
      margin: 20,
    },
    row: {
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    container: {
      padding: 10,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      paddingVertical: 20,
    },
  });
