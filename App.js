import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import PlanMode from './planningmode';
import QuickMode from './Components/QuickMode/QuickMode';
import { TasksProvider } from './Task-management';
import { NavigationContainer } from '@react-navigation/native';
import HomePage from './Components/Home-Page/HomePage';
import { createStackNavigator } from '@react-navigation/stack';
import CalendarTab from './Components/Calender/Calendar';
import CurrentTask from './Components/CurrentActiveTask/ActiveTask';
import AnalysisTab from './Components/Analysis/Analysis';
import { SafeAreaView } from 'react-native';

// A stack navigator for managing screen transitions
const Stack = createStackNavigator();

export default function App() {
  return (
    // Providing global state management for tasks
   <TasksProvider>   
    
    <NavigationContainer> 
  
    <Stack.Navigator>  
      {/** Navigation to different section of the app*/}
      <Stack.Screen name='Home' component={HomePage} options={{ headerShown: false }} />
      <Stack.Screen name='QuickMode' component={QuickMode} />
      <Stack.Screen name='PlanMode' component={PlanMode} />
      <Stack.Screen name='Calender' component={CalendarTab} options={{ headerShown: false }}/>
      <Stack.Screen name='CurrentTask' component={CurrentTask}      options={{ headerShown: false }}/>
      <Stack.Screen name='Analysis' component={AnalysisTab}  options={{ headerShown: false }}/>

    </Stack.Navigator>
    
    
    
    </NavigationContainer> 

    </TasksProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
