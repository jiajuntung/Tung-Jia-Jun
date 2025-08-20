//FAQ
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const FAQ_DATA = [
  {
    question: 'How do I sell an item on FlipGO?',
    answer: 'Go to the "Sell" page, fill in product details, upload a picture, and submit.',
  },
  {
    question: 'How do I buy an item on FlipGO?',
    answer: 'Browse through listings and contact the seller directly to purchase.',
  },
  {
    question: 'Is it free to list my item for sale?',
    answer: 'Yes, it’s completely free. No hidden or listing fees!',
  },
  {
    question: 'Is my personal information safe?',
    answer: 'Yes. Your data is securely stored and not shared.',
  },
  {
    question: 'What kind of items are allowed or \n not allowed to be sold on FlipGO?',
    answer: 'ou can sell a wide range of second-hand goods including electronics, clothing, books, furniture, and more. However, prohibited items include illegal products, weapons, counterfeit goods, adult material, and hazardous materials. For a full list of restricted items, please refer to our Community Guidelines.',
  },
  {
    question: 'Does FlipGO offer delivery or shipping services?',
    answer: 'Currently, FlipGO supports local pickup and direct communication between buyers and sellers. However, we are working on integrating delivery options soon. Always meet in safe, public locations and verify items before completing a transaction.',
  }
];

export default function FAQSectionScreen() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <View>
      {FAQ_DATA.map((item, index) => (
        <View key={index} style={styles.card}>
          <TouchableOpacity onPress={() => setOpenIndex(openIndex === index ? null : index)}>
            <View style={styles.questionRow}>
              <Text style={styles.question}>{item.question}</Text>
              <MaterialCommunityIcons
                name={openIndex === index ? 'chevron-up' : 'chevron-down'}
                size={24}
                color="#fff"
              />
            </View>
          </TouchableOpacity>
          {openIndex === index && <Text style={styles.answer}>{item.answer}</Text>}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#d8a7a7',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
  },
  questionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  question: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 16,
  },
  answer: {
    color: '#fff',
    marginTop: 10,
    fontSize: 14,
  },
});