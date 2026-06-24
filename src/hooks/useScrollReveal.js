import { useEffect } from 'react';

export const useScrollReveal = () => {
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    const revealObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.remove('opacity-0');
            e.target.classList.add('animate-fade-in');
            revealObs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    
    reveals.forEach((el) => revealObs.observe(el));
    
    return () => {
      reveals.forEach((el) => revealObs.unobserve(el));
    };
  }, []);
};
