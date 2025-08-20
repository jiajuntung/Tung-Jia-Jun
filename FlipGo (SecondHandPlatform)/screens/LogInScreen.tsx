import React, { useState } from 'react';
import {
  View, 
  TextInput, 
  Text,
  TouchableOpacity, 
  StyleSheet,
  Alert, 
  ImageBackground
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../Types';
let config = require('../Config');

type Props = StackScreenProps<RootStackParamList,'LogInScreen'>;

let db: any = null;

const LogInScreen = ({navigation} : Props) => {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const url = config.settings.serverPath + '/api/login';
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem('currentUser', JSON.stringify(data.user));
        navigation.replace('MainDrawer');
      } else {
        Alert.alert('Login Failed', data.error);
      }
    } catch (err) {
      console.error('Login error:', err);
      Alert.alert('Error', 'Could not connect to server');
    }
  };

  return (
    <ImageBackground
      source={require('../img/login2.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('ForgetPasswordScreen')}>
          <Text style={styles.linkText}>Forgot password?</Text>
        </TouchableOpacity>

        <View style={styles.signupRow}>
          <Text style={styles.infoText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
            <Text style={[styles.linkText, { marginLeft:4 }]}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { 
    flex:1, 
    width:'100%',
    height:'100%' 
  },
  overlay: { 
    flex:1, 
    alignItems:'center',
    justifyContent:'center', 
    padding:30 
  },
  input: {
    width:'100%', 
    height:50,
    backgroundColor:'#e0e0e0', 
    borderRadius:25,
    paddingHorizontal:20, 
    marginBottom:20,
    fontSize:16, 
    color:'#333'
  },
  button: {
    backgroundColor:'#ff4da6',
    paddingVertical:15, 
    paddingHorizontal:80,
    borderRadius:25, 
    marginBottom:20
  },
  buttonText: { 
    color:'#fff', 
    fontSize:18, 
    fontWeight:'bold' 
  },
  linkText: { 
    color:'#ff4da6', 
    fontSize:14 
  },
  signupRow: { 
    flexDirection:'row', 
    marginTop:20 
  },
  infoText: { 
    color:'#666', 
    fontSize:14 
  },
});

export default LogInScreen;