import React, { createContext, useContext, useState } from 'react'
import { Vector3 } from 'three';

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

    const pointAchieved = (avatarPosition, nameLevel)=>{
        var pointsBefore = localStorage.getItem('checkpoints')  
        var element = {
            "obtained" : true,
            "positionAvatar" : avatarPosition
        };
        if(pointsBefore != null){
            pointsBefore = JSON.parse(pointsBefore);
            pointsBefore[nameLevel] = element
        }else{
            pointsBefore = {
                [nameLevel]:element
            }
        }
        localStorage.setItem('checkpoints',JSON.stringify(pointsBefore));
    }

    const pointValidated = (nameLevel)=>{
        console.log(nameLevel)
        var pointsBefore = localStorage.getItem('checkpoints')  
        pointsBefore = JSON.parse(pointsBefore);
        if(pointsBefore != null){
            if(pointsBefore[nameLevel] != undefined){
                return true;
            }
        }
        return false;
    }

  return (
    <CheckpointContext.Provider value={({checkpoints,pointAchieved,pointValidated})}>
        {children}
    </CheckpointContext.Provider>
  )
}
