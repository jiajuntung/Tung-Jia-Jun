import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import {
  View, Text, StyleSheet,
  FlatList, TouchableOpacity,
  ImageBackground, Image, Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { checkSession } from './Session';
import { StackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Types';
type CartScreenProp = StackNavigationProp<RootStackParamList, 'CartScreen'>;
let config = require('../Config');

export default function CartScreen() {
  const route = useRoute<CartScreenProp>();
  const navigation = useNavigation<CartScreenProp>();
  const [cart, setCart] = useState<any[]>([]);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [user, setUser] = useState<any>(null);

  // const fetchCart = async (currentUser: any) => {
  //   const raw = await AsyncStorage.getItem(`cart_${currentUser.userId}`);
  //   setCart(raw ? JSON.parse(raw) : []);
  // };
  const fetchCart = async () => {
    try {
      const user = await checkSession(navigation);
      if (!user || !user.id) {
        console.error('No valid user found.');
        return;
      }
      const userId = user.id;
      const url = config.settings.serverPath + '/api/carts';
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
      setCart(data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
};

  useEffect(() => {
    if (route.params?.refresh) {
      fetchCart();
      navigation.setParams({ refresh: false });
    }
    fetchCart();
  }, [route.params?.refresh]);

  // useEffect(() => {
  //   if (route.params?.refresh && user) {
  //     fetchCart(user);
  //   }
  // }, [route.params, user]);

  const toggleSelect = (idx: number) => {
    const s = new Set(selected);
    s.has(idx) ? s.delete(idx) : s.add(idx);
    setSelected(s);
  };

  const selectAll = () => setSelected(new Set(cart.map((_, i) => i)));
  const clearAll  = () => setSelected(new Set());
  const total = Array.from(selected).reduce((sum, i) => {
    const item = cart[i];
    if (!item) return sum; 
    return sum + parseInt(item.qty) * parseFloat(item.product.price);
  }, 0);

  const proceed = () => navigation.navigate('PaymentScreen', { total });

  const removeItem = (id: number) => {
    Alert.alert('Remove?', 'Remove this item from cart?', [
      { text:'Cancel', style:'cancel' },
      {
        text:'Yes', onPress: async () => {
          try {
            let url = config.settings.serverPath + '/api/carts/delete';
            const res = await fetch(url,
              {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
              }
            );
            const json = await res.json();
            if (!res.ok) throw new Error(json.error || 'Remove failed');
            fetchCart();
            Alert.alert('Deleted', json.message);
          } catch (err: any) {
            console.error(err)
            Alert.alert('Error', err.message || 'Failed to remove cart');
          }
        }
      }
    ]);
  };
  
  const renderItem = ({ item, index }: any) => (
    <TouchableOpacity
      style={styles.item}
      onLongPress={() => removeItem(item.cartId)}
    >
      <Image source={{ uri: item.product.imageUri }} style={styles.img} />
      <View style={styles.info}>
        <Text style={styles.productname}>{item.product.name}</Text>
        <Text style={styles.price}>RM {item.product.price}</Text>
        <Text style={styles.nameqty}>Qty: {item.qty}</Text>
        <Text style={styles.name}>Subtotal: RM {(item.qty * item.product.price).toFixed(2)}</Text>
      </View>
      <TouchableOpacity onPress={() => toggleSelect(index)}>
        <Icon
          name={selected.has(index) ? 'check-box' : 'check-box-outline-blank'}
          size={28}
          color="#e59198"
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <ImageBackground source={require('../img/lB1.jpg')} style={styles.background}>
      <View style={styles.overlay}/>
      <View style={styles.header}>
        <MaterialCommunityIcons name="cart-outline" size={27} color="#757575" />
        <Text style={styles.title}>Cart ({cart.length})</Text>
        </View>
      <FlatList
        data={cart}
        renderItem={renderItem}
        keyExtractor={(_, i) => i.toString()}
        contentContainerStyle={styles.list}
      />

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerBtn} onPress={selectAll}>
          <Text style={styles.footerText}>Select All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerBtn} onPress={clearAll}>
          <Text style={styles.footerText}>Clear All</Text>
        </TouchableOpacity>
        <Text style={styles.total}>Total RM {total.toFixed(2)}</Text>
        <TouchableOpacity style={styles.proceed} onPress={proceed}>
          <Text style={styles.proceedText}>Buy now</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { 
    flex:1 
  },
  overlay: { 
    ...StyleSheet.absoluteFillObject, 
    backgroundColor:'rgba(255, 255, 255, 0.5)' 
  },
  header: { 
    flexDirection:'row', 
    alignItems:'center', 
    padding:16 
  },
  title: { 
    color:'#757575', 
    fontSize:20, 
    marginLeft:16, 
    fontWeight:'bold', 
  },
  list: { 
    paddingHorizontal:16, 
    paddingBottom:100 
  },
  item: {
    flexDirection:'row',
    backgroundColor:'#fff',
    marginVertical:8,
    borderRadius:8,
    padding:12,
    alignItems:'center'
  },
  img: { 
    width:80, 
    height:80, 
    borderRadius:6 
  },
  info: { 
    flex:1, 
    marginLeft:12 
  },
  name: { 
    fontSize:15, 
    fontWeight:'bold' 
  },
  productname: { 
    fontSize:20, 
    fontWeight:'bold' 
  },
  nameqty: { 
    fontSize:13, 
  },
  price: { 
    fontSize: 16,
    marginTop:4, 
    color:'#e59198' 
  },
  footer: {
    position:'absolute', 
    bottom:18, 
    left:10, 
    right:10,
    backgroundColor:'#fff', 
    flexDirection:'row',
    alignItems:'center', 
    padding:12, 
    borderRadius: 15
  },
  footerBtn: { 
    padding:8,
    marginRight:12, 
    backgroundColor:'#F8B6C0', 
    borderRadius:6 
  },
  footerText: { 
    color:'#fff' 
  },
  total: { 
    flex:1, 
    fontSize:16, 
    fontWeight:'bold' 
  },
  proceed: {
    padding:10, 
    backgroundColor:'#e59198', 
    borderRadius:6
  },
  proceedText: { 
    color:'#fff' 
  },
});