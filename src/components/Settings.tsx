import React, { useState } from 'react';
import { Settings as SettingsIcon, Volume2, VolumeX, Bell, BellOff } from 'lucide-react';
import { usePomodoro } from '../contexts/PomodoroContext';
import { formatTime } from '../utils/time';

const Settings: React.FC = () => {
  const { state, dispatch } = usePomodoro();
  const [isExpanded, setIsExpanded] = useState(false);
  const [customDurations, setCustomDurations] = useState({
    focus: Math.floor(state.durations.focus / 60),
    short: Math.floor(state.durations.short / 60),
    long: Math.floor(state.durations.long / 60)
  });

  const handleDurationChange = (mode: 'focus' | 'short' | 'long', value: number) => {
    const duration = Math.max(1, Math.min(120, value)) * 60;
    setCustomDurations(prev => ({ ...prev, [mode]: value }));
    dispatch({ type: 'SET_DURATION', payload: { mode, duration } });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <SettingsIcon className="w-6 h-6 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            Settings
          </h3>
        </div>
        <div className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
          <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </button>

      {isExpanded && (
        <div className="p-6 pt-0 space-y-6">
          <div className="grid gap-4">
            <h4 className="font-medium text-gray-900">Custom Durations</h4>
            
            {(['focus', 'short', 'long'] as const).map((mode) => (
              <div key={mode} className="flex items-center justify-between">
                <label className="text-sm text-gray-600 capitalize">
                  {mode === 'short' ? 'Short Break' : mode === 'long' ? 'Long Break' : 'Focus'} 
                  ({formatTime(state.durations[mode])})
                </label>
                <input
                  type="number"
                  min="1"
                  max="120"
                  value={customDurations[mode]}
                  onChange={(e) => handleDurationChange(mode, parseInt(e.target.value) || 1)}
                  className="w-20 p-2 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-900 text-center"
                />
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={state.autoStartNext}
                onChange={(e) => dispatch({ type: 'SET_AUTO_START_NEXT', payload: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">
                Auto-start next session
              </span>
            </label>
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => dispatch({ type: 'SET_MUTED', payload: !state.muted })}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
              {state.muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              {state.muted ? 'Unmute' : 'Mute'}
            </button>

            <button
              onClick={() => {
                if ('Notification' in window) {
                  Notification.requestPermission();
                }
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
              {Notification.permission === 'granted' ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
              Notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;