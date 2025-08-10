import { useState, useEffect } from 'react';

export const useScrollShadow = (threshold: number = 10) => {
  const [hasScrollShadow, setHasScrollShadow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setHasScrollShadow(scrollTop > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return hasScrollShadow;
};