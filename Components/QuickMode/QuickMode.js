import  { useState } from 'react';
import { ScrollView,Text,TextInput,TouchableOpacity,StyleSheet,View,} from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import { TasksContext } from '../../Task-management';
import { useContext } from 'react';
export default function QuickMode() {
  const [taskName, setTaskName] = useState('');
  const [priority, setPriority] = useState(null);
 
 
  const { addTask,tasks } = useContext(TasksContext);
  const saveTask = () => {
    //  Checking both task name and priority are set.
    if (!taskName.trim() || !priority) return;
    
    const newTask = {
      id: uuidv4(),
      mode:'quick',
      taskName: taskName.trim(),
      priority,
    };

    addTask(newTask);


    setTaskName('');
    setPriority(null);

    
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Quick Mode</Text>
      
      {/* Task Name Input */}
      <TextInput
        style={styles.textInput}
        placeholder="Enter task name (ex: revise chapter 1-3)"
        value={taskName}
        onChangeText={setTaskName}
      />
      {/* Priority Selection */}
      <Text style={styles.label}>Select Priority:</Text>
      <View style={styles.priorityContainer}>
        {['Low', 'Medium', 'High'].map((level) => (
          <TouchableOpacity
            key={level}
            style={[
              styles.priorityButton,
              priority === level && styles.priorityButtonSelected,
            ]}
            onPress={() => setPriority(level)}
          >
            <Text
              style={[
                styles.priorityButtonText,
                priority === level && styles.priorityButtonTextSelected,
              ]}
            >
              {level}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Add Task Button */}
      <TouchableOpacity style={styles.addButton} onPress={saveTask}>
        <Text style={styles.addButtonText}>Add Task</Text>
      </TouchableOpacity>

      {/* Display Added Tasks */}
      <Text style={styles.subHeader}>Tasks:</Text>
      {tasks.map((task) => (
  task.mode === "quick" && (
    <View key={task.id} style={styles.taskItem}>
      <Text style={styles.taskText}>
        {task.taskName} - Priority: {task.priority}
      </Text>
    </View>
  )
))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
    flexGrow: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  priorityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  priorityButton: {
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  priorityButtonSelected: {
    backgroundColor: '#007AFF',
  },
  priorityButtonText: {
    fontSize: 16,
    color: '#007AFF',
  },
  priorityButtonTextSelected: {
    color: 'white',
  },
  addButton: {
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  taskItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  taskText: {
    fontSize: 16,
  },
});
