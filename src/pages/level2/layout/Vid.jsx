import React, { useEffect } from 'react';
import './Styles.css';
import { useLifes } from '../../../context/ManagementLifes';

export const Vid = () => {
  const { lifes, resetGame } = useLifes();

  useEffect(() => {
    if (lifes <= 0) {
      window.location.reload();
    }
  }, [lifes, resetGame]);

  return (
    <div className='container-lifes'>
      {Array.from({ length: lifes }, (_, i) => (
        <span key={i}>❤</span>
      ))}
    </div>
  );
};