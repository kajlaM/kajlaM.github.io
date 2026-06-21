'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Position cursor offscreen initially
    gsap.set(cursor, { x: -100, y: -100 });

    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.35, ease: 'power3.out' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.35, ease: 'power3.out' });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Expand cursor on interactive elements
    const handleMouseEnter = () => {
      gsap.to(cursor, {
        scale: 2.2,
        backgroundColor: 'rgba(255, 255, 255, 0.12)',
        borderColor: 'rgba(255, 255, 255, 0.75)',
        duration: 0.25,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(cursor, {
        scale: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.06)',
        borderColor: 'rgba(255, 255, 255, 0.4)',
        duration: 0.25,
      });
    };

    const setupHoverListeners = () => {
      const selectors = 'a, button, input, textarea, select, [role="button"], .glass-btn, .nav-link, .pill-btn';
      const elements = document.querySelectorAll(selectors);
      elements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    setupHoverListeners();

    // Observer to attach hover to dynamically rendered elements
    const observer = new MutationObserver(setupHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
      const selectors = 'a, button, input, textarea, select, [role="button"], .glass-btn, .nav-link, .pill-btn';
      document.querySelectorAll(selectors).forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return <div id="custom-cursor" ref={cursorRef} className="hidden md:block pointer-events-none" />;
}
