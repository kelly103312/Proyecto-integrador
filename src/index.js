import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './Experience'
import { Experience } from './Experience';
import { Canvas } from '@react-three/fiber';
import { KeyboardControls, Loader } from '@react-three/drei';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <Experience/>
  </StrictMode>
);

