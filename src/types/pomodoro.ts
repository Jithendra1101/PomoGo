export type SessionMode = 'focus' | 'short' | 'long';

export interface PomodoroState {
  mode: SessionMode;
  durations: Record<SessionMode, number>;
  remainingTime: number;
  isRunning: boolean;
  autoStartNext: boolean;
  muted: boolean;
  stats: {
    focusCompleted: number;
    date: string;
  };
  notes: string;
  cycleCount: number;
  isFullscreen: boolean;
}

export type PomodoroAction =
  | { type: 'SET_MODE'; payload: SessionMode }
  | { type: 'SET_DURATION'; payload: { mode: SessionMode; duration: number } }
  | { type: 'SET_REMAINING_TIME'; payload: number }
  | { type: 'SET_RUNNING'; payload: boolean }
  | { type: 'SET_AUTO_START_NEXT'; payload: boolean }
  | { type: 'SET_MUTED'; payload: boolean }
  | { type: 'SET_NOTES'; payload: string }
  | { type: 'SET_FULLSCREEN'; payload: boolean }
  | { type: 'RESET_TIMER' }
  | { type: 'COMPLETE_SESSION' }
  | { type: 'AUTO_NEXT_SESSION' };