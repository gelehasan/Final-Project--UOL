import { View, Text, StyleSheet, Platform } from 'react-native';

const CustomHeader = ({ title }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 66,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'left',
  },
});

export default CustomHeader;
