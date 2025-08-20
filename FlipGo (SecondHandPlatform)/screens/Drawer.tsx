// screens/Drawer.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DrawerContentScrollView, DrawerItem, DrawerContentComponentProps } from '@react-navigation/drawer';
import { StackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Types';
import { logout } from './LogoutScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type DrawerNavProp = StackNavigationProp<RootStackParamList>;

export default function CustomDrawerContent(
  props: DrawerContentComponentProps
) {
  const navigation = props.navigation as DrawerNavProp;
  const [user, setUser] = useState<{
    name: string;
    email: string;
  }>({ name: '', email: '' });

  const fetchProfile = async () => {
    try {
      const stored = await AsyncStorage.getItem('currentUser');
      if (!stored) return;
      const parsed: { name: string; email: string; } =
        JSON.parse(stored);
      setUser(parsed);
    } catch (err) {
      console.error('Error load user information', err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <DrawerContentScrollView {...props} style={styles.container}>
      <View style={styles.profileSection}>
  <View style={styles.profileInner}>
    <Image
      source={require('../img/Profile.jpg')}
      style={styles.avatar}
      resizeMode="cover"
    />
          <View>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.email}>{user.email}</Text>
          </View>
        </View>
      </View>

      <View style={styles.itemsSection}>
        <DrawerItem
          label="Profile"
          labelStyle={styles.itemLabel}
          icon={() => (
            <MaterialCommunityIcons name="account" color="#fff" size={22} />
          )}
          onPress={() => navigation.navigate('MainTab', { screen: 'ProfileScreen' })}
        />
        <DrawerItem
          label="My Products"
          labelStyle={styles.itemLabel}
          icon={() => (
            <MaterialCommunityIcons name="shopping" color="#fff" size={20} />
          )}
          onPress={() => navigation.navigate('ProductScreen')}
        />
        <DrawerItem
          label="About Us"
          labelStyle={styles.itemLabel}
          icon={() => (
            <MaterialCommunityIcons name="information" color="#fff" size={20} />
          )}
          onPress={() => navigation.navigate('AboutUsScreen')}
        />
        <DrawerItem
          label="Help Center"
          labelStyle={styles.itemLabel}
          icon={() => (
            <MaterialCommunityIcons name="help-circle" color="#fff" size={20} />
          )}
          onPress={() => navigation.navigate('HelpCenterScreen')}
        />
        <TouchableOpacity
          style={styles.logout}
          onPress={() => logout(navigation)}
        >
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d8a7a7',
    paddingTop: 0,
  },
  profileSection: {
    backgroundColor: '#d8a7a7',
    paddingVertical: 20,
  },
  profileInner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ccc',
    marginRight: 12,
  },
  avatarPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: '#fff',
    marginTop: 4,
  },
  itemsSection: {
    flex: 1,
    backgroundColor: '#d8a7a7',
    paddingTop: 10,
  },
  itemLabel: {
    color: '#fff',
    fontSize: 16,
    marginLeft: -20,
  },
  logout: {
    marginTop: 425,
    marginHorizontal: 20,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  logoutText: {
    color: '#e59198',
    fontWeight: 'bold',
    fontSize: 16,
  },
});