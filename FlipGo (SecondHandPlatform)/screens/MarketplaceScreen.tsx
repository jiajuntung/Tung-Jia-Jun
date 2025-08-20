import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
  Image,
  TouchableOpacity,
  Dimensions,
  Modal,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { io } from 'socket.io-client';
let config = require('../Config');

const { width } = Dimensions.get('window');

export default function MarketplaceScreen({ navigation }: any) {
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [searchText, setSearchText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const socket = io(config.settings.serverPath + '/products');
  
    socket.on('connect', () => {
      console.log('Marketplace socket connected:', socket.id);
      socket.emit('productList');
    });
  
    socket.on('productList', (data: any[]) => {
      setProducts(data);
      setFilteredProducts(data);
    });
  
    socket.on('error', (err) => console.error('Socket error:', err));
 
    return () => {
      socket.disconnect();
    };
  }, []);
  
  const handleSearch = (text: string) => {
    setSearchText(text);
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const showPopup = (uri: string) => {
    setSelectedImage(uri);
    setModalVisible(true);
  };

  const hidePopup = () => {
    setModalVisible(false);
    setSelectedImage(null);
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('MarketplaceDetail', { product: item })}
      onLongPress={() => showPopup(item.imageUri)}
    >
      <Image source={{ uri: item.imageUri }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>RM {item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <ImageBackground source={require('../img/lB1.jpg')} style={styles.background}>
      <View style={styles.overlay} />
      <View style={styles.header}>
        <MaterialCommunityIcons name="shopping-outline" size={27} color="#757575" />
        <Text style={styles.title}>Shopping</Text>
      </View>

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
        renderItem={renderItem}
        keyExtractor={p => p.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.list}
      />

      <Modal visible={modalVisible} transparent animationType="fade" onRequestClose={hidePopup}>
        <TouchableOpacity
          style={styles.modalContainer}
          onPress={hidePopup}
          activeOpacity={1}
        >
          <View style={styles.popupBox}>
            {selectedImage && (
              <Image source={{ uri: selectedImage }} style={styles.popupImage} />
            )}
          </View>
        </TouchableOpacity>
      </Modal>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 16,
    paddingHorizontal: 12,
    borderRadius: 17,
    height: 40,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  list: {
    padding: 8,
  },
  card: {
    backgroundColor: '#fff',
    margin: 8,
    width: (width - 48) / 2,
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 6,
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    marginTop: 4,
    color: '#e59198',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  popupBox: {
    width: 250,
    height: 250,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
