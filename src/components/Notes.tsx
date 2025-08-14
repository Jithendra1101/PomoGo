import React from 'react';
import { StickyNote } from 'lucide-react';
import { usePomodoro } from '../contexts/PomodoroContext';

const Notes: React.FC = () => {
  const { state, dispatch } = usePomodoro();

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
      <div className="flex items-center gap-3 mb-4">
        <StickyNote className="w-6 h-6 text-yellow-500" />
        <h3 className="text-lg font-semibold text-gray-900">
          Session Notes
        </h3>
      </div>

      <textarea
        value={state.notes}
        onChange={(e) => dispatch({ type: 'SET_NOTES', payload: e.target.value })}
        placeholder={`Jot down notes for this ${state.mode} session...`}
        className="w-full h-32 p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-500 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
      />

      <p className="text-xs text-gray-500 mt-2">
        Notes will clear when switching session types
      </p>
    </div>
  );
};

export default Notes;