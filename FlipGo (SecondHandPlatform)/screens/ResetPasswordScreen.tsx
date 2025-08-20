import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ImageBackground } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from './Types';

type Props = StackScreenProps<RootStackParamList, 'ResetPasswordScreen'>;

const ResetPasswordScreen = ({ route, navigation }: Props) => {
  const { email } = route.params;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleResetPassword = async () => {
    if (!password || !confirmPassword) {
      Alert.alert('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('http://10.0.2.2:5000/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Your password has been reset.', [
          { text: 'OK', onPress: () => navigation.navigate('LogInScreen') },
        ]);
      } else {
        Alert.alert('Error', data.error || 'Failed to reset password.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Unable to connect to server.');
    }
  };

  return (
    <ImageBackground
      source={require('../img/login2.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Reset Password</Text>

        <TextInput
          style={styles.input}
          placeholder="New Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword}>
          <Text style={styles.resetButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.0)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#99004d',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#e0e0e0',
    borderRadius: 30,
    paddingHorizontal: 20,
    marginBottom: 20,
    fontSize: 16,
  },
  resetButton: {
    backgroundColor: '#ff4da6',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 30,
    marginTop: 10,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ResetPasswordScreen;
