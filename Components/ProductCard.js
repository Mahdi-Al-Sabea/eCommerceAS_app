import  { useEffect } from 'react';
import {  StyleSheet } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';


export default function ProductCard({ item, onPress }) {
  const { colors } = useTheme();


    return (
            <Card
              mode="elevated"
              style={styles(colors).card}
              onPress={onPress}
            >
              <Card.Cover source={{ uri: item.image }} style={styles(colors).image} />
        
              <Card.Content>
                <Text style={styles(colors).price}>${item.price}</Text>
        
                <Text style={styles(colors).title} numberOfLines={2}>
                  {item.title}
                </Text>
        
        
              </Card.Content>
            </Card>
    );


}


const styles = (colors) =>
  StyleSheet.create({
    card: {
      flex: 1,
      borderRadius: 16,
      backgroundColor: colors.surface,
      elevation: 4,
      marginHorizontal: 4,
    },
    image: {
        padding: 5,
      height: 120,
      resizeMode: 'contain',
      backgroundColor: 'transparent',
    },
    price: {
      fontWeight: 'bold',
      marginTop: 8,
      fontSize: 16,
    },
    title: {
      marginTop: 4,
      fontSize: 14,
      color: colors.onSurface,
    },
    subtitle: {
      fontSize: 12,
      color: colors.outline,
      marginTop: 2,
    },
  });


