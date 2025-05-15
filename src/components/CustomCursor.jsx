
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = ({ theme }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  const cursorVariants = {
    default: {
      x: mousePosition.x - 12,
      y: mousePosition.y - 12,
      width: 24,
      height: 24,
      borderWidth: '2px',
      borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
      backgroundColor: 'transparent',
      transition: {
        type: 'spring',
        stiffness: 500,
        damping: 30,
      },
    },
  };

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
      variants={cursorVariants}
      animate="default"
    />
  );
};

export default CustomCursor;
