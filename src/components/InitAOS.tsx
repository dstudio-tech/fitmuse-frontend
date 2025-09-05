'use client';
import { useEffect } from 'react';
// import AOS
import AOS from 'aos';

export default function InitAOS() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: false,
      mirror: false,
    });
  }, []);
  return null;
}
