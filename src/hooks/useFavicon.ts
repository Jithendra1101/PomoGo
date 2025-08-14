import { useCallback } from 'react';
import { formatTime } from '../utils/time';

export const useFavicon = () => {
  const updateFavicon = useCallback((remainingTime: number, isRunning: boolean) => {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      // Clear canvas
      ctx.fillStyle = isRunning ? '#ef4444' : '#6b7280';
      ctx.fillRect(0, 0, 32, 32);

      // Add text
      ctx.fillStyle = 'white';
      ctx.font = 'bold 12px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      const timeText = formatTime(remainingTime);
      const [minutes] = timeText.split(':');
      ctx.fillText(minutes, 16, 16);

      // Update favicon
      const link = document.querySelector<HTMLLinkElement>('link[rel="icon"]') || 
                   document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
      link.href = canvas.toDataURL('image/x-icon');
      
      if (!document.querySelector('link[rel="icon"]')) {
        document.head.appendChild(link);
      }
    }
  }, []);

  return { updateFavicon };
};