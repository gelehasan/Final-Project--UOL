import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import moment from 'moment';

// The WeekView shows active tasks in the current week
export default function  WeekView ({ tasks, weekDays, removeTask, styles }) {
    
    return (
  <ScrollView style={styles.viewContainer}>
    {weekDays.map(dayStr => {
      const dayTasks = tasks.filter(
        task => moment(task.startDate).format('YYYY-MM-DD') === dayStr
      );
      return (
        <View key={dayStr} style={styles.daySection}>
          <Text style={styles.dayHeader}>
            {moment(dayStr).format('dddd, MMM D')}
          </Text>
          {dayTasks.length === 0 ? (
            <Text style={styles.noTaskText}>No tasks</Text>
          ) : (
            dayTasks.map(task => (
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
        </View>
      );
    })}
  </ScrollView>
);
}
