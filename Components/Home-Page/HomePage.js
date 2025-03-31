import  { useContext, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { TasksContext } from "../../Task-management"; 
import { SafeAreaView } from "react-native-safe-area-context";
import FooterNav from "./Footer";
import CustomHeader from "./CustomHeader";

export default function HomePage({ navigation }) {
  const { tasks, removeTask } = useContext(TasksContext);
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("Newest");

   // Filtering tasks based on selected priority
  let filteredTasks = tasks;
  if (priorityFilter !== "All") {
    filteredTasks = filteredTasks.filter(
      task =>  task.priority && task.priority.toLowerCase() === priorityFilter.toLowerCase()
    );
  }
  // Sorting tasks by newest or oldest
  if (sortOrder === "Newest") {
    filteredTasks = [...filteredTasks].reverse();
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomHeader title="Home" />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.topSection}>
          {/* Welcome section with navigation buttons */}
          <Text style={styles.welcomeText}>
            Welcome to your Task Management
          </Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.navButton}
              onPress={() => navigation.navigate("QuickMode")}
            >
              <Text style={styles.navButtonText}>Quick Mode</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.navButton}
              onPress={() => navigation.navigate("PlanMode")}
            >
              <Text style={styles.navButtonText}>Long Plan Mode</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Filter section */}
        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>Filter by Priority:</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={priorityFilter}
              itemStyle={styles.pickerItem}
              onValueChange={itemValue => setPriorityFilter(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="All" value="All" />
              <Picker.Item label="Low" value="Low" />
              <Picker.Item label="Medium" value="Medium" />
              <Picker.Item label="High" value="High" />
            </Picker>
          </View>

          {/* Dropdown for sorting order */}
          <Text style={styles.filterLabel}>Sort by:</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={sortOrder}
              onValueChange={itemValue => setSortOrder(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Newest" value="Newest" />
              <Picker.Item label="Oldest" value="Oldest" />
            </Picker>
          </View>
        </View>

          {/* Task List Section */}
        <View style={styles.taskListSection}>
          <Text style={styles.sectionHeader}>Your Tasks</Text>
          {filteredTasks.length === 0 ? (
            <Text style={styles.noTaskText}>No tasks to display.</Text>
          ) : (
            // Mapping through filtered tasks to display them
            filteredTasks.map(task => (
              <View key={task.id} style={styles.taskCard}>
                <Text style={styles.taskName}>
                  [{task.mode.toUpperCase()}] {task.taskName}
                </Text>
                <Text style={styles.taskDetail}>
                  Priority: {task.priority}
                </Text>
                {task.mode === "long" && task.startDate && (
                  <Text style={styles.taskDetail}>
                    Time: {new Date(task.startDate).toLocaleString()}
                  </Text>
                )}
                <TouchableOpacity
                  style={styles.completeButton}
                  onPress={() => removeTask(task.id)}
                >
                  <Text style={styles.completeButtonText}>
                    Mark as Complete
                  </Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
      </ScrollView>
      <FooterNav navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f0f4f7",
  },
  contentContainer: {
    padding: 16,
  },
  topSection: {
    marginBottom: 20,
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "black",
    marginBottom: 15,
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  navButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  navButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  filterSection: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 12,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    marginBottom: 6,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#007AFF",
    borderRadius: 8,
    marginBottom: 10,
    overflow: "hidden",
  },
  picker: {
    height: 54,
    color: "#007AFF",
    color: "black", 
  },
  pickerItem: {
    fontSize: 15,
    color: "black",
  },
  taskListSection: {
    marginTop: 20,
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    marginBottom: 15,
  },
  noTaskText: {
    fontSize: 16,
    color: "dimgray",
    textAlign: "center",
    marginVertical: 20,
  },
  taskCard: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  taskName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    marginBottom: 5,
  },
  taskDetail: {
    fontSize: 14,
    color: "dimgray",
    marginBottom: 5,
  },
  completeButton: {
    backgroundColor: "#28a745",
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 10,
  },
  completeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

