import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MontanasHielo } from '../pages/montanas_hielo/MontanasHielo'
import { CuevaEncantada } from '../pages/cueva_encantada/CuevaEncantada'

export const RoutesGame = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/montanas_hielo" element={<MontanasHielo/>} />
          <Route path="/cueva_encantada" element={<CuevaEncantada/>} />
        </Routes>
    </BrowserRouter>
  )
}
