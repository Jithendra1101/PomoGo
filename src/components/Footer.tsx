import React from 'react';
import { ExternalLink, Linkedin, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="text-center mt-12 py-6 border-t border-gray-200">
      <div className="flex justify-center items-center gap-6 mb-3">
        <a 
          href="https://jithendra.in" 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition-all duration-200"
          title="Portfolio"
        >
          <ExternalLink className="w-5 h-5" />
        </a>
        <a 
          href="https://linkedin.com/in/jithendra11" 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition-all duration-200"
          title="LinkedIn"
        >
          <Linkedin className="w-5 h-5" />
        </a>
        <a 
          href="https://github.com/Jithendra1101" 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition-all duration-200"
          title="GitHub"
        >
          <Github className="w-5 h-5" />
        </a>
      </div>
      <div className="text-sm text-gray-500">
        Made by Jithendra
      </div>
    </footer>
  );
};

export default Footer;