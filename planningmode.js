import { useState, useEffect, useContext } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, Platform, StyleSheet, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { v4 as uuidv4 } from 'uuid';
import * as chrono from 'chrono-node';
import { TasksContext } from './Task-management';
import {
  studyingMethods,
  parseTask as parseTaskHelper,
  onStartDateChange as onStartDateChangeHelper,
  onEndDateChange as onEndDateChangeHelper,
  onStartTimeChange as onStartTimeChangeHelper,
  onEndTimeChange as onEndTimeChangeHelper
} from "./Components/LongMode/longModeHelpers"
export default function PlanMode() {
  const { addTask } = useContext(TasksContext);
  const [rawInput, setRawInput] = useState('');
  const [taskName, setTaskName] = useState('');
  const [priority, setPriority] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [studyingMethod, setStudyingMethod] = useState('');
  const [productivitySuggestion, setProductivitySuggestion] = useState('');
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [isParsing, setIsParsing] = useState(false);

   
 
  // Parse's natural language input to extract task details
  const parseTask = async () => {
    if (!rawInput.trim()) return;
    setIsParsing(true);
    await parseTaskHelper(
      rawInput,
      setTaskName,
      setStartDate,
      setEndDate,
      setProductivitySuggestion
    );
    setIsParsing(false);
  };


// Save the planned task to context
  const saveTask = () => {
    const taskObject = {
      id: uuidv4(),
      mode: 'long',
      taskName,
      priority,
      startDate,
      endDate,
      studyingMethod,
      productivitySuggestion,
    };
    addTask(taskObject);
    console.log('Long mode task saved:', taskObject);
  };

  return (
    <ScrollView contentContainerStyle={styles.contentContainer} style={styles.container}>
      <Text style={styles.header}>Plan Your Task</Text>
       {/* Natural Language Input */}
      <Text style={styles.label}>Enter Task Description (Natural Language):</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Ex: Review chapter 3 tomorrow at 3pm"
        value={rawInput}
        onChangeText={setRawInput}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={parseTask} disabled={isParsing}>
        <Text style={styles.buttonText}>{isParsing ? 'Parsing...' : 'Parse Task'}</Text>
      </TouchableOpacity>


      {/* Task Name Input */}
      <Text style={styles.label}>Task Name:</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Task Name"
        value={taskName}
        onChangeText={setTaskName}
      />

        {/* Priority Selection */}
      <Text style={styles.label}>Select Priority:</Text>
      <View style={styles.priorityContainer}>
        {['Low', 'Medium', 'High'].map((level) => (
          <TouchableOpacity
            key={level}
            style={[styles.priorityButton, priority === level && styles.priorityButtonSelected]}
            onPress={() => setPriority(level)}
          >
            <Text style={[styles.priorityButtonText, priority === level && styles.priorityButtonTextSelected]}>
              {level}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

       {/* Start Date/Time Pickers */}
      <Text style={styles.label}>Start Date:</Text>
      <TouchableOpacity style={styles.datePickerButton} onPress={() => setShowStartDatePicker(true)}>
        <Text style={styles.datePickerText}>{startDate ? startDate.toLocaleDateString() : 'Select Start Date'}</Text>
      </TouchableOpacity>
      {showStartDatePicker && (
        <DateTimePicker
          value={startDate || new Date()}
          mode="date"
          display={Platform.OS === 'android' ? 'spinner' : 'default'}
          onChange={(event, selectedDate) => onStartDateChangeHelper(
            event,
            selectedDate,
            setShowStartDatePicker,
            setStartDate,
            startDate
          )}
        />
      )}
      <Text style={styles.label}>Start Time:</Text>
      <TouchableOpacity style={styles.datePickerButton} onPress={() => setShowStartTimePicker(true)}>
        <Text style={styles.datePickerText}>{startDate ? startDate.toLocaleTimeString() : 'Select Start Time'}</Text>
      </TouchableOpacity>
      {showStartTimePicker && (
        <DateTimePicker
          value={startDate || new Date()}
          mode="time"
          display={Platform.OS === 'android' ? 'spinner' : 'default'}
          onChange={(event, selectedTime) => onStartTimeChangeHelper(
            event,
            selectedTime,
            setShowStartTimePicker,
            setStartDate,
            startDate
          )}
        />
      )}

       {/* End Date/Time Pickers */}
      <Text style={styles.label}>End Date:</Text>
      <TouchableOpacity style={styles.datePickerButton} onPress={() => setShowEndDatePicker(true)}>
        <Text style={styles.datePickerText}>{endDate ? endDate.toLocaleDateString() : 'Select End Date'}</Text>
      </TouchableOpacity>
      {showEndDatePicker && (
        <DateTimePicker
          value={endDate || new Date()}
          mode="date"
          display={Platform.OS === 'android' ? 'spinner' : 'default'}
          onChange={(event, selectedDate) => onEndDateChangeHelper(
            event,
            selectedDate,
            setShowEndDatePicker,
            setEndDate,
            endDate
          )}
        />
      )}
      <Text style={styles.label}>End Time:</Text>
      <TouchableOpacity style={styles.datePickerButton} onPress={() => setShowEndTimePicker(true)}>
        <Text style={styles.datePickerText}>{endDate ? endDate.toLocaleTimeString() : 'Select End Time'}</Text>
      </TouchableOpacity>
      {showEndTimePicker && (
        <DateTimePicker
          value={endDate || new Date()}
          mode="time"
          display={Platform.OS === 'android' ? 'spinner' : 'default'}
          onChange={(event, selectedTime) => onEndTimeChangeHelper(
            event,
            selectedTime,
            setShowEndTimePicker,
            setEndDate,
            endDate
          )}
        />
      )}

       {/* Studying Method Picker */}
      <Text style={styles.label}>Studying Method:</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={studyingMethod} onValueChange={setStudyingMethod} style={styles.picker}>
          <Picker.Item label="Select a Studying Method" value="" />
          {studyingMethods.map((method) => (
            <Picker.Item key={method} label={method} value={method} />
          ))}
        </Picker>
      </View>

       {/* Productivity Suggestion */}
      <Text style={styles.label}>Productivity Suggestion:</Text>
      <Text style={styles.suggestionText}>{productivitySuggestion || 'Your productivity suggestion will appear here after parsing.'}</Text>
        {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={saveTask}>
        <Text style={styles.saveButtonText}>Save Task</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  contentContainer: {
    flexGrow: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  priorityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  priorityButton: {
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  priorityButtonSelected: {
    backgroundColor: '#007AFF',
  },
  priorityButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
  priorityButtonTextSelected: {
    color: 'white',
  },
  datePickerButton: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    alignItems: 'center',
  },
  datePickerText: {
    fontSize: 16,
    color: '#000',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: 'white',
  },
  picker: {
    height: 50,
    color: '#007AFF',
  },
  suggestionText: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: 'green',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

