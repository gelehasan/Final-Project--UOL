// Different types of study methods with their work and break durations in seconds
export const studyMethodDurations = {
    'Pomodoro Technique': { work: 25 * 60, break: 5 * 60 },
    'SQ3R': { work: 30 * 60, break: 10 * 60 },
    'Spaced Repetition': { work: 20 * 60, break: 5 * 60 },
    'Feynman Technique': { work: 40 * 60, break: 10 * 60 },
    'Mind Mapping': { work: 15 * 60, break: 5 * 60 },
  };
  

// List of motivational quotes
export const quotes = [
    "Believe in yourself and all that you are.",
    "Don't watch the clock; do what it does. Keep going.",
    "The secret of getting ahead is getting started.",
    "It always seems impossible until it's done.",
    "Success is the sum of small efforts, repeated day in and day out.",
  ];
  
// Function to get a random quote from the list
export const getRandomQuote = () => {
    const index = Math.floor(Math.random() * quotes.length);
    return quotes[index];
  };