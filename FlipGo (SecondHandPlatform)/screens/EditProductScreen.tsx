import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchImageLibrary } from 'react-native-image-picker';
import { useRoute, RouteProp } from '@react-navigation/native';
import { checkSession } from './Session';
import { RootStackParamList } from '../Types';
let config = require('../Config');

type EditProductRouteProp = RouteProp<RootStackParamList, 'EditProduct'>;

export default function EditProductScreen({ navigation, route }: any) {
  const { product } = useRoute<EditProductRouteProp>().params;
  const [user, setUser] = useState<any>(null);
  const [productName, setProductName] = useState(product.name);
  const [productPrice, setProductPrice] = useState(product.price.toString());
  const [productDescription, setProductDescription] = useState(product.description);
  const [imageUri, setImageUri] = useState<string | null>(product.imageUri);
  const [imageUri2, setImageUri2] = useState(product.imageUri);

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  useEffect(() => {
    (async () => {
      const currentUser = await checkSession(navigation);
      setUser(currentUser);
    })();
  }, []);

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          PermissionsAndroid.PERMISSIONS.CAMERA,
        ]);
        const allGranted = Object.values(granted).every(
          (val) => val === PermissionsAndroid.RESULTS.GRANTED
        );
        if (!allGranted) {
          Alert.alert('Permission denied', 'Please grant all permissions to continue.');
          return false;
        }
        return true;
      } catch (err) {
        console.warn(err);
        Alert.alert('Error', 'Failed to request permissions');
        return false;
      }
    }
    return true;
  };

  const pickImage = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;
    const options = { mediaType: 'photo', quality: 1 };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error:', response.errorMessage);
        Alert.alert('Error', response.errorMessage || 'Something went wrong');
      } else if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri!);
        setImageUri2(response.assets[0].uri!);
      }
    });
  };

  const handleUpdate = () => {
    Alert.alert(
      'Confirm Update',
      'Are you sure you want to update this product?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: async () => {
            try {
              const url = config.settings.serverPath + '/api/products/update';
              const response = await fetch(url, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  id: product.id,
                  name: productName,
                  price: parseFloat(productPrice),
                  description: productDescription,
                  imageUri: imageUri2,
                }),
              });
              const data = await response.json();
              if (!response.ok) throw new Error(data.error || 'Update failed');
              Alert.alert('Success', 'Product updated successfully');
              navigation.navigate('ProductScreen', { refresh: true });
            } catch (err: any) {
              Alert.alert('Error', err.message || 'Unknown error');
            }
          },
        },
      ]
    );
  };
  const onBack = () => {
    navigation.goBack();  
  };

  return (
    <ImageBackground
      source={require('../img/lB1.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack}>
                  <MaterialCommunityIcons name="chevron-left" size={30} color="#757575" />
                </TouchableOpacity>
          <Text style={styles.title}>Edit Product</Text>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.label}>Product name</Text>
          <TextInput
            style={styles.input}
            placeholder="Edit product name"
            placeholderTextColor="#999"
            value={productName}
            onChangeText={setProductName}
          />

          <Text style={styles.label}>Product price</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.rm}>RM</Text>
            <TextInput
              style={styles.priceInput}
              placeholder="Edit price"
              placeholderTextColor="#999"
              keyboardType="numeric"
              value={productPrice}
              onChangeText={setProductPrice}
            />
          </View>

          <Text style={styles.label}>Product description</Text>
          <TextInput
            style={styles.descriptionInput}
            placeholder="Edit description"
            placeholderTextColor="#999"
            multiline
            value={productDescription}
            onChangeText={setProductDescription}
          />

          <Text style={styles.label}>Product image</Text>
          <TouchableOpacity style={styles.imageUpload} onPress={pickImage}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.uploadedImage} />
            ) : (
              <MaterialCommunityIcons name="cloud-upload" size={50} color="#ccc" />
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.confirmButton} onPress={handleUpdate}>
            <Text style={styles.confirmText}>Update Product</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    color: '#757575',
    fontSize: 20,
    marginLeft: 16,
    fontWeight: 'bold',
  },
  label: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#757575',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 20,
    height: 50,
    marginTop: 5,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 20,
    height: 50,
    marginTop: 5,
  },
  rm: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  priceInput: {
    flex: 1,
    fontSize: 16,
  },
  descriptionInput: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 20,
    height: 100,
    marginTop: 5,
    textAlignVertical: 'top',
  },
  imageUpload: {
    backgroundColor: '#fff',
    height: 315,
    borderRadius: 15,
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  confirmButton: {
    backgroundColor: '#e59198',
    borderRadius: 30,
    marginTop: 30,
    paddingVertical: 15,
    alignItems: 'center',
  },
  confirmText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});