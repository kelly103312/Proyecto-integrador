import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MontanasHielo } from '../pages/montanas_hielo/MontanasHielo'
import { CuevaEncantada } from '../pages/cueva_encantada/CuevaEncantada'
import Level1 from '../pages/level1/Level1'

export const RoutesGame = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/montanas_hielo" element={<MontanasHielo/>} />
          <Route path="/cueva_encantada" element={<CuevaEncantada/>} />
          <Route path="/level1" element={<Level1 />} />
        </Routes>
    </BrowserRouter>
  )
}
