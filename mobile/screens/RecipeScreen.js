// RecipeScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function RecipeScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Recipe Details</Text>
      {/* Add recipe details here */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold' },
});
