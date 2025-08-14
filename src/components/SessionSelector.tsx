import React from 'react';
import { usePomodoro } from '../contexts/PomodoroContext';
import { SessionMode } from '../types/pomodoro';

const SessionSelector: React.FC = () => {
  const { state, dispatch } = usePomodoro();

  const sessions = [
    { mode: 'focus' as SessionMode, label: 'Focus', color: 'bg-red-500' },
    { mode: 'short' as SessionMode, label: 'Short Break', color: 'bg-green-500' },
    { mode: 'long' as SessionMode, label: 'Long Break', color: 'bg-blue-500' }
  ];

  const getBackgroundColor = () => {
    switch (state.mode) {
      case 'focus': return 'bg-red-50';
      case 'short': return 'bg-green-50';
      case 'long': return 'bg-blue-50';
      default: return 'bg-gray-50';
    }
  };

  return (
    <div className={`p-6 rounded-2xl transition-colors duration-500 ${getBackgroundColor()}`}>
      <div className="flex flex-wrap gap-3 justify-center">
        {sessions.map(({ mode, label, color }) => (
          <button
            key={mode}
            onClick={() => dispatch({ type: 'SET_MODE', payload: mode })}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
              state.mode === mode
                ? `${color} text-white shadow-lg transform scale-105`
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SessionSelector;