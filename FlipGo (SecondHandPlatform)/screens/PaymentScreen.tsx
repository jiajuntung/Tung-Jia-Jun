// screens/PaymentScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

type ParamList = { Payment: { total: number } };

export default function PaymentScreen() {
  const navigation = useNavigation();
  const { total } = useRoute<RouteProp<ParamList, 'Payment'>>().params;

  const payAndGoSuccess = () => {
    Alert.alert(
      'Confirm Payment',
      'Are you sure you want to proceed with the payment?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: () => navigation.navigate('PaymentSuccessScreen')
        }
      ]
    );
  };

  return (
    <ImageBackground source={require('../img/lB1.jpg')} style={styles.background}>
      <View style={styles.overlay}/>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={28} color="#fff"/>
        </TouchableOpacity>
        <Text style={styles.title}>Payment</Text>
      </View>

      <Text style={styles.prompt}>Choose your payment method:</Text>

      <TouchableOpacity style={styles.option} onPress={payAndGoSuccess}>
        <Icon name="account-balance" size={24} color="#757575"/>
        <Text style={styles.optionText}>Online Banking</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={payAndGoSuccess}>
        <Icon name="credit-card" size={24} color="#757575"/>
        <Text style={styles.optionText}>Credit / Debit Card</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={payAndGoSuccess}>
        <Icon name="qr-code" size={24} color="#757575"/>
        <Text style={styles.optionText}>E-wallet</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={payAndGoSuccess}>
        <Icon name="money" size={24} color="#757575"/>
        <Text style={styles.optionText}>Cash On Delivery</Text>
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
    backgroundColor:'rgba(0, 0, 0, 0.3)' 
  },
  header: { 
    flexDirection:'row',
    alignItems:'center',
    padding:16 
  },
  title: { 
    color:'#fff',
    fontSize:20,
    marginLeft:16, 
    fontWeight: 'bold' 
  },
  prompt: { 
    margin:16, 
    fontSize:18, 
    color:'#fff', 
    fontWeight:'500' 
  },
  option: {
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'#fff',
    marginHorizontal:16,
    marginVertical:13,
    padding:17,
    borderRadius:18
  },
  optionText: { 
    marginLeft:12, 
    fontSize:16 
  }
});