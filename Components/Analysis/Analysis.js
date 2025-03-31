import  { useState, useContext } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import moment from 'moment';
import { PieChart, BarChart } from 'react-native-chart-kit';
import { TasksContext } from '../../Task-management';
import FooterNav from '../Home-Page/Footer';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../Home-Page/CustomHeader';
import { getColorForMethod } from './AnalysisHelpers';
import WeeklyCompletion from './renderWeeklyCompletion';
import ProductiveHours from './renderProductiveHours';
import StudyMethodDistribution from './RenderStudyMethod';
const screenWidth = Dimensions.get('window').width;


const AnalysisTab = ({ navigation }) => {
  const { tasks = [], completedTasks = [] } = useContext(TasksContext);
  const [analysisType, setAnalysisType] = useState('Weekly Completion');
  const startOfWeek = moment().startOf('isoWeek');
  const endOfWeek = moment().endOf('isoWeek');
 
  // Filters tasks that are scheduled for this week (both pending and completed)
  const scheduledThisWeek = [
    ...tasks.filter(task =>
      task.mode === 'long' &&
      moment(task.startDate).isBetween(startOfWeek, endOfWeek, undefined, '[]')
    ),
    ...completedTasks.filter(task =>
      task.mode === 'long' &&
      moment(task.startDate).isBetween(startOfWeek, endOfWeek, undefined, '[]')
    ),
  ];


   // Filters tasks that were completed this week
  const completedThisWeek = completedTasks.filter(task =>
    task.mode === 'long' &&
    moment(task.startDate).isBetween(startOfWeek, endOfWeek, undefined, '[]')
  );

   // Calculating scheduled and remaining tasks for pie chart data
  const totalScheduled = scheduledThisWeek.length;
  const remainingCount = totalScheduled - completedThisWeek.length;
  const pieData = totalScheduled > 0 ? [
    {
      name: 'Completed',
      population: completedThisWeek.length,
      color: 'green',
      legendFontColor: 'black',
      legendFontSize: 12,
    },
    {
      name: 'Remaining',
      population: remainingCount,
      color: 'orangered',
      legendFontColor: 'black',
      legendFontSize: 12,
    },
  ] : [];

  // Computing most productive hours for bar chart
  const hourCounts = {};
  completedTasks.filter(task => task.mode === 'long' && task.startDate).forEach(task => {
    const hour = moment(task.startDate).hour();
    hourCounts[hour] = (hourCounts[hour] || 0) + 1;
  });

  // Generates bar chart labels and data
  const barLabels = [];
  const barData = [];
  for (let i = 0; i < 24; i++) {
    barLabels.push(i.toString());
    barData.push(hourCounts[i] || 0);
  }
  // Structure data for the bar chart
  const barChartData = {
    labels: barLabels,
    datasets: [
      {
        data: barData,
      },
    ],
  };


// Computes study method distribution for pie chart
  const methodCounts = {};
  completedTasks.filter(task => task.mode === 'long' && task.studyingMethod).forEach(task => {
    const method = task.studyingMethod;
    methodCounts[method] = (methodCounts[method] || 0) + 1;
  });

  // Structures study method data for pie chart
  const studyMethodPieData = Object.keys(methodCounts).map(method => ({
    name: method,
    population: methodCounts[method],
    color: getColorForMethod(method),
    legendFontColor: "black",
    legendFontSize: 12,
  }));

   // Function to render the selected analysis component
  const renderAnalysis = () => {
    switch (analysisType) {
      case 'Weekly Completion':
        return <WeeklyCompletion pieData={pieData} totalScheduled={totalScheduled} completedThisWeek={completedThisWeek} styles={styles} screenWidth={screenWidth} />;;
      case 'Most Productive Hours':
        const maxCount = Math.max(...barData, 0);
        return  <ProductiveHours barChartData={barChartData} maxCount={maxCount} styles={styles} screenWidth={screenWidth} />;
      case 'Study Method Distribution':
        return <StudyMethodDistribution studyMethodPieData={studyMethodPieData} styles={styles} screenWidth={screenWidth} />;
      default:
        return null;
    }
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomHeader title="Analysis" />
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Choose an analysis to display</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={analysisType}
            style={styles.picker}
            onValueChange={(itemValue) => setAnalysisType(itemValue)}
          >
            <Picker.Item label="Weekly Completion" value="Weekly Completion" />
            <Picker.Item label="Most Productive Hours" value="Most Productive Hours" />
            <Picker.Item label="Study Method Distribution" value="Study Method Distribution" />
          </Picker>
        </View>
        {renderAnalysis()}
      </ScrollView>
      <FooterNav navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f4f7',
  },
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7',
    padding: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: 'black',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#007AFF',
  },
  analysisContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  analysisTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  analysisText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 12,
    textAlign: 'center',
  },
  noDataText: {
    textAlign: 'center',
    color: '#555',
    fontSize: 16,
    marginVertical: 10,
  },
});

export default AnalysisTab;
