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

    const pointAchieved = (avatarPosition, nameLevel,email,avatarName)=>{
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
        /*const {success} = await readCheckpoint(email,nameLevel)
        if (!success){
            const result = await createCheckpoint(element)
            console.log(result)
        }
        console.log(success)*/
        /*var pointsBefore = localStorage.getItem('checkpoints')  
        
        if(pointsBefore != null){
            pointsBefore = JSON.parse(pointsBefore);
            pointsBefore[nameLevel] = element
        }else{
            pointsBefore = {
                [nameLevel]:element
            }
        }
        //localStorage.setItem('checkpoints',JSON.stringify(pointsBefore));
        saveCheckpoint();*/

    }

    const pointValidated = (nameLevel,email)=>{
        const readCheckpoints = async () => {
            const {success} = await readCheckpoint(email,nameLevel)
            return success;
        }
        console.log(readCheckpoints())
        var pointsBefore = localStorage.getItem('checkpoints')  
        pointsBefore = JSON.parse(pointsBefore);
        if(pointsBefore != null){
            if(pointsBefore[nameLevel] != undefined){
                return true;
            }
        }
        return false;
        /*const {success} = await readCheckpoint(email,nameLevel)
        console.log(success)
        return success;*/
    }

  return (
    <CheckpointContext.Provider value={({checkpoints,pointAchieved,pointValidated})}>
        {children}
    </CheckpointContext.Provider>
  )
}
