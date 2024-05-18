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
    const [checkpoints, setCheckpoint] = useState();

    const pointAchieved = async (avatarPosition, nameLevel,email,avatarName)=>{
        var element = {
            avatar : avatarName,
            position : avatarPosition,
            level : nameLevel,
            user : email,

        };

        const {success} = await readCheckpoint(email,nameLevel)
        if (!success)
            await createCheckpoint(element)

        /*var pointsBefore = localStorage.getItem('checkpoints')  
        
        if(pointsBefore != null){
            pointsBefore = JSON.parse(pointsBefore);
            pointsBefore[nameLevel] = element
        }else{
            pointsBefore = {
                [nameLevel]:element
            }
        }
        localStorage.setItem('checkpoints',JSON.stringify(pointsBefore));*/


    }

    const pointValidated = async (nameLevel,email)=>{
        /*var pointsBefore = localStorage.getItem('checkpoints')  
        pointsBefore = JSON.parse(pointsBefore);
        if(pointsBefore != null){
            if(pointsBefore[nameLevel] != undefined){
                return true;
            }
        }
        return false;*/
        const {success} = await readCheckpoint(email,nameLevel)
        console.log(success)
        return success;
    }

  return (
    <CheckpointContext.Provider value={({checkpoints,pointAchieved,pointValidated})}>
        {children}
    </CheckpointContext.Provider>
  )
}
