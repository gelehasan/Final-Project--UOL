 export const getColorForMethod = (method) => {
  switch (method) {
    case 'Pomodoro Technique': return '#007AFF';
    case 'SQ3R': return '#FF6347';
    case 'Spaced Repetition': return '#32CD32';
    case 'Feynman Technique': return '#FFD700';
    case 'Mind Mapping': return '#8A2BE2';
    default: return '#ccc';
  }
};
 