import React from 'react';
import { Target, TrendingUp } from 'lucide-react';
import { usePomodoro } from '../contexts/PomodoroContext';

const Stats: React.FC = () => {
  const { state } = usePomodoro();
  const dailyGoal = 8;
  const progress = Math.min((state.stats.focusCompleted / dailyGoal) * 100, 100);
  
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
      <div className="flex items-center gap-3 mb-4">
        <TrendingUp className="w-6 h-6 text-blue-500" />
        <h3 className="text-lg font-semibold text-gray-900">
          Today's Progress
        </h3>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative w-24 h-24">
          <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-gray-200"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="text-blue-500 transition-all duration-500"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold text-gray-900">
              {state.stats.focusCompleted}
            </span>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-500">
              Daily Goal: {dailyGoal}
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">
            {state.stats.focusCompleted} sessions
          </p>
          <p className="text-sm text-gray-500">
            {Math.round(progress)}% complete
          </p>
        </div>
      </div>

      {state.cycleCount > 0 && (
        <div className="mt-4 p-3 bg-purple-50 rounded-lg">
          <p className="text-sm text-purple-700">
            Cycle progress: {state.cycleCount}/4 focus sessions
          </p>
        </div>
      )}
    </div>
  );
};

export default Stats;