import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet, Alert, TouchableOpacity, ImageBackground } from 'react-native';
import { RootStackParamList } from './Types';
import { StackScreenProps } from '@react-navigation/stack';
let config = require('../Config');
let SQLite = require('react-native-sqlite-storage');
SQLite.DEBUG(true);
SQLite.enablePromise(true);

export type Props = StackScreenProps<RootStackParamList, 'SignUpScreen'>;

let db: any = null;

const SignupScreen = ({ navigation }: Props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignup = async () => {
      try {
        let url = config.settings.serverPath + '/api/signup';
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password, confirmPassword })
        });
    
        const data = await response.json();

        if (response.ok) {
          Alert.alert('Successful', data.message, [
            { text: 'Go to Login', onPress: () => navigation.navigate('LogInScreen') }
          ]);
        } else {
          Alert.alert('Fail', data.error);
          return;
        }
      } catch (error) {
        console.error('Signup error:', error);
        Alert.alert('Error', 'Could not connect to server.');
      }
    };

    return (
        <ImageBackground
        source={require('../img/login2.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <TextInput
            style={styles.input}
            placeholder="Name (as per IC)"
            placeholderTextColor="#999"
            value={name}
            onChangeText={setName}
          />
  
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

        <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#999"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
        />
  
          <TouchableOpacity
            style={styles.signUpButton}
            onPress={handleSignup}
          >
            <Text style={styles.signUpText}>Sign Up</Text>
          </TouchableOpacity>
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
      backgroundColor: 'rgba(255, 255, 255, 0.0)', 
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 30,
      paddingTop: 100,
    },
    input: {
      width: '100%',
      height: 50,
      backgroundColor: '#e0e0e0',
      borderRadius: 30,
      paddingHorizontal: 20,
      marginBottom: 20,
      fontSize: 16,
      color: '#333',
    },
    signUpButton: {
      backgroundColor: '#ff4da6',
      paddingVertical: 15,
      paddingHorizontal: 100,
      borderRadius: 30,
      marginTop: 10,
    },
    signUpText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });
  

export default SignupScreen;
