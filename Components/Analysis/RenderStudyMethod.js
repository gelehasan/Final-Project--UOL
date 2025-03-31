import { View, Text } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const StudyMethodDistribution = ({ studyMethodPieData, styles, screenWidth }) => {
  return (
    <View style={styles.analysisContainer}>
      <Text style={styles.analysisTitle}>Study Method Distribution</Text>
      {studyMethodPieData.length > 0 ? (
        <PieChart
          data={studyMethodPieData}
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
        <Text style={styles.noDataText}>No completed tasks data available.</Text>
      )}
    </View>
  );
};

export default StudyMethodDistribution;