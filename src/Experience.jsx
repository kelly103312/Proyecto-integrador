import React from 'react'
import { RoutesGame } from "./routes/RoutesGame";
import { AvatarProvider } from './context/AvatarContext';
import { AuthProvider } from './context/AuthContext';
import { LifesProvider } from './context/ManagementLifes';
import { CheckpointsProvider } from './context/ManagementCheckpoints';
import { LifesEnemyProvider } from './context/ManagementLifesEnemy';

const Experience = () => {
  return (
      <AuthProvider>
          <LifesProvider>
            <LifesEnemyProvider>
              <CheckpointsProvider>
                <AvatarProvider>
                    <RoutesGame />
                </AvatarProvider>
              </CheckpointsProvider>
            </LifesEnemyProvider>
          </LifesProvider>
      </AuthProvider>
  );
};
export default Experience;