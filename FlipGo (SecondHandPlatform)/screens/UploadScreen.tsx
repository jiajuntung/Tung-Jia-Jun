//Selling Page
import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ImageBackground,
  ScrollView, Alert, PermissionsAndroid, Platform
} from 'react-native';
import { useLayoutEffect } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchImageLibrary } from 'react-native-image-picker';
import { checkSession } from './Session';

let config = require('../Config');

export default function SellingPage({ navigation }: any) {
  const [user, setUser] = useState(null);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [imageUri2, setImageUri2] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);

  useLayoutEffect(() => {
              navigation.setOptions({
                  headerShown: false,
              });
          }, [navigation]);

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

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          PermissionsAndroid.PERMISSIONS.CAMERA,
        ]);
        const allGranted = Object.values(granted).every(val => val === PermissionsAndroid.RESULTS.GRANTED);
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

    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
        Alert.alert('Error', response.errorMessage || 'Something went wrong');
      } else if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri);
        setImageUri2(response.assets[0].uri);
      }
    });
  };

  // Save product to the local database
  const saveToDatabase = async () => {
    if (!productName || !productPrice || !productDescription || !imageUri2) {
      Alert.alert('Missing Fields', 'Please fill all fields and select an image.');
      return;
    }
  
    try {
      var userId = user.id;
      let url = config.settings.serverPath + '/api/products/add';
  
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          productName,
          productPrice,
          productDescription,
          currentDate,
          imageUri2,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        Alert.alert('Successful', data.message);
        navigation.navigate('ProductScreen', { refresh: true });
      } else {
        Alert.alert('Insert Failed', data.error);
      }
    } catch (error) {
      console.error('Upload error:', error);
      Alert.alert('Error', 'Could not connect to server.');
    }
  };

  return (
    <ImageBackground
      source={require('../img/lB1.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.header}>
            <MaterialCommunityIcons name="cloud-upload-outline" size={27} color="#757575"/>
            <Text style={styles.title}>Upload</Text>
          </View>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.label}>Product name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter product name"
            placeholderTextColor="#999"
            value={productName}
            onChangeText={setProductName}
          />

          <Text style={styles.label}>Product price</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.rm}>RM</Text>
            <TextInput
              style={styles.priceInput}
              placeholder="Enter price"
              placeholderTextColor="#999"
              keyboardType="numeric"
              value={productPrice}
              onChangeText={setProductPrice}
            />
          </View>

          <Text style={styles.label}>Product description</Text>
          <TextInput
            style={styles.descriptionInput}
            placeholder="Enter description"
            placeholderTextColor="#999"
            multiline
            value={productDescription}
            onChangeText={setProductDescription}
          />

          <Text style={styles.label}>Date</Text>
          <TextInput style={styles.input} value={currentDate} editable={false} />

          <Text style={styles.label}>Product image</Text>
          
          <TouchableOpacity style={styles.imageUpload} onPress={pickImage}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.uploadedImage} />
            ) : (
              <MaterialCommunityIcons name="cloud-upload" size={50} color="#ccc" />
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.confirmButton} onPress={saveToDatabase}>
            <Text style={styles.confirmText}>Upload</Text>
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
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  header: { 
    flexDirection:'row', 
    alignItems:'center', 
    padding:16,
  },
  title: { 
    color:'#757575', 
    fontSize:20, 
    marginLeft:16, 
    fontWeight:'bold', 
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
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