import React from 'react'
import { RoutesGame } from "./routes/RoutesGame";
import { AvatarProvider } from './context/AvatarContext';
import { AuthProvider } from './context/AuthContext';
import { LifesProvider } from './context/ManagementLifes';

const Experience = () => {
  return (
      <AuthProvider>
          <LifesProvider>
            <AvatarProvider>
                <RoutesGame />
            </AvatarProvider>
          </LifesProvider>
      </AuthProvider>
  );
};
export default Experience;
