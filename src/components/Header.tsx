import React from 'react';

const Header: React.FC = () => {

  return (
    <header className="text-center mb-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">
        Pomodoro Focus App
      </h1>
      <p className="text-gray-600">
        Stay productive in cycles
      </p>
    </header>
  );
};

export default Header;