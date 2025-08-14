import React from 'react';
import { usePomodoro } from '../contexts/PomodoroContext';
import { formatTime } from '../utils/time';

const TimerDisplay: React.FC = () => {
  const { state } = usePomodoro();
  

  return (
    <div className="text-center">
      <div className="text-8xl md:text-9xl font-mono font-bold text-gray-900 mb-6">
        {formatTime(state.remainingTime)}
      </div>
    </div>
  );
};

export default TimerDisplay;