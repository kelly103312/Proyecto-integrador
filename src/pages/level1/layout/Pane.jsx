import React from 'react'
import "./Styles.css";
import { useLifes } from '../../../context/ManagementLifes';

export const Pane = () => {
  const { lifes, restarLifes } = useLifes();

  var object = '';
  for (let i = 0; i < lifes; i++) {
    object+= ' ❤ '    
  }  

  return (
    <div className='container-lifes'>
        {object}
    </div>
  )
}
