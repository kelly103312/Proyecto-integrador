import React from 'react'
import "./Styles.css";
import { useLifes } from '../../../context/ManagementLifes';
import { useLifesEnemy } from '../../../context/ManagementLifesEnemy';

export const Pane = () => {
  const { lifes, restarLifes } = useLifes();
  const { lifesEnemy, setLifesEnemy } = useLifesEnemy();

  var object = '';
  if(lifes == 0){
    window.location.reload();
  }
  for (let i = 0; i < lifes; i++) {
    object+= ' ❤ '    
  }  

  return (
    <>
      <div className="row">
        <div className='container-avatar-lifes'>
            {object}
        </div>
        <div className='container-enemy-lifes'>
          Vidas del enemigo: {lifesEnemy}
        </div>
      </div>
    </>
  )
}
