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
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.secondaryContainer }}>
      <ScrollView>
        <Card style={styles(colors).card}>
          {/* 🖼 Product Image */}
          <Image source={{ uri: product.image }} style={styles(colors).image} resizeMode="contain" />
        <Card.Content>
          {/* 🏷 Title */}
          <Text variant="titleLarge" style={styles(colors).title}>
            {product.title}
          </Text>

          {/* 📦 Category */}
          <Chip
            icon="tag-outline"
            style={styles(colors).chip}
            textStyle={{ fontSize: 13 }}
          >
            {product.category}
          </Chip>

          {/* 💰 Price */}
          <View style={styles(colors).row}>
            <MaterialCommunityIcons name="currency-usd" size={22} color={colors.primary} />
            <Text style={[styles(colors).price]}>{product.price}</Text>
          </View>

          {/* ⭐ Rating */}
          <View style={styles(colors).row}>
            <MaterialCommunityIcons name="star" size={22} color="#FFD700" />
            <Text style={styles(colors).rating}>
              {product.rating.rate} / 5 ({product.rating.count} reviews)
            </Text>
          </View>

          {/* 📝 Description */}
          <Text style={styles(colors).description}>{product.description}</Text>
        </Card.Content>

        <Card.Actions style={styles(colors).actions}>
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






export default ProductDetailsScreen;


const styles = (colors) =>
  StyleSheet.create({
  card: {
    margin: 16,
    borderRadius: 16,
    elevation: 4,
    backgroundColor: colors.surface,
    overflow: 'hidden',
  },
  image: {
    marginTop: 16,
    width: '100%',
    height: 280,
  },
  title: {
    fontWeight: 'bold',
    marginTop: 26,
    marginBottom: 6,
    color: colors.onSurface,
  },
  chip: {
    marginVertical: 8,
    width: '100%',
    paddingVertical: 4,
    backgroundColor: colors.primaryContainer,
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
    color: colors.primary,
  },
  rating: {
    fontSize: 15,
    marginLeft: 6,
    color: colors.onSurface,
  },
  description: {
    marginTop: 12,
    fontSize: 15,
    lineHeight: 22,
    color: colors.onSurface,
  },
  actions: {
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    marginBottom: 12,
    marginTop: 20,
  },
});
