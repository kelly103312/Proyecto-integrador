import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MontanasHielo } from '../pages/montanas_hielo/MontanasHielo'

export const RoutesGame = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/montanas_hielo" element={<MontanasHielo/>} />
        </Routes>
    </BrowserRouter>
  )
}
