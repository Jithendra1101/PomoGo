import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { PomodoroState, PomodoroAction, SessionMode } from '../types/pomodoro';

const initialState: PomodoroState = {
  mode: 'focus',
  durations: { focus: 25 * 60, short: 5 * 60, long: 15 * 60 },
  remainingTime: 25 * 60,
  isRunning: false,
  autoStartNext: false,
  muted: false,
  stats: { focusCompleted: 0, date: new Date().toDateString() },
  notes: '',
  cycleCount: 0,
  isFullscreen: false
};

function pomodoroReducer(state: PomodoroState, action: PomodoroAction): PomodoroState {
  switch (action.type) {
    case 'SET_MODE':
      return {
        ...state,
        mode: action.payload,
        remainingTime: state.durations[action.payload],
        isRunning: false,
        notes: ''
      };
    case 'SET_DURATION':
      const newDurations = { ...state.durations, [action.payload.mode]: action.payload.duration };
      return {
        ...state,
        durations: newDurations,
        remainingTime: state.mode === action.payload.mode ? action.payload.duration : state.remainingTime
      };
    case 'SET_REMAINING_TIME':
      return { ...state, remainingTime: action.payload };
    case 'SET_RUNNING':
      return { ...state, isRunning: action.payload };
    case 'SET_AUTO_START_NEXT':
      return { ...state, autoStartNext: action.payload };
    case 'SET_MUTED':
      return { ...state, muted: action.payload };
    case 'SET_NOTES':
      return { ...state, notes: action.payload };
    case 'SET_FULLSCREEN':
      return { ...state, isFullscreen: action.payload };
    case 'RESET_TIMER':
      return {
        ...state,
        remainingTime: state.durations[state.mode],
        isRunning: false
      };
    case 'COMPLETE_SESSION':
      const today = new Date().toDateString();
      const newStats = state.stats.date === today 
        ? { ...state.stats, focusCompleted: state.stats.focusCompleted + (state.mode === 'focus' ? 1 : 0) }
        : { focusCompleted: state.mode === 'focus' ? 1 : 0, date: today };
      
      const newCycleCount = state.mode === 'focus' ? state.cycleCount + 1 : state.cycleCount;
      
      return {
        ...state,
        stats: newStats,
        cycleCount: newCycleCount,
        isRunning: false
      };
    case 'AUTO_NEXT_SESSION':
      let nextMode: SessionMode;
      let resetCycle = false;
      
      if (state.mode === 'focus') {
        nextMode = state.cycleCount >= 4 ? 'long' : 'short';
        if (state.cycleCount >= 4) resetCycle = true;
      } else {
        nextMode = 'focus';
      }
      
      return {
        ...state,
        mode: nextMode,
        remainingTime: state.durations[nextMode],
        isRunning: state.autoStartNext,
        notes: '',
        cycleCount: resetCycle ? 0 : state.cycleCount
      };
    default:
      return state;
  }
}

interface PomodoroContextType {
  state: PomodoroState;
  dispatch: React.Dispatch<PomodoroAction>;
}

const PomodoroContext = createContext<PomodoroContextType | undefined>(undefined);

export const usePomodoro = () => {
  const context = useContext(PomodoroContext);
  if (!context) {
    throw new Error('usePomodoro must be used within a PomodoroProvider');
  }
  return context;
};

export const PomodoroProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(pomodoroReducer, initialState, (initial) => {
    const saved = localStorage.getItem('pomodoro-state');
    if (saved) {
      const parsedState = JSON.parse(saved);
      return {
        ...initial,
        ...parsedState,
        isRunning: false,
        isFullscreen: false
      };
    }
    return initial;
  });

  useEffect(() => {
    localStorage.setItem('pomodoro-state', JSON.stringify({
      ...state,
      isRunning: false,
      isFullscreen: false
    }));
  }, [state]);

  return (
    <PomodoroContext.Provider value={{ state, dispatch }}>
      {children}
    </PomodoroContext.Provider>
  );
};