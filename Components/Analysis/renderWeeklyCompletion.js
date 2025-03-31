import { View, Text } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { getColorForMethod } from './AnalysisHelpers';
import moment from 'moment';

const WeeklyCompletion = ({ pieData, totalScheduled, completedThisWeek, styles, screenWidth }) => {
  return (
    <View style={styles.analysisContainer}>
      <Text style={styles.analysisTitle}>Weekly Task Completion</Text>
      {totalScheduled > 0 ? (
        <PieChart
          data={pieData}
          width={screenWidth - 32}
          height={220}
          chartConfig={{
            backgroundGradientFrom: 'white',
            backgroundGradientTo: 'white',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(51, 51, 51, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#007AFF',
            },
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      ) : (
        <Text style={styles.noDataText}>No tasks scheduled for this week.</Text>
      )}
      <Text style={styles.analysisText}>
        Completed {completedThisWeek.length} of {totalScheduled} tasks.
      </Text>
    </View>
  );
};

export default WeeklyCompletion;