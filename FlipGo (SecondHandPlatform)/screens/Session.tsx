import AsyncStorage from '@react-native-async-storage/async-storage';

export const getCurrentUser = async (navigation: any) => {
  try {
    const userJson = await AsyncStorage.getItem('currentUser');
    if (userJson) {
      const user = JSON.parse(userJson);
      console.log('Logged-in user:', user);

      // logout
    // await AsyncStorage.removeItem('currentUser');

      return user;
    } else {
      console.log('No user logged in.');
      return null;
    }
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

export const checkSession = async (navigation: any, homeScreen?: any) => {
  const user = await getCurrentUser(navigation);
  if (user) {
    if (homeScreen) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'MainDrawer' }],
      });
    }
    return user;
  } else {
    if(!homeScreen){
        navigation.reset({
        index: 0,
        routes: [{ name: 'SignInSignUpScreen' }],
        });
    }
    return null;
  }
};
