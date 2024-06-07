import React, { createContext, useContext, useEffect, useState } from 'react';

// Crear el contexto de vidas

export const LifesContext = createContext();

export const useLifes = () => {
    const context = useContext(LifesContext)
    if(!context){
        console.error("No existe el contexto");
        return;
    }
  return context;
}

export const LifesProvider = ({ children }) => {
    const [lifes, setLifes] = useState(3);

    const restarLifes = () => {
      setLifes(lifes - 1);
      return lifes;
    };

    
  return (
    <LifesContext.Provider value={({ lifes, restarLifes })}>
      {children}
    </LifesContext.Provider>
  );
};