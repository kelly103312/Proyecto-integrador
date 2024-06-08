import React, { createContext, useContext, useEffect, useState } from 'react';

// Crear el contexto de vidas
export const LifesContext = createContext();

export const useLifes = () => {
    const context = useContext(LifesContext);
    if (!context) {
        console.error("No existe el contexto");
        return;
    }
    return context;
};

// Proveedor de contexto
export const LifesProvider = ({ children }) => {
    const [lifes, setLifes] = useState(3);
    const [proteccionActiva, setProteccionActiva] = useState(false); // Estado para controlar si la protección está activa

    const restarLifes = () => {
        setLifes(prevLifes => {
            if (!proteccionActiva) {
                return prevLifes - 1;
            } else {
                return prevLifes; // Si la protección está activa, no restar más vidas
            }
        });
    };

    const mantenerVidas = () => {
        setProteccionActiva(true); // Activar la protección
        setTimeout(() => {
            setProteccionActiva(false); // Desactivar la protección después de 60 segundos
        }, 60000); // 60000 ms = 60 segundos
    };

    return (
        <LifesContext.Provider value={{ lifes, restarLifes, mantenerVidas }}>
            {children}
        </LifesContext.Provider>
    );
};