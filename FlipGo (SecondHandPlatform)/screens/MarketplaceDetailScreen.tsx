// screens/MarketplaceDetailScreen.tsx
import React, {useEffect, useState} from 'react';
import {
  View, 
  Text, 
  StyleSheet,
  ImageBackground, 
  Image,
  TouchableOpacity, 
  Dimensions,
  Alert, 
  ScrollView
} from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { checkSession } from './Session';
let config = require('../Config');

type ParamList = { MarketplaceDetail: { product: any } };

const { width } = Dimensions.get('window');

export default function MarketplaceDetailScreen() {
  const navigation = useNavigation();
  const { product } = useRoute<RouteProp<ParamList, 'MarketplaceDetail'>>().params;

  const [user, setUser] = useState(null);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      var currentUser = await checkSession(navigation);
      setUser(currentUser);
    };

    fetchUser();
    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, '0')} - ${(today.getMonth() + 1).toString().padStart(2, '0')} - ${today.getFullYear()}`;
    setCurrentDate(formattedDate);
  }, []);

  const addToCart = async (productId: any) => {
    if (!user) {
      console.log('No user logged in');
      return;
    }

    var userId = user.id;
    let url = config.settings.serverPath + '/api/carts/add';
    try{
      const response = await fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              userId,
              productId
          }),
      });

      const data = await response.json();

      if (response.ok) {
          navigation.navigate('CartScreen', { refresh: true });
          return;
      } else {
          Alert.alert('Failed', data.error);
      }
  } catch (error) {
      console.error('Server error:', error);
      Alert.alert('Error', 'Could not connect to server.');
  }
  };  

  return (
    <ImageBackground source={require('../img/lB1.jpg')} style={styles.background}>
      <View style={styles.overlay} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Product</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Image source={{ uri: product.imageUri }} style={styles.image} />
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>RM {product.price.toFixed(2)}</Text>
          <Text style={styles.date}>Date: {currentDate}</Text>
          <Text style={styles.sectionTitle}>Details</Text>
          <Text style={styles.desc}>{product.description}</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => addToCart(product.id)}>
          <View style={styles.buttonInner}>
            <Icon name="add-shopping-cart" size={22} color="#fff" />
            <Text style={styles.buttonText}>Add to Cart</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 30,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    width: '90%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    marginTop: 16,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  price: {
    fontSize: 22,
    color: '#F85A6A',
    marginBottom: 10,
    fontWeight: '600',
  },
  date: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
    marginTop: 10,
  },
  desc: {
    fontSize: 16,
    color: '#444',
    textAlign: 'justify',
    marginTop: 6,
  },
  button: {
    backgroundColor: '#e59198',
    marginTop: 20,
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    width: '85%',
  },
  buttonInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 8,
  },
});