import { View, TouchableOpacity, Image,Text, StyleSheet } from 'react-native';
import Home from "../../assets/home.png"
import Calendar from "../../assets/calendar.png"
import Clock from "../../assets/clock.png"
import analysis from "../../assets/analysis.png"

export default function FooterNav({ navigation }) {
  return (
    <View style={styles.footer}>

      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Image source={Home} style={styles.icon} />
      </TouchableOpacity>
            <TouchableOpacity onPress={()=> navigation.navigate('Analysis')}>
        <Image source={analysis} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Calender')}>
        <Image source={Calendar} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> navigation.navigate('CurrentTask')}>
        <Image source={Clock} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'lightgray',
    paddingVertical: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
});