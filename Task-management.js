import { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
  // Two arrays one for active tasks and one for completed tasks
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  // Loads both arrays from AsyncStorage when the application mounts
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('@tasksData');
        if (storedData !== null) {
          const parsedData = JSON.parse(storedData);
          setTasks(parsedData.tasks || []);
          setCompletedTasks(parsedData.completedTasks || []);
        }
      } catch (error) {
        console.error('Error loading tasks from storage:', error);
      }
    };
    loadData();
  }, []);

  // Save's both arrays to AsyncStorage whenever they change
  useEffect(() => {
    const saveData = async () => {
      try {
        const dataToStore = { tasks, completedTasks };
        await AsyncStorage.setItem('@tasksData', JSON.stringify(dataToStore));
      } catch (error) {
        console.error('Error saving tasks to storage:', error);
      }
    };
    saveData();
  }, [tasks, completedTasks]);

  // Add a new active task
  const addTask = (task) => {
    setTasks(prev => [...prev, task]);
  };

  // Move a removed task into completedTasks
  const removeTask = (id) => {
    setTasks(prev => {
      const taskToRemove = prev.find(task => task.id === id);
      if (taskToRemove) {
        // Adds the task to completedTasks array
        setCompletedTasks(prevCompleted => [...prevCompleted, taskToRemove]);
      }
      // Filter it out from active tasks
      return prev.filter(task => task.id !== id);
    });
  };

  // Update's an existing active task
  const updateTask = (id, updatedFields) => {
    setTasks(prev =>
      prev.map(task => (task.id === id ? { ...task, ...updatedFields } : task))
    );
  };

  return (
    <TasksContext.Provider
      value={{ tasks, completedTasks, addTask, removeTask, updateTask }}
    >
      {children}
    </TasksContext.Provider>
  );
};
