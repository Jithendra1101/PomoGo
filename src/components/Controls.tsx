import React from 'react';
import { Play, Pause, RotateCcw, Maximize } from 'lucide-react';
import { usePomodoro } from '../contexts/PomodoroContext';
import { useTimer } from '../hooks/useTimer';
import { useFullscreen } from '../hooks/useFullscreen';

const Controls: React.FC = () => {
  const { state, dispatch } = usePomodoro();
  const { startTimer, pauseTimer, resetTimer } = useTimer();
  const { toggleFullscreen } = useFullscreen();

  const handlePlayPause = () => {
    if (state.isRunning) {
      pauseTimer();
    } else {
      startTimer();
    }
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      <button
        onClick={handlePlayPause}
        className={`flex items-center gap-2 px-8 py-4 rounded-xl font-medium transition-all duration-200 ${
          state.isRunning
            ? 'bg-red-500 hover:bg-red-600 text-white'
            : 'bg-green-500 hover:bg-green-600 text-white'
        } shadow-lg hover:shadow-xl transform hover:scale-105`}
      >
        {state.isRunning ? (
          <>
            <Pause className="w-5 h-5" />
            Pause
          </>
        ) : (
          <>
            <Play className="w-5 h-5" />
            Start
          </>
        )}
      </button>

      <button
        onClick={resetTimer}
        className="flex items-center gap-2 px-6 py-4 rounded-xl font-medium bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 shadow-lg hover:shadow-xl transition-all duration-200"
      >
        <RotateCcw className="w-5 h-5" />
        Reset
      </button>

      <button
        onClick={toggleFullscreen}
        className="flex items-center gap-2 px-6 py-4 rounded-xl font-medium bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 shadow-lg hover:shadow-xl transition-all duration-200"
      >
        <Maximize className="w-5 h-5" />
        {state.isFullscreen ? 'Exit' : 'Fullscreen'}
      </button>
    </div>
  );
};

export default Controls;