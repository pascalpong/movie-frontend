import { useState, useEffect } from 'react';

const breakpoints = {
  mobile: '(max-width: 639px)',
  tablet: '(min-width: 640px) and (max-width: 768px)',
  desktop: '(min-width: 768px)',
};

const useBreakpoint = () => {
  const [screen, setScreen] = useState<'mobile' | 'tablet' | 'desktop' | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia(breakpoints.mobile).matches) {
        setScreen('mobile');
      } else if (window.matchMedia(breakpoints.tablet).matches) {
        setScreen('tablet');
      } else if (window.matchMedia(breakpoints.desktop).matches) {
        setScreen('desktop');
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return screen;
};

export default useBreakpoint;
