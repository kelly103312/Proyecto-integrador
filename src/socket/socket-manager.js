"use strict";

import socketIOClient from "socket.io-client";

const urlDeployServer = "https://server-jekh.onrender.com";

// Añadir en esta variable el enalce
const urlLocalServer = "";

/**
 * Socket connection
 */
export const socket = socketIOClient(urlDeployServer);
// export const socket = socketIOClient(urlLocalServer);

export const disconnectSocket = () =>{
    console.log("disconnecting socket...");
    socket.disconnect();
}