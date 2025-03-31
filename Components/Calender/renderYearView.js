import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import moment from 'moment';

// The YearView component displays tasks grouped by month.
const YearView = ({ tasksByMonth, removeTask, styles }) => (
  <ScrollView style={styles.viewContainer}>
    {Object.keys(tasksByMonth).map(month => (
      <View key={month} style={styles.monthSection}>
        <Text style={styles.monthHeader}>{month}</Text>
        {tasksByMonth[month].map(task => (
          <View key={task.id} style={styles.taskCard}>
            <Text style={styles.taskName}>{task.taskName}</Text>
            <Text style={styles.taskDetail}>Priority: {task.priority}</Text>
            <Text style={styles.taskDetail}>
              Date: {moment(task.startDate).format('MMM D, YYYY')}
            </Text>
            <TouchableOpacity
              style={styles.completeButton}
              onPress={() => removeTask(task.id)}
            >
              <Text style={styles.completeButtonText}>Mark as Complete</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    ))}
  </ScrollView>
);

export default YearView;
