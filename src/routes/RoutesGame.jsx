import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MontanasHielo } from '../pages/montanas_hielo/MontanasHielo'
import  CuevaEncantada  from '../pages/cueva_encantada/Cueva_Encantada'
import Level1 from '../pages/level1/Level1'
import Login from '../pages/login/Login'
import Level2 from '../pages/level2/Level2'
import { Castillo } from '../pages/castillo/Castillo'

export const RoutesGame = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Level1 />} />
          <Route path="/level1" element={<Level1 />} />
          <Route path="/level2" element={<Level2 />} />
          <Route path="/castillo" element={<Castillo/>} />
          <Route path="/montanas_hielo" element={<MontanasHielo/>} />
          <Route path="/cueva_encantada" element={<CuevaEncantada/>} />
        </Routes>
    </BrowserRouter>
  )
}
