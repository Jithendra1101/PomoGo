import React from 'react';
import { PomodoroProvider } from './contexts/PomodoroContext';
import Header from './components/Header';
import SessionSelector from './components/SessionSelector';
import TimerDisplay from './components/TimerDisplay';
import Controls from './components/Controls';
import Stats from './components/Stats';
import Notes from './components/Notes';
import Settings from './components/Settings';
import Footer from './components/Footer';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { useNotifications } from './hooks/useNotifications';

function AppContent() {
  useKeyboardShortcuts();
  useNotifications();

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <Header />
        <div className="space-y-8">
          <SessionSelector />
          <TimerDisplay />
          <Controls />
          <div className="grid gap-6 md:grid-cols-2">
            <Stats />
            <Notes />
          </div>
          <Settings />
        </div>
        <Footer />
      </div>
    </div>
  );
}

function App() {
  return (
    <PomodoroProvider>
      <AppContent />
    </PomodoroProvider>
  );
}

export default App;