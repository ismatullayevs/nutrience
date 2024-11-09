// MealPlanScreen.js
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import MealCard from '../components/MealCard';

const mealPlans = [
  { id: '1', title: 'Breakfast', description: 'Healthy oats with berries' },
  { id: '2', title: 'Lunch', description: 'Grilled chicken salad' },
];

export default function MealPlanScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={mealPlans}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MealCard title={item.title} description={item.description} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
});
