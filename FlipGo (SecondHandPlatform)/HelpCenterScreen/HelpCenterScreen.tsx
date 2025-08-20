//Help Center
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, ImageBackground } from 'react-native';
import { useLayoutEffect } from 'react';
import Header from './Header';
import FAQSectionScreen from './FQASectionScreen';
import ContactusSectionScreen from './ContactUsSectionScreen';

export default function HelpcenterScreen({ navigation }: any) {
  const [activeTab, setActiveTab] = useState<'faq' | 'contact'>('faq');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <ImageBackground
      source={require('../img/lB1.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <View style={{ flex: 1 }}>
        <Header title="Help Center" onBack={() => navigation.goBack()} />
        
        <View style={styles.tabContainer}>
          <TouchableOpacity onPress={() => setActiveTab('faq')}>
            <Text style={[styles.tabText, activeTab === 'faq' && styles.activeTab]}>FAQ</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('contact')}>
            <Text style={[styles.tabText, activeTab === 'contact' && styles.activeTab]}>Contact Us</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={{ padding: 20 }}>
          {activeTab === 'faq' ? <FAQSectionScreen /> : <ContactusSectionScreen />}
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  tabText: {
    fontSize: 16,
    marginHorizontal: 20,
    color: '#aaa',
  },
  activeTab: {
    color: '#ba7e7e',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});