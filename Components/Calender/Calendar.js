import { useState, useContext } from 'react';
import {View,Text,TouchableOpacity,StyleSheet,ScrollView} from 'react-native';
import moment from 'moment';
import { TasksContext } from '../../Task-management';
import FooterNav from '../Home-Page/Footer';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../Home-Page/CustomHeader';
import MonthView from './renderMonthView';
import WeekView from './renderWeekView';
import YearView from './renderYearView';
export default function CalendarTab({ navigation }) {
  const { tasks, removeTask } = useContext(TasksContext);
  const longTasks = tasks.filter(task => task.mode === 'long');
  const [viewMode, setViewMode] = useState('month');
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));

  // Calculates the days of the current week
  const startOfWeek = moment().startOf('isoWeek');
  const weekDays = [];
  for (let i = 0; i < 7; i++) {
    weekDays.push(moment(startOfWeek).add(i, 'days').format('YYYY-MM-DD'));
  }

   // Organize tasks by month
  const tasksByMonth = {};
  longTasks.forEach(task => {
    const month = moment(task.startDate).format('MMMM');
    if (tasksByMonth[month]) {
      tasksByMonth[month].push(task);
    } else {
      tasksByMonth[month] = [task];
    }
  });


  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomHeader title={"Calender"} />
      <View style={styles.container}>
        {/*View mode selection */ }
        <View style={styles.headerSection}>
          <View style={styles.viewModeButtons}>
             {/* Mapping through the 'week', 'month', and 'year' modes */}
            {['week', 'month', 'year'].map(mode => (
              <TouchableOpacity
                key={mode}
                style={[
                  styles.viewModeButton,
                  viewMode === mode && styles.activeViewModeButton,
                ]}
                onPress={() => setViewMode(mode)}
              >
                <Text
                  style={[
                    styles.viewModeText,
                    viewMode === mode && styles.activeViewModeText,
                  ]}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/**Render the appropriate view based on selected mode (month, week, year)  */}
        <View style={styles.calendarContent}>
          {viewMode === 'month'
            ?<MonthView
            tasks={tasks}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            removeTask={removeTask}
            styles={styles} 
          />
            : viewMode === 'week'
            ?  <WeekView
            tasks={longTasks}
            weekDays={weekDays}
            removeTask={removeTask}
            styles={styles}
          />
            :  <YearView
            tasksByMonth={tasksByMonth}
            removeTask={removeTask}
            styles={styles}
          />}
        </View>
      </View>
      <FooterNav navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f4f7',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  viewModeButtons: {
    flexDirection: 'row',
  },
  viewModeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#007AFF',
    marginHorizontal: 5,
  },
  activeViewModeButton: {
    backgroundColor: '#007AFF',
  },
  viewModeText: {
    fontSize: 16,
    color: '#007AFF',
  },
  activeViewModeText: {
    color: 'white',
  },
  calendarContent: {
    flex: 1,
    marginTop: 10,
  },
  viewContainer: {
    flex: 1,
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginVertical: 10,
  },
  tasksScrollView: {
    maxHeight: 300,
    marginVertical: 10,
  },
  noTaskText: {
    fontSize: 16,
    color: 'dimgray',
    textAlign: 'center',
    marginVertical: 10,
  },
  taskCard: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  taskName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  taskDetail: {
    fontSize: 14,
    color: 'dimgray',
  },
  completeButton: {
    backgroundColor: '#28a745',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 8,
  },
  completeButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  daySection: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    paddingBottom: 10,
  },
  dayHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
  },
  monthSection: {
    marginBottom: 15,
  },
  monthHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#007AFF',
    paddingBottom: 5,
  },
});
