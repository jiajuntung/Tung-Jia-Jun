import React, {useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, ImageBackground} from 'react-native';
import { useLayoutEffect } from 'react';
import type { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../Types';
import { checkSession } from './Session';

export type Props = StackScreenProps<RootStackParamList, 'SignInSignUpScreen'>;

const App = ({ navigation }: Props) => {

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [navigation]);

    useEffect(() => {
      checkSession(navigation, true);
  }, []);

    return (
        
        <ImageBackground
        source={require('../img/lB1.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <View style={styles.topSection}>
            <Text style={styles.title}>HELLO</Text>
            <Text style={styles.subtitle}>Where Second-Hand Finds New Life.</Text>
          </View>
  
          <View style={styles.bottomSection}>
            <TouchableOpacity
              style={styles.signInButton}
              onPress={() => navigation.navigate('LogInScreen')}
            >
              <Text style={styles.signInText}>Sign In</Text>
            </TouchableOpacity>
  
            <TouchableOpacity
              style={styles.signUpButton}
              onPress={() => navigation.navigate('SignUpScreen')}
            >
              <Text style={styles.signUpText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
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
      backgroundColor: 'rgba(255, 230, 240, 0.6)', 
      justifyContent: 'space-between',
      paddingVertical: 60,
      paddingHorizontal: 30,
    },
    topSection: {
      alignItems: 'flex-start', 
      width: '100%',
      marginTop: 5, 
    },
    title: {
      fontSize: 55,
      fontWeight: 'bold',
      color: '#99004d',
      textAlign: 'left',
    },
    subtitle: {
      fontSize: 17,
      color: '#b30059',
      marginTop: 10,
      textAlign: 'left',
      width: '80%',
    },
    bottomSection: {
      alignItems: 'center',
      marginBottom: 264
    },
    signInButton: {
      backgroundColor: '#e59198',
      paddingVertical: 15,
      paddingHorizontal: 100,
      borderRadius: 30,
      marginBottom: 20,
    },
    signInText: {
      color: '#fff',
      fontSize: 25,
      fontWeight: 'bold',
    },
    signUpButton: {
      backgroundColor: '#ffffff',
      paddingVertical: 15,
      paddingHorizontal: 100,
      borderRadius: 30,
      borderColor: '#ff4da6',
    },
    signUpText: {
      color: '#e59198',
      fontSize: 24,
      fontWeight: 'bold',
    },

});

export default App;