import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: number;
  name: string;
  email: string;
}

const ProfileScreen: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      try {
        const json = await AsyncStorage.getItem('currentUser');
        if (!json) {
          throw new Error('No user data found in storage');
        }
        const parsed = JSON.parse(json) as User;
        setUser(parsed);
      } catch (err) {
        console.error('Failed to load user from storage:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Error to load user data</Text>
      </View>
    );
  }

  return (
  <View style={{ flex: 1 }}>
    <ImageBackground
      source={require('../img/lB1.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      
      <View style={styles.overlay}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="account-outline" size={27} color="#757575" />
        <Text style={styles.headerTitle}>Profile</Text>
      </View>
      <View style={styles.container}>

        <View style={styles.editContainer}>
  <Image
    source={require('../img/Profile.jpg')} 
    style={styles.avatar}
  />
  <View style={styles.editIconTextContainer}>
    <MaterialCommunityIcons name="image-edit-outline" size={18} color="#757575" />
    <Text style={styles.editText}>Profile Image</Text>
  </View>
</View>
        
        <Text style={styles.title}>Name : {user.name}</Text>
        <Text style={styles.info}>E-mail: {user.email}</Text>

        </View>
      </View>
    </ImageBackground>
  </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.6)', 
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 100,
  },
  header: {
    flexDirection:'row', 
    alignItems:'center', 
    padding: 16,
    backgroundColor: 'transparent',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#757575',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  editText: {
    color: '#757575',
    fontSize: 16,
    marginLeft: 6,
    fontWeight: '500',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  info: {
    fontSize: 18,
    fontWeight:'bold',
    marginBottom: 8,
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
  editContainer: {
    flexDirection: 'column', 
    alignItems: 'center', 
    marginBottom: 20,
  },
  editIconTextContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginLeft: 8, 
  },
});
