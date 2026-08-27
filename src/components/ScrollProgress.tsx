import React, { useEffect, useState } from 'react';

export const ScrollProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        setProgress((totalScroll / windowHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[100] pointer-events-none bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-cyan-400 via-emerald-400 to-purple-500 transition-all duration-75 shadow-[0_0_8px_rgba(0,229,255,0.8)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
