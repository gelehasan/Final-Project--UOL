import { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import moment from 'moment';
import { TasksContext } from '../../Task-management';
import FooterNav from '../Home-Page/Footer';
import CustomHeader from '../Home-Page/CustomHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { studyMethodDurations,getRandomQuote } from './ActiveTaskHelpers';


export default function CurrentTask({ navigation }) {
  const { tasks, removeTask } = useContext(TasksContext);
  const now = new Date();
  
  // Finds the task that is currently active based on the mode and dates, 
  const currentTask = tasks.find(task => {
    if (task.mode === 'long' && task.startDate && task.endDate) {
      const start = new Date(task.startDate);
      const end = new Date(task.endDate);
      // It checs if the current time is between the start and end dates
      return now >= start && now <= end;
    }
    return false;
  });

  // If there  no active task is found a placeholder message is displayed
  if (!currentTask) {
    return (
      <SafeAreaView style={styles.fullScreenContainer}>
        <CustomHeader title="Active Task" />
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderText}>No active task at the moment.</Text>
        </View>
        <FooterNav navigation={navigation} />
      </SafeAreaView>
    );
  }

  const defaultMethod = currentTask.studyingMethod || 'Pomodoro Technique';
  const [selectedMethod, setSelectedMethod] = useState(defaultMethod);
  const [timer, setTimer] = useState(studyMethodDurations[selectedMethod].work);
  const [isWorkPhase, setIsWorkPhase] = useState(true);
  const [quote, setQuote] = useState(getRandomQuote());

  // it sets the  initial timer based on selected study method 
  useEffect(() => {
    setTimer(studyMethodDurations[selectedMethod].work);
    setIsWorkPhase(true);
  }, [selectedMethod]);

  // the interval  updates the timer every second and toggles between work and break phases
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          const durations = studyMethodDurations[selectedMethod];
          if (isWorkPhase) {
            setIsWorkPhase(false);
            return durations.break;
          } else {
            setIsWorkPhase(true);
            return durations.work;
          }
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isWorkPhase, selectedMethod]);

  // The interval  updates the motivational quote every 10 seconds
  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setQuote(getRandomQuote());
    }, 10000);
    return () => clearInterval(quoteInterval);
  }, []);

  // Format time in MM:SS format for displaying timer
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const completeTask = () => {
    removeTask(currentTask.id);
  };

  return (
    <SafeAreaView style={styles.fullScreenContainer}>
      <CustomHeader title="Active Task" />
      <ScrollView contentContainerStyle={styles.contentContainer}>
         
        <View style={styles.taskDetails}>
          <Text style={styles.taskTitle}>{currentTask.taskName}</Text>
          <Text style={styles.studyMethod}>Study Method: {selectedMethod}</Text>
        </View>
        <View style={styles.timerContainer}>
          <Text style={styles.timerLabel}>{isWorkPhase ? 'Work Time' : 'Break Time'}</Text>
          <Text style={styles.timerText}>{formatTime(timer)}</Text>
        </View>
        <View style={styles.methodPickerContainer}>
          <Text style={styles.pickerLabel}>Change Study Method:</Text>
          <Picker
            selectedValue={selectedMethod}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedMethod(itemValue)}
          >
            {Object.keys(studyMethodDurations).map(method => (
              <Picker.Item key={method} label={method} value={method} />
            ))}
          </Picker>
        </View>
        <TouchableOpacity style={styles.completeButton} onPress={completeTask}>
          <Text style={styles.completeButtonText}>Mark as Complete</Text>
        </TouchableOpacity>
        <View style={styles.quoteContainer}>
          <Text style={styles.quoteText}>{quote}</Text>
        </View>
      </ScrollView>
      <FooterNav navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#eef6fd',
  },
  contentContainer: {
    flexGrow: 1,
    padding: 16,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
    color: 'darkgray',
    textAlign: 'center',
  },
  taskDetails: {
    marginBottom: 20,
    alignItems: 'center',
  },
  taskTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: 'royalblue',
    marginBottom: 5,
  },
  studyMethod: {
    fontSize: 16,
    color: 'dimgray',
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  timerLabel: {
    fontSize: 18,
    marginBottom: 5,
    color: 'black',
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'royalblue',
  },
  methodPickerContainer: {
    borderWidth: 1,
    borderColor: 'royalblue',
    borderRadius: 8,
    marginVertical: 10,
    width: '100%',
    overflow: 'hidden',
  },
  pickerLabel: {
    fontSize: 16,
    padding: 8,
    backgroundColor: '#f0f8ff',
    color: 'royalblue',
  },
  picker: {
    height: 50,
    width: '100%',
    color: 'royalblue',
  },
  completeButton: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 15,
    width: '100%',
  },
  completeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  quoteContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'lightgray',
    width: '100%',
  },
  quoteText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: 'black',
    textAlign: 'center',
  },
  placeholderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontSize: 18,
    color: 'gray',
  },
});


