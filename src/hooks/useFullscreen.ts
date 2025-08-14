import { useEffect } from 'react';
import { usePomodoro } from '../contexts/PomodoroContext';

export const useFullscreen = () => {
  const { state, dispatch } = usePomodoro();

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        dispatch({ type: 'SET_FULLSCREEN', payload: true });
      } else {
        await document.exitFullscreen();
        dispatch({ type: 'SET_FULLSCREEN', payload: false });
      }
    } catch (error) {
      console.error('Fullscreen error:', error);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      dispatch({ type: 'SET_FULLSCREEN', payload: !!document.fullscreenElement });
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, [dispatch]);

  return { toggleFullscreen };
};