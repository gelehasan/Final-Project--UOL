import { View, Text } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const ProductiveHours = ({ barChartData, maxCount, styles, screenWidth }) => {
  return (
    <View style={styles.analysisContainer}>
      <Text style={styles.analysisTitle}>Most Productive Hours</Text>
      {maxCount === 0 ? (
        <Text style={styles.noDataText}>No completed tasks data available.</Text>
      ) : (
        <BarChart
          data={barChartData}
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
          verticalLabelRotation={30}
        />
      )}
    </View>
  );
};

export default ProductiveHours;