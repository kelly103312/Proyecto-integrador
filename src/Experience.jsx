import React from 'react'
import { RoutesGame } from "./routes/RoutesGame";
import { AvatarProvider } from './context/AvatarContext';
import { AuthProvider } from './context/AuthContext';

const Experience = () => {
  return (
    <AuthProvider>
        <AvatarProvider>
            <RoutesGame />
        </AvatarProvider>
    </AuthProvider>
  );
};
export default Experience;
