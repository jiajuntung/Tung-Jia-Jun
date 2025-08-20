// AboutUsScreen.tsx
import React, { useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, Image } from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import Header from './Header';

export default function AboutUsScreen({ navigation }: any) {
  const [imageUri, setImageUri] = useState<string | null>(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1 }}>
      <Header title="About Us" onBack={() => navigation.goBack()} />
      <ImageBackground
        source={require('../img/lB1.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Image
              source={imageUri ? { uri: imageUri } : require('../img/office.jpg')}
              style={styles.officeImage}
            />
            <View style={styles.introductionBox}>
              <Text style={styles.introTitle}>Welcome to FlipGO!</Text>
              <Text style={styles.introText}>
                FlipGO is a platform dedicated to giving second-hand items a second life.
              </Text>
              <Text style={styles.introText}>
                We believe that every product has a story, and every story deserves to continue.
              </Text>
              <Text style={styles.introText}>
                Our mission is to create a vibrant, trusted community where users can easily buy and sell pre-loved items.
              </Text>
              <Text style={styles.introText}>
                Whether you are looking to declutter your home or find a hidden treasure, FlipGO makes it simple, safe, and fun.
              </Text>
              <Text style={styles.introText}>
                Join us in promoting sustainability and giving great items another chance to be loved.
              </Text>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 50,
    alignItems: 'center',
  },
  officeImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  introductionBox: {
    backgroundColor: '#d8a7a7',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  introTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#99004d',
    marginBottom: 15,
    textAlign: 'center',
  },
  introText: {
    fontSize: 14,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
  },
});
