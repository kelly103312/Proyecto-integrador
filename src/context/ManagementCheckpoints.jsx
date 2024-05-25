import React, { createContext, useContext, useState } from 'react'
import { Vector3 } from 'three';
import { createCheckpoint, readCheckpoint } from '../db/checkpoints-collection';

export const CheckpointContext = createContext();

export const UseCheckpoints = () =>{
    const context = useContext(CheckpointContext)
    if(!context){
        console.error("No existe el contexto");
        return;
    }

    return context;
}

export const CheckpointsProvider = ({children}) => {
    const [checkpoints, setCheckpoint] = useState(false);

    const obtained = () =>{
        setCheckpoint(true);
        return checkpoints;
    }
    const pointAchieved = (avatarPosition, nameLevel,email,avatarName)=>{
            setCheckpoint(true);
            var position = {
                x : avatarPosition.x,
                y : avatarPosition.y,
                z : avatarPosition.z,
            }
            var element = {
                avatar : avatarName,
                position : position,
                level : nameLevel,
                user : email,
        
            };
            
            const saveCheckpoint = async () => {
                const {success} = await readCheckpoint(email,nameLevel)
                if (!success){
                  const response = await createCheckpoint(element)
                }
            }
            
            saveCheckpoint()
       
    }

    return (
        <CheckpointContext.Provider value={({checkpoints,obtained,pointAchieved})}>
            {children}
        </CheckpointContext.Provider>
    )
}
