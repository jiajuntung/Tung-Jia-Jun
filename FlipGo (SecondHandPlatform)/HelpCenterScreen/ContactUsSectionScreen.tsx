import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Linking, Alert } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ContactusSectionScreen() {
  const handleOpenURL = async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      Alert.alert('Alert', "Unable to open the link. Please check the URL or try again.");
    }
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleOpenURL('https://www.facebook.com/flipgoshop')} 
      >
        <MaterialCommunityIcons name="facebook" size={24} color="#fff" />
        <Text style={styles.text}>Facebook</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleOpenURL('https://www.instagram.com/kokwenkai')} 
      >
        <MaterialCommunityIcons name="instagram" size={24} color="#fff" />
        <Text style={styles.text}>Instagram</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleOpenURL('https://wa.me/60123197994')} 
      >
        <MaterialCommunityIcons name="whatsapp" size={24} color="#fff" />
        <Text style={styles.text}>WhatsApp</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#d8a7a7',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
});