import { render, fireEvent } from '@testing-library/react-native';
import QuickMode from '../QuickMode';
import { TasksContext } from '../../../Task-management';

// Mocking the addTask function to check if the task is being added
const mockAddTask = jest.fn();

describe('QuickMode Component', () => {
  it('should update taskName state when input changes', () => {
    const { getByPlaceholderText } = render(
      <TasksContext.Provider value={{ addTask: mockAddTask, tasks: [] }}>
        <QuickMode />
      </TasksContext.Provider>
    );

    const inputField = getByPlaceholderText('Enter task name (ex: revise chapter 1-3)');
    fireEvent.changeText(inputField, 'Test Task');
    
    expect(inputField.props.value).toBe('Test Task');
  });

  it(' it should update priority when a priority button is pressed', () => {
    const { getByText } = render(
      <TasksContext.Provider value={{ addTask: mockAddTask, tasks: [] }}>
        <QuickMode />
      </TasksContext.Provider>
    );

    const mediumPriorityButton = getByText('Medium');
    fireEvent.press(mediumPriorityButton);

    expect(mediumPriorityButton.props.style).toEqual(expect.objectContaining({ backgroundColor: '#007AFF' }));
  });

  it(' it should call addTask function and reset state when save button is pressed', () => {
    const { getByText, getByPlaceholderText } = render(
      <TasksContext.Provider value={{ addTask: mockAddTask, tasks: [] }}>
        <QuickMode />
      </TasksContext.Provider>
    );

    const inputField = getByPlaceholderText('Enter task name (ex: revise chapter 1-3)');
    fireEvent.changeText(inputField, 'Test Task');
    
    const mediumPriorityButton = getByText('Medium');
    fireEvent.press(mediumPriorityButton);

    const saveButton = getByText('Add Task');
    fireEvent.press(saveButton);

    expect(mockAddTask).toHaveBeenCalledTimes(1);
    expect(mockAddTask).toHaveBeenCalledWith(expect.objectContaining({
      taskName: 'Test Task',
      priority: 'Medium',
      mode: 'quick',
    }));
  });
});
