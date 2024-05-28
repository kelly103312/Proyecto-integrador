import React, { createContext, useContext, useEffect, useState } from 'react';

// Crear el contexto de vidas

export const LifesEnemyContext = createContext();

export const useLifesEnemy = () => {
    const context = useContext(LifesEnemyContext)
    if(!context){
        console.error("No existe el contexto");
        return;
    }
  return context;
}

export const LifesEnemyProvider = ({ children }) => {
    const [lifesEnemy, setLifesEnemy] = useState();

    const restarLifesEnemy = () => {
        setLifesEnemy(lifesEnemy - 1);
      return lifes;
    };

    
  return (
    <LifesEnemyContext.Provider value={({ lifesEnemy, restarLifesEnemy,setLifesEnemy })}>
      {children}
    </LifesEnemyContext.Provider>
  );
};

