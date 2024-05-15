import React, { createContext, useContext, useState } from 'react';

// Crear el contexto de vidas
export const LifesContext = createContext();

export const useLifes = () => {
  const context = useContext(LifesContext);
  if (!context) {
    console.error("No existe el contexto");
    return {};  // Retorna un objeto vacío en lugar de `undefined`
  }
  return context;
};

// Proveedor de contexto
export const LifesProvider = ({ children }) => {
  const [lifes, setLifes] = useState(3);

  const restarLifes = () => {
    setLifes((prevLifes) => prevLifes - 1);
  };

  return (
    <LifesContext.Provider value={{ lifes, restarLifes }}>
      {children}
    </LifesContext.Provider>
  );
};
