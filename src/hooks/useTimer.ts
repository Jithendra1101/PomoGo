import { useEffect, useRef } from 'react';
import { usePomodoro } from '../contexts/PomodoroContext';
import { useFavicon } from './useFavicon';
import { useSound } from './useSound';

export const useTimer = () => {
  const { state, dispatch } = usePomodoro();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { updateFavicon } = useFavicon();
  const { playCompletionSound } = useSound();

  const startTimer = () => {
    dispatch({ type: 'SET_RUNNING', payload: true });
  };

  const pauseTimer = () => {
    dispatch({ type: 'SET_RUNNING', payload: false });
  };

  const resetTimer = () => {
    dispatch({ type: 'RESET_TIMER' });
  };

  useEffect(() => {
    if (state.isRunning && state.remainingTime > 0) {
      intervalRef.current = setInterval(() => {
        dispatch({ type: 'SET_REMAINING_TIME', payload: state.remainingTime - 1 });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [state.isRunning, state.remainingTime, dispatch]);

  useEffect(() => {
    if (state.remainingTime === 0 && state.isRunning) {
      dispatch({ type: 'COMPLETE_SESSION' });
      playCompletionSound();
      
      // Show notification
      if ('Notification' in window && Notification.permission === 'granted') {
        const messages = {
          focus: '🎯 Focus session complete! Time for a break.',
          short: '☕ Short break over! Ready to focus?',
          long: '🎉 Long break finished! Let\'s get productive!'
        };
        
        new Notification('Pomodoro Timer', {
          body: messages[state.mode],
          icon: '/favicon.ico'
        });
      }

      // Auto-transition to next session
      setTimeout(() => {
        dispatch({ type: 'AUTO_NEXT_SESSION' });
      }, 1000);
    }
  }, [state.remainingTime, state.isRunning, state.mode, dispatch, playCompletionSound]);

  useEffect(() => {
    updateFavicon(state.remainingTime, state.isRunning);
  }, [state.remainingTime, state.isRunning, updateFavicon]);

  return { startTimer, pauseTimer, resetTimer };
};