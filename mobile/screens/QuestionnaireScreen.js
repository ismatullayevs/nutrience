import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal } from 'react-native';

export default function QuestionnaireScreen({ navigation }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [goal, setGoal] = useState('');
  const [method, setMethod] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [weightGoal, setWeightGoal] = useState('');
  const [speed, setSpeed] = useState('');
  const [genderModalVisible, setGenderModalVisible] = useState(false);
  const [speedModalVisible, setSpeedModalVisible] = useState(false);

  // Handle "Next" Button Click
  const handleNext = () => {
    if (currentStep === 1 && goal === '') return;
    if (currentStep === 2 && method === '') return;
    if (currentStep === 3 && (age === '' || height === '' || gender === '')) return;
    if (currentStep === 4 && (weight === '' || weightGoal === '' || speed === '')) return;

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  // Handle "Previous" Button Click
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Handle Form Submission
  const handleSubmit = async () => {
    const userData = {
      goal,
      method,
      gender,
      age,
      height,
      weight,
      weightGoal,
      speed,
    };
    try {
      // You can store the data or send it to an API here
      console.log(userData);
      navigation.navigate('Tabs');
    } catch (error) {
      console.error('Error saving user data', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Step Indicator */}
      <View style={styles.stepIndicator}>
        <Text style={[styles.step, currentStep >= 1 && styles.activeStep]}>1</Text>
        <Text style={[styles.step, currentStep >= 2 && styles.activeStep]}>2</Text>
        <Text style={[styles.step, currentStep >= 3 && styles.activeStep]}>3</Text>
        <Text style={[styles.step, currentStep >= 4 && styles.activeStep]}>4</Text>
      </View>

      {/* Render different steps based on currentStep */}
      {currentStep === 1 && (
        <View style={styles.stepContainer}>
          <Text style={styles.title}>What's your goal?</Text>
          <Text style={styles.subtitle}>We’ll help you find the right calorie intake to achieve it</Text>
          <TouchableOpacity
            style={[styles.optionButton, goal === 'Fat Loss' && styles.selectedOption]}
            onPress={() => setGoal('Fat Loss')}
          >
            <Text style={styles.optionText}>Fat Loss</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, goal === 'Muscle Gain' && styles.selectedOption]}
            onPress={() => setGoal('Muscle Gain')}
          >
            <Text style={styles.optionText}>Muscle Gain</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, goal === 'Weight Maintenance' && styles.selectedOption]}
            onPress={() => setGoal('Weight Maintenance')}
          >
            <Text style={styles.optionText}>Weight Maintenance</Text>
          </TouchableOpacity>
        </View>
      )}

      {currentStep === 2 && (
        <View style={styles.stepContainer}>
          <Text style={styles.title}>How do you want to achieve it?</Text>
          <TouchableOpacity
            style={[styles.optionButton, method === 'Meal Plan' && styles.selectedOption]}
            onPress={() => setMethod('Meal Plan')}
          >
            <Text style={styles.optionText}>I need a meal plan</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, method === 'Track Foods' && styles.selectedOption]}
            onPress={() => setMethod('Track Foods')}
          >
            <Text style={styles.optionText}>I need to track my foods</Text>
          </TouchableOpacity>
        </View>
      )}

      {currentStep === 3 && (
        <View style={styles.stepContainer}>
          <Text style={styles.title}>About You</Text>
          <TextInput
            style={styles.input}
            placeholder="Age"
            keyboardType="numeric"
            value={age}
            onChangeText={setAge}
          />
          <TextInput
            style={styles.input}
            placeholder="Height (cm)"
            keyboardType="numeric"
            value={height}
            onChangeText={setHeight}
          />
          <TouchableOpacity
            style={styles.input}
            onPress={() => setGenderModalVisible(true)}
          >
            <Text style={styles.optionText}>{gender ? `Gender: ${gender}` : 'Select Gender'}</Text>
          </TouchableOpacity>
          {/* Gender Modal */}
          <Modal
            visible={genderModalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setGenderModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={() => {
                    setGender('Male');
                    setGenderModalVisible(false);
                  }}
                >
                  <Text style={styles.optionText}>Male</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={() => {
                    setGender('Female');
                    setGenderModalVisible(false);
                  }}
                >
                  <Text style={styles.optionText}>Female</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      )}

      {currentStep === 4 && (
        <View style={styles.stepContainer}>
          <Text style={styles.title}>Your Weight Goals</Text>
          <TextInput
            style={styles.input}
            placeholder="Current Weight (kg)"
            keyboardType="numeric"
            value={weight}
            onChangeText={setWeight}
          />
          <TextInput
            style={styles.input}
            placeholder="Weight Goal (kg)"
            keyboardType="numeric"
            value={weightGoal}
            onChangeText={setWeightGoal}
          />
          <TouchableOpacity
            style={styles.input}
            onPress={() => setSpeedModalVisible(true)}
          >
            <Text style={styles.optionText}>{speed ? `Speed: ${speed}` : 'Select Speed'}</Text>
          </TouchableOpacity>
          {/* Speed Modal */}
          <Modal
            visible={speedModalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setSpeedModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={() => {
                    setSpeed('Slow');
                    setSpeedModalVisible(false);
                  }}
                >
                  <Text style={styles.optionText}>Slow</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={() => {
                    setSpeed('Moderate');
                    setSpeedModalVisible(false);
                  }}
                >
                  <Text style={styles.optionText}>Moderate</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={() => {
                    setSpeed('Fast');
                    setSpeedModalVisible(false);
                  }}
                >
                  <Text style={styles.optionText}>Fast</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      )}

      {/* Previous and Next Buttons */}
      <View style={styles.buttonContainer}>
        {currentStep > 1 && (
          <TouchableOpacity style={[styles.button, styles.equalButton]} onPress={handlePrevious}>
            <Text style={styles.buttonText}>Previous</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={[styles.button, styles.equalButton]} onPress={handleNext}>
          <Text style={styles.buttonText}>{currentStep < 4 ? 'Next' : 'Submit'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'space-between' },
  stepIndicator: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  step: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#ccc',
    textAlign: 'center',
    lineHeight: 28,
    marginHorizontal: 5,
    fontWeight: 'bold',
    color: '#ccc',
  },
  activeStep: {
    borderColor: '#6200ee',
    color: '#6200ee',
  },
  stepContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  subtitle: { fontSize: 16, color: '#777', marginBottom: 20 },
  optionButton: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#6200ee',
  },
  selectedOption: {
    backgroundColor: '#6200ee',
    color: '#fff',
  },
  optionText: {
    fontSize: 16,
    color: '#000',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#6200ee',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  equalButton: {
    flex: 1,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#6200ee',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalOption: {
    padding: 15,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#6200ee',
  },
});
