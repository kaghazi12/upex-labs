import { useEffect, useState, useRef } from 'react';

export const useCountUp = (target, duration = 2000, suffix = '') => {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let started = false;
    
    const countUp = () => {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        setCount(Math.floor(progress * target));
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          setCount(target);
        }
      };
      window.requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            started = true;
            countUp();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [target, duration]);

  return { count: `${count}${suffix}`, ref: elementRef };
};
