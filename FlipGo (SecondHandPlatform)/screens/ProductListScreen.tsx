import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SQLite from 'react-native-sqlite-storage';
import BottomTabNavigator from './BottomTabNavigator'; 

const ProductListScreen = ({ navigation }: any) => {
  const [products, setProducts] = useState<any[]>([]);
  let db: any = null;

  useEffect(() => {
    SQLite.openDatabase({ name: 'products.db', location: 'default' })
      .then((dbInstance) => {
        db = dbInstance;
        fetchProducts(db);
      })
      .catch((err) => {
        console.error('DB Open Error:', err);
      });
  }, []);

  const fetchProducts = (db: any) => {
    db.transaction((tx: any) => {
      tx.executeSql(
        'SELECT * FROM products',
        [],
        (txObj: any, resultSet: any) => {
          setProducts(resultSet.rows.raw());
        },
        (txObj: any, error: any) => {
          console.log('Error fetching products:', error);
        }
      );
    });
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('SellingPage')}
    >
      <Image source={{ uri: item.imageUri }} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.price}>
        RM <Text style={styles.priceBold}>{item.price}</Text>
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="chevron-left" size={30} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Product list</Text>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.empty}>No products yet.</Text>}
      />
      <BottomTabNavigator /> 
    </View>
  );
};

export default ProductListScreen;

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
    width: 120,
    height: 100,
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
});