import { useEffect } from 'react';
import { usePomodoro } from '../contexts/PomodoroContext';
import { useTimer } from './useTimer';

export const useKeyboardShortcuts = () => {
  const { state, dispatch } = usePomodoro();
  const { startTimer, pauseTimer, resetTimer } = useTimer();

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (event.code) {
        case 'Space':
          event.preventDefault();
          if (state.isRunning) {
            pauseTimer();
          } else {
            startTimer();
          }
          break;
        case 'KeyR':
          event.preventDefault();
          resetTimer();
          break;
        case 'KeyF':
          event.preventDefault();
          dispatch({ type: 'SET_MODE', payload: 'focus' });
          break;
        case 'KeyS':
          event.preventDefault();
          dispatch({ type: 'SET_MODE', payload: 'short' });
          break;
        case 'KeyL':
          event.preventDefault();
          dispatch({ type: 'SET_MODE', payload: 'long' });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [state.isRunning, dispatch, startTimer, pauseTimer, resetTimer]);
};