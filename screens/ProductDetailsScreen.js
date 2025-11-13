import { useState,useEffect } from 'react';
import { ScrollView, Image, StyleSheet, View } from 'react-native';
import { Card, Text, Button, Chip, useTheme,ActivityIndicator } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProductDetailsScreen = ({ route, navigation }) => {

    
  const { productId } = route.params;
  const { colors } = useTheme();


  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Fetch product details when component mounts
    fetchProductDetails();
  }, []);

    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        const data = await response.json();
        console.log(data);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product details:', error);
        navigation.goBack();
      }
    };


    if (loading) {
      return (<ActivityIndicator style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} size='large' animating={true} />);
    } else{


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fafafa' }}>
      <ScrollView>
        <Card style={styles.card} elevation={3}>
          {/* 🖼 Product Image */}
          <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
        <Card.Content>
          {/* 🏷 Title */}
          <Text variant="titleLarge" style={styles.title}>
            {product.title}
          </Text>

          {/* 📦 Category */}
          <Chip
            icon="tag-outline"
            style={styles.chip}
            textStyle={{ fontSize: 13 }}
          >
            {product.category}
          </Chip>

          {/* 💰 Price */}
          <View style={styles.row}>
            <MaterialCommunityIcons name="currency-usd" size={22} color={colors.primary} />
            <Text style={[styles.price, { color: colors.primary }]}>${product.price}</Text>
          </View>

          {/* ⭐ Rating */}
          <View style={styles.row}>
            <MaterialCommunityIcons name="star" size={22} color="#FFD700" />
            <Text style={styles.rating}>
              {product.rating.rate} / 5 ({product.rating.count} reviews)
            </Text>
          </View>

          {/* 📝 Description */}
          <Text style={styles.description}>{product.description}</Text>
        </Card.Content>

        <Card.Actions style={styles.actions}>
          <Button
            mode="outlined"
            onPress={() => navigation.goBack()}
            style={{ marginRight: 8 }}
          >
            Back
          </Button>
          <Button
            mode="contained"
            icon="cart-outline"
            onPress={() => console.log('Added to cart')}
          >
            Add to Cart
          </Button>
        </Card.Actions>
      </Card>
    </ScrollView>
    </SafeAreaView>
  );
}
};





const styles = StyleSheet.create({
  card: {
    margin: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 280,
    backgroundColor: '#fff',
  },
  title: {
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 6,
  },
  chip: {
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 6,
  },
  rating: {
    fontSize: 15,
    marginLeft: 6,
    color: '#555',
  },
  description: {
    marginTop: 12,
    fontSize: 15,
    lineHeight: 22,
    color: '#444',
  },
  actions: {
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
});

export default ProductDetailsScreen;
