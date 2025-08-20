// screens/HomeScreen.tsx
import React, { useRef, useEffect, useState } from 'react';
import {
  View, 
  Text, 
  StyleSheet,
  TouchableOpacity, 
  TextInput,
  Dimensions, 
  ScrollView, 
  Image,
  FlatList,
  Modal, 
  ImageBackground
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { checkSession } from './Session';
import { io } from 'socket.io-client';
let config = require('../Config');

const { width } = Dimensions.get('window');

const sliderImages = [
  require('../img/promo1.jpg'),
  require('../img/promo2.jpg'),
  require('../img/promo3.jpg'),
];

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const scrollRef = useRef<ScrollView>(null);
  const [index, setIndex] = useState(0);
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [searchText, setSearchText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const next = (index + 1) % sliderImages.length;
      scrollRef.current?.scrollTo({ x: next * width, animated: true });
      setIndex(next);
    }, 3000);

    checkSession(navigation);

    const socket = io(config.settings.serverPath + '/products');

    socket.on('connect', () => {
      console.log('Marketplace socket connected:', socket.id);
      socket.emit('productList');
    });

    socket.on('productList', (data: any[]) => {
      console.log('Received products:', data);
      setProducts(data);
    });

    socket.on('error', (err) => console.error('Socket error:', err));

    return () => {
      socket.disconnect();
      clearInterval(timer);
    };
  }, [index]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const handleSearch = (text: string) => {
    setSearchText(text);
    if (text.trim() === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        (product.name || '')
          .toLowerCase()
          .includes(text.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
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
    <ImageBackground 
      source={require('../img/lB1.jpg')}  
      style={styles.container}
    >
      <View style={styles.overlay}/>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <MaterialCommunityIcons name="menu" size={33} color="#757575" />
        </TouchableOpacity>
        <Text style={styles.title}>FlipGo</Text>
      </View>

      <ScrollView>
        <View style={styles.searchContainer}>
          <Icon name="magnify" size={24} color="#888" />
          <TextInput
            placeholder="Search"
            style={styles.searchInput}
            value={searchText}
            onChangeText={handleSearch}
          />
        </View>

        <ScrollView
          horizontal
          pagingEnabled
          ref={scrollRef}
          showsHorizontalScrollIndicator={false}
          style={styles.slider}
          onMomentumScrollEnd={(e) => {
            const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
            setIndex(newIndex);
          }}
        >
          {sliderImages.map((src, i) => (
            <Image key={i} source={src} style={styles.slideImage} />
          ))}
        </ScrollView>

        <View style={styles.indicatorContainer}>
          {sliderImages.map((_, i) => (
            <View
              key={i}
              style={[styles.indicator, { opacity: i === index ? 1 : 0.3 }]}
            />
          ))}
        </View>

        <FlatList
          data={filteredProducts}
          renderItem={renderItem}
          keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
          numColumns={2}
          contentContainerStyle={styles.productList}
        />
      </ScrollView>

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
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FFE5EA' 
  },
  header: { 
    flexDirection:'row', 
    alignItems:'center',
    marginLeft:8,
    padding:15
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, 
    backgroundColor: 'rgba(255, 255, 255, 0.7)', 
  },
  title: { 
    color:'#757575', 
    fontSize:25, 
    marginLeft:17, 
    fontWeight:'bold', 
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 4,
    margin: 16,
    paddingHorizontal: 12,
    borderRadius: 17,
    height: 40
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16
  },
  slider: { height: 200 },
  slideImage: {
    width,
    height: 200,
    resizeMode: 'cover'
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ff5e78',
    marginHorizontal: 4
  },
  productList: {
    padding: 8
  },
  card: {
    backgroundColor: '#fff',
    margin: 8,
    width: (width - 48) / 2,
    borderRadius: 8,
    padding: 8,
    alignItems: 'center'
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 6,
    marginBottom: 8
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  price: {
    marginTop: 4,
    color: '#e59198',
    fontWeight: 'bold'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  popupBox: {
    width: 250,
    height: 250,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center'
  },
  popupImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  }
});

export default HomeScreen;
