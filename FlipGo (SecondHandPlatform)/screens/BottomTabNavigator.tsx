// BottomTabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RootStackParamList } from '../Types';

import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import ProductScreen from './ProductScreen';
import AboutUsScreen from './AboutUsScreen';
import HelpCenterScreen from '../HelpCenterScreen/HelpCenterScreen';
import MarketplaceScreen from './MarketplaceScreen';
import MarketplaceDetailScreen from './MarketplaceDetailScreen';
import UploadScreen from './UploadScreen';
import CartScreen from './CartScreen';
import PaymentScreen from './PaymentScreen';
import PaymentSuccessScreen from './PaymentSuccessScreen';
import ProfileMain from './ProfileScreen';

const Tab = createBottomTabNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<RootStackParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

function HomeDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen
        name="HomeScreen"
        component={HomeScreen}
      />
      <Drawer.Screen
        name="ProfileScreen"
        component={ProfileScreen}
      />
      <Drawer.Screen
        name="ProductScreen"
        component={ProductScreen}
      />
      <Drawer.Screen
        name="AboutUsScreen"
        component={AboutUsScreen}
      />
      <Drawer.Screen
        name="HelpCenterScreen"
        component={HelpCenterScreen}
      />
    </Drawer.Navigator>
  );
}

function MarketStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="MarketplaceScreen"
        component={MarketplaceScreen}
      />
      <Stack.Screen
        name="MarketplaceDetail"
        component={MarketplaceDetailScreen}
      />
    </Stack.Navigator>
  );
}

function UploadStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="UploadScreen"
        component={UploadScreen}
      />
    </Stack.Navigator>
  );
}

function CartStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="CartScreen"
        component={CartScreen}
      />
      <Stack.Screen
        name="PaymentScreen"
        component={PaymentScreen}
      />
      <Stack.Screen
        name="PaymentSuccessScreen"
        component={PaymentSuccessScreen}
      />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="ProfileMain"
        component={ProfileMain}
      />
    </Stack.Navigator>
  );
}

export default function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({ focused }) => {
          let iconName = 'circle';
          switch (route.name) {
            case 'HomeTab':        iconName = 'home';         break;
            case 'MarketplaceTab': iconName = 'shopping-bag'; break;
            case 'UploadTab':      iconName = 'add-box';      break;
            case 'CartTab':        iconName = 'shopping-cart'; break;
            case 'ProfileTab':     iconName = 'person';       break;
          }
          return (
            <View style={[
              styles.iconWrap,
              focused && styles.iconWrapFocused
            ]}>
              <Icon name={iconName} size={28} color="#fff" />
            </View>
          );
        },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeDrawer}
      />
      <Tab.Screen
        name="MarketplaceTab"
        component={MarketStack}
      />
      <Tab.Screen
        name="UploadTab"
        component={UploadStack}
      />
      <Tab.Screen
        name="CartTab"
        component={CartStack}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStack}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#d8a7a7',
    height: 70,
    borderTopWidth: 0,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapFocused: {
    backgroundColor: 'rgba(255,192,203,0.3)',
  },
});