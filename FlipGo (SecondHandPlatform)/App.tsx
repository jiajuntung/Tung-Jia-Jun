// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet } from 'react-native';
import CustomDrawerContent from './screens/Drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RootStackParamList } from './Types';

import SignInSignUpScreen from './screens/SignInSignUpScreen';
import LogInScreen        from './screens/LogInScreen';
import SignUpScreen       from './screens/SignUpScreen';
import ForgetPasswordScreen from './screens/ForgetPasswordScreen';
import ResetPasswordScreen  from './screens/ResetPasswordScreen';

import HomeScreen         from './screens/HomeScreen';
import UploadScreen       from './screens/UploadScreen';
import CartScreen         from './screens/CartScreen';
import ProfileScreen      from './screens/ProfileScreen';

import MarketplaceScreen       from './screens/MarketplaceScreen';
import MarketplaceDetailScreen from './screens/MarketplaceDetailScreen';
import ProductScreen           from './screens/ProductScreen';
import AboutUsScreen           from './screens/AboutUsScreen';
import HelpCenterScreen        from './HelpCenterScreen/HelpCenterScreen';
import PaymentScreen           from './screens/PaymentScreen';
import PaymentSuccessScreen    from './screens/PaymentSuccessScreen';
import EditProductScreen from './screens/EditProductScreen';

const Stack  = createStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<RootStackParamList>();
const Tab    = createBottomTabNavigator<RootStackParamList>();

function MainTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,              
        tabBarStyle: styles.tabBar,           
        tabBarIcon: ({ focused }) => {
          let iconName: string = 'circle';
          switch (route.name) {
            case 
              'HomeScreen':    
              iconName = 'home';              
              break;
            case 
              'MarketplaceScreen':    
              iconName = 'shopping';               
              break;
            case 
              'UploadScreen':  
              iconName = 'plus-box-outline';   
              break;
            case 
              'CartScreen':    
              iconName = 'cart';               
              break;
            case 
              'ProfileScreen': 
              iconName = 'account';            
              break;
          }
          return (
            <View style={[
              styles.iconWrap,
              focused && styles.iconWrapFocused
            ]}>
              <MaterialCommunityIcons name={iconName} size={28} color="#fff" />
            </View>
          );
        },
      })}
    >
      <Tab.Screen 
        name="HomeScreen"    
        component={HomeScreen}    
      />
      <Tab.Screen 
        name="MarketplaceScreen"    
        component={MarketplaceScreen}    
      />
      <Tab.Screen 
        name="UploadScreen"  
        component={UploadScreen}  
      />
      <Tab.Screen 
        name="CartScreen"    
        component={CartScreen}    
      />
      <Tab.Screen 
        name="ProfileScreen" 
        component={ProfileScreen} 
      />
    </Tab.Navigator>
  );
}

function MainDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      initialRouteName="HomeScreen"
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen
        name="MainTab"
        component={MainTab}
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

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SignInSignUpScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen 
          name="SignInSignUpScreen" 
          component={SignInSignUpScreen} 
        />
        <Stack.Screen 
          name="LogInScreen"          
          component={LogInScreen} 
        />
        <Stack.Screen 
          name="SignUpScreen"         
          component={SignUpScreen} 
        />
        <Stack.Screen 
          name="ForgetPasswordScreen" 
          component={ForgetPasswordScreen} 
        />
        <Stack.Screen 
          name="ResetPasswordScreen"  
          component={ResetPasswordScreen} 
        />
        <Stack.Screen 
          name="MarketplaceDetail"  
          component={MarketplaceDetailScreen} 
        />
        <Stack.Screen 
          name="EditProduct"  
          component={EditProductScreen} 
        />
        <Stack.Screen 
          name="PaymentScreen" 
          component={PaymentScreen} 
        />
        <Stack.Screen 
          name="PaymentSuccessScreen" 
          component={PaymentSuccessScreen} 
        />
        <Stack.Screen 
          name="MainDrawer" 
          component={MainDrawer} 
        />
        <Stack.Screen 
          name="HomeScreen" 
          component={HomeScreen} 
        />
      </Stack.Navigator>
    </NavigationContainer>
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