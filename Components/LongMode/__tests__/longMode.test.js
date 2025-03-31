import { parseTask } from "../longModeHelpers";
import * as chrono from 'chrono-node';

jest.mock('chrono-node');   

describe('parseTask', () => {
  it(' it should extract task name and set productivity suggestion', async () => {
    // Mocking chrono.parse to return a mock result
    const mockParsedResult = [{ start: { date: () => new Date('2025-03-31T10:00:00') } }];
    chrono.parse.mockReturnValue(mockParsedResult);
    
    // Mocking setState functions
    const setTaskName = jest.fn();
    const setStartDate = jest.fn();
    const setEndDate = jest.fn();
    const setProductivitySuggestion = jest.fn();

    const rawInput = 'Complete the homework by 10 AM';
    
    await parseTask(rawInput, setTaskName, setStartDate, setEndDate, setProductivitySuggestion);

    // Assertions
    expect(setTaskName).toHaveBeenCalledWith('Complete the homework');
    expect(setStartDate).toHaveBeenCalledWith(new Date('2025-03-31T10:00:00'));
    expect(setProductivitySuggestion).toHaveBeenCalledWith(
      'Morning is a great time to tackle challenging subjects. Consider starting with your most demanding study topics while your mind is fresh.'
    );
  });
  
  it('it should handle case with no date', async () => {
    const setTaskName = jest.fn();
    const setStartDate = jest.fn();
    const setEndDate = jest.fn();
    const setProductivitySuggestion = jest.fn();

    const rawInput = 'Complete the homework';
    
    await parseTask(rawInput, setTaskName, setStartDate, setEndDate, setProductivitySuggestion);

    // Assertions for no date found
    expect(setTaskName).toHaveBeenCalledWith('Complete the homework');
    expect(setProductivitySuggestion).toHaveBeenCalledWith('');
  });
});
