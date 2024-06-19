import { createContext, useContext, useState } from "react";

export const avatarContext = createContext();

export const useAvatar = () =>{
    const context = useContext(avatarContext);
    if(!context){
        console.error("Error creating avatar context");
        return;
    }
    return context;
}

export function AvatarProvider({children}){
    const [avatar, setAvatar] = useState({
        ref: null,
        body: null,
        animation: "Idle",
        position: [0,1,140] // Initial position of the avatar in the scene
    })

    return (
        <avatarContext.Provider value={{avatar, setAvatar}}>
            {children}
        </avatarContext.Provider>
    )
}