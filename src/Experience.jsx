import React from 'react'
import { RoutesGame } from "./routes/RoutesGame";
import { AvatarProvider } from './context/AvatarContext';
import { AuthProvider } from './context/AuthContext';
import { LifesProvider } from './context/ManagementLifes';
import { CheckpointsProvider } from './context/ManagementCheckpoints';

const Experience = () => {
  return (
      <AuthProvider>
          <LifesProvider>
            <CheckpointsProvider>
              <AvatarProvider>
                  <RoutesGame />
              </AvatarProvider>
            </CheckpointsProvider>
          </LifesProvider>
      </AuthProvider>
  );
};
export default Experience;
