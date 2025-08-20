// screens/PaymentSuccessScreen.tsx
import React from 'react';
import {
  View, Text, StyleSheet,
  TouchableOpacity, ImageBackground
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

export default function PaymentSuccessScreen() {
  const navigation = useNavigation();

  return (
    <ImageBackground source={require('../img/lB1.jpg')} style={styles.background}>
      <View style={styles.overlay}/>
      <View style={styles.header}>
        <Text style={styles.title}>Payment</Text>
      </View>

      <View style={styles.content}>
        <Icon name="check-circle" size={120} color="limegreen" />
        <Text style={styles.success}>Payment Successful!</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('MainTab', { screen: 'HomeScreen' })}
      >
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { 
    flex:1 
  },
  overlay: { 
    ...StyleSheet.absoluteFillObject, 
    backgroundColor:'rgba(255, 255, 255, 0.7)' 
  },
  header: { 
    flexDirection:'row',
    alignItems:'center'
    ,padding:16 
  },
  title: { 
    color:'#757575',
    fontSize:20,
    marginLeft:16, 
    fontWeight:'bold' 
  },
  content: {
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  success: {
    fontSize:22,
    marginTop:12,
    color:'#757575',
    fontWeight:'bold'
  },
  button: {
    backgroundColor:'#e59198',
    padding:14,
    margin:16,
    borderRadius:17,
    alignItems:'center'
  },
  buttonText: { 
    color:'#fff', 
    fontSize:18 
  }
});