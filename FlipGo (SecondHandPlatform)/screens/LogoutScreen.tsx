import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const logout = async (navigation: any) => {
  Alert.alert('Logout', 'Successful Logout');
  await AsyncStorage.removeItem('currentUser');
  navigation.navigate('SignInSignUpScreen');
};