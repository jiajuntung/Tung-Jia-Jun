// screens/ProductScreen.tsx

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/native-stack';
import { checkSession } from './Session';
import Header from './Header';
import { RootStackParamList } from '../Types';
let config = require('../Config');

type ProductScreenProp = StackNavigationProp<RootStackParamList, 'ProductScreen'>;

export default function ProductScreen() {
  const navigation = useNavigation<ProductScreenProp>();
  const [products, setProducts] = useState<any[]>([]);
  const [searchText, setSearchText] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const route = useRoute<ProductScreenProp>(); 
  const fetchProducts = async () => {
    try {
      const user = await checkSession(navigation);
      if (!user || !user.id) {
        console.error('No valid user found.');
        return;
      }
      const userId = user.id;
      const url = config.settings.serverPath + '/api/products';
      const response = await fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              'userId': userId
          }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
};

  useEffect(() => {
    if (route.params?.refresh) {
      fetchProducts();
      navigation.setParams({ refresh: false });
    }
    fetchProducts();
  }, [route.params?.refresh]);

  const handleSearch = (text: string) => {
    setSearchText(text);
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const deleteProduct = async (id: number) => {
    try {
      const res = await fetch(
        `${config.settings.serverPath}/api/products/delete`,
        {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id }),
        }
      );
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Delete failed');
      setProducts(prev => prev.filter(p => p.id !== id));
      fetchProducts();
      Alert.alert('Deleted', 'Product deleted successfully');
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Failed to delete product');
    }
  };

  const handleLongPress = (item: any) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this product?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => deleteProduct(item.id) },
      ]
    );
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('EditProduct', { product: item })}
      onLongPress={() => handleLongPress(item)}
    >
      <Image source={{ uri: item.imageUri }} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.price}>
        RM <Text style={styles.priceBold}>{item.price}</Text>
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <Header title="My Products" onBack={() => navigation.goBack()} />
      <View style={styles.container}>
        <View style={styles.searchContainer}>
                <Icon name="magnify" size={27} color="#757575" />
                <TextInput
                  placeholder="Search"
                  placeholderTextColor="#757575"
                  style={styles.searchInput}
                  value={searchText}
                  onChangeText={handleSearch}
                />
              </View>
        <FlatList
          data={filteredProducts}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          numColumns={2}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <Text style={styles.empty}>No products yet.</Text>
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffeef2',
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f4a7b9',
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  list: {
    paddingBottom: 50,
  },
  card: {
    flex: 1,
    backgroundColor: '#fddde6',
    borderRadius: 15,
    margin: 7,
    padding: 10,
    alignItems: 'center',
  },
  productImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    backgroundColor: '#d3f4ff',
  },
  productName: {
    fontWeight: 'bold',
    color: '#bb2c5d',
    fontSize: 14,
    marginTop: 10,
  },
  price: {
    color: '#bb2c5d',
    marginTop: 5,
  },
  priceBold: {
    fontWeight: 'bold',
  },
  empty: {
    marginTop: 50,
    textAlign: 'center',
    color: '#888',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 10,
    paddingHorizontal: 13,
    borderRadius: 17,
    height: 40,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
});