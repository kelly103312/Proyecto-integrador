// GameOver.js
import React from 'react';

const GameOver = () => {
    const gameOverStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: '20px',
        borderRadius: '10px',
        color: 'white',
        fontSize: '2em',
        textAlign: 'center',
        zIndex: 1000,
    };

    return (
        <div style={gameOverStyle}>
            Perdiste
        </div>
    );
};

export default GameOver;

