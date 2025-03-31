import * as chrono from 'chrono-node';
import { Platform } from 'react-native';

// Array of different studying methods that will be shown in the Picker component
export const studyingMethods = [
  'Pomodoro Technique',
  'SQ3R',
  'Spaced Repetition',
  'Feynman Technique',
  'Mind Mapping',
];


/**
 * Parses natural language input to extract task name, dates, and generate productivity suggestions
 * Algorithm:
 * 1. Uses chrono-node library to parse dates/times from natural language
 * 2. Extracts and removes date information from the input string
 * 3. Uses remaining text as the task name
 * 4. Generates time-based productivity suggestions
 * 
 * */
export const parseTask = async (rawInput, setTaskName, setStartDate, setEndDate, setProductivitySuggestion) => {
  if (!rawInput.trim()) return;
  try {
     // Parse the input text for dates using chrono library
    const parsedResults = chrono.parse(rawInput);
    let extractedDate = null;
    
    // Extract the first found date if available
    if (parsedResults.length > 0) {
      const result = parsedResults[0];
      extractedDate = result.start.date();
    }

    // Removes date strings from original input to get clean task name
    let remainingText = rawInput;
    if (parsedResults.length > 0) {
      parsedResults.forEach(result => {
        remainingText = remainingText.replace(result.text, '');
      });
    }

    // Sets task name to remaining text or original input if no dates were removed
    const extractedTaskName = remainingText.trim() || rawInput;
    setTaskName(extractedTaskName);
    if (extractedDate) {
      setStartDate(extractedDate);
      setEndDate(extractedDate);
      const hour = extractedDate.getHours();
      let suggestion = "";
      if (hour < 12) {
        suggestion = "Morning is a great time to tackle challenging subjects. Consider starting with your most demanding study topics while your mind is fresh.";
      } else if (hour < 18) {
        suggestion = "Afternoon study sessions can be ideal for review and group work. Consider incorporating short breaks to keep your energy up.";
      } else {
        suggestion = "Evenings are perfect for light review and consolidating what you've learned. Consider using techniques like Pomodoro to stay focused without burning out.";
      }
      setProductivitySuggestion(suggestion);
    } else {
      setProductivitySuggestion('');
    }
  } catch (error) {
    console.error('Error parsing task:', error);
  }
};


//  Handles start date selection changes from DateTimePicker
export const onStartDateChange = (event, selectedDate, setShowStartDatePicker, setStartDate, startDate) => {
    if (Platform.OS === 'android') {
      setShowStartDatePicker(false);
    }
    
    if (event.type === 'set' && selectedDate) {
      const updatedDate = new Date(selectedDate);
      // Only update if we have a valid startDate
      if (startDate instanceof Date && !isNaN(startDate)) {
        updatedDate.setHours(startDate.getHours());
        updatedDate.setMinutes(startDate.getMinutes());
      }
      setStartDate(updatedDate);
    }
  };


  // Handles end date selection changes from DateTimePicker
  export const onEndDateChange = (event, selectedDate, setShowEndDatePicker, setEndDate, endDate) => {
    if (Platform.OS === 'android') {
      setShowEndDatePicker(false);
    }
    
    if (event.type === 'set' && selectedDate) {
      const updatedDate = new Date(selectedDate);
      if (endDate instanceof Date && !isNaN(endDate)) {
        updatedDate.setHours(endDate.getHours());
        updatedDate.setMinutes(endDate.getMinutes());
      }
      setEndDate(updatedDate);
    }
  };
  

  // Handles start time selection changes from DateTimePicker

  export const onStartTimeChange = (event, selectedTime, setShowStartTimePicker, setStartDate, startDate) => {
    if (Platform.OS === 'android') {
      setShowStartTimePicker(false);
    }
    
    if (event.type === 'set' && selectedTime) {
      const updatedDate = new Date(startDate || new Date());
      updatedDate.setHours(selectedTime.getHours());
      updatedDate.setMinutes(selectedTime.getMinutes());
      setStartDate(updatedDate);
    }
  };


// Handles end time selection changes from DateTimePicker

export const onEndTimeChange = (event, selectedTime, setShowEndTimePicker, setEndDate, endDate) => {
  if (Platform.OS === 'android') {
    setShowEndTimePicker(false);
  }
  
  if (event.type === 'set' && selectedTime) {
    const updatedDate = new Date(endDate || new Date());
    updatedDate.setHours(selectedTime.getHours());
    updatedDate.setMinutes(selectedTime.getMinutes());
    setEndDate(updatedDate);
  }
};