import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';


// MonthView component displays a calendar for the month and tasks for the selected days
const MonthView = ({ tasks, selectedDate, setSelectedDate, removeTask, styles }) => {
  const longTasks = tasks.filter(task => task.mode === 'long');
  
 // An object to mark dates on the calendar where tasks are presen
  const markedDates = {};
  longTasks.forEach(task => {
     // Converts task startDate to YYYY-MM-DD format for marking on the calendar
    const dateStr = moment(task.startDate).format('YYYY-MM-DD');
     // If the date already exists in markedDates, I mark it as true otherwise it gets added to the object
    if (markedDates[dateStr]) {
      markedDates[dateStr].marked = true;
    } else {
      markedDates[dateStr] = { marked: true };
    }
  });

  markedDates[selectedDate] = { ...(markedDates[selectedDate] || {}), selected: true, selectedColor: '#007AFF' };

  // Filtering the tasks to show only those that match the selected date
  const tasksForSelectedDate = longTasks.filter(
    task => moment(task.startDate).format('YYYY-MM-DD') === selectedDate
  );

  return (
    <View style={styles.viewContainer}>
      <Calendar
        current={selectedDate}
        onDayPress={day => setSelectedDate(day.dateString)}
        markedDates={markedDates}
        markingType="simple"
        theme={{
          selectedDayBackgroundColor: '#007AFF',
          todayTextColor: '#007AFF',
          arrowColor: '#007AFF',
        }}
      />
      <Text style={styles.sectionHeader}>Tasks on {moment(selectedDate).format('LL')}</Text>
      <ScrollView style={styles.tasksScrollView}>
        {tasksForSelectedDate.length === 0 ? (
          <Text style={styles.noTaskText}>No tasks on this day.</Text>
        ) : (
          tasksForSelectedDate.map(task => (
            <View key={task.id} style={styles.taskCard}>
              <Text style={styles.taskName}>{task.taskName}</Text>
              <Text style={styles.taskDetail}>Priority: {task.priority}</Text>
              <TouchableOpacity
                style={styles.completeButton}
                onPress={() => removeTask(task.id)}
              >
                <Text style={styles.completeButtonText}>Mark as Complete</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default MonthView;
