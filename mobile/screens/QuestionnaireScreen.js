import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function QuestionnaireScreen({ navigation }) {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [desiredWeight, setDesiredWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('low');
  const [diet, setDiet] = useState('balanced');

  const handleSubmit = async () => {
    const userData = {
      height,
      weight,
      age,
      gender,
      desiredWeight,
      activityLevel,
      diet,
    };
    try {
      await AsyncStorage.setItem('@user_data', JSON.stringify(userData));
      navigation.navigate('Tabs'); // Navigate to the Tabs after successful submission
    } catch (error) {
      console.error('Error saving user data', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome! Let's Get to Know You</Text>

      <TextInput
        style={styles.input}
        placeholder="Height (cm)"
        keyboardType="numeric"
        value={height}
        onChangeText={setHeight}
      />

      <TextInput
        style={styles.input}
        placeholder="Weight (kg)"
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
      />

      <TextInput
        style={styles.input}
        placeholder="Age"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />

      <TextInput
        style={styles.input}
        placeholder="Gender"
        value={gender}
        onChangeText={setGender}
      />

      <TextInput
        style={styles.input}
        placeholder="Desired Weight (kg)"
        keyboardType="numeric"
        value={desiredWeight}
        onChangeText={setDesiredWeight}
      />

      <Text style={styles.label}>Activity Level</Text>
      <Picker
        selectedValue={activityLevel}
        style={styles.picker}
        onValueChange={(itemValue) => setActivityLevel(itemValue)}
      >
        <Picker.Item label="Low" value="low" />
        <Picker.Item label="Moderate" value="moderate" />
        <Picker.Item label="High" value="high" />
      </Picker>

      <Text style={styles.label}>Diet Type</Text>
      <Picker
        selectedValue={diet}
        style={styles.picker}
        onValueChange={(itemValue) => setDiet(itemValue)}
      >
        <Picker.Item label="Balanced" value="balanced" />
        <Picker.Item label="Low Carb" value="low_carb" />
        <Picker.Item label="High Protein" value="high_protein" />
        <Picker.Item label="Vegan" value="vegan" />
        <Picker.Item label="Vegetarian" value="vegetarian" />
      </Picker>

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginVertical: 10, borderRadius: 5 },
  label: { fontSize: 18, marginVertical: 10 },
  picker: { height: 50, width: '100%' },
});
