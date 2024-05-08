import React from 'react'
import { RoutesGame } from "./routes/RoutesGame";
import { AvatarProvider } from './context/AvatarContext';

const Experience = () => {
  return (
    <AvatarProvider>
     <RoutesGame />
    </AvatarProvider>
  );
};
export default Experience;
