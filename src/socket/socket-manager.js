"use strict"
import socketIOClient from 'socket.io-client';

/**
 * Socket connection
 */
//export const socket = socketIOClient("http://localhost:3000");
console.log("Connecting to server:", "http://localhost:3000");
export const socket = socketIOClient("http://localhost:3000");
//export const socket = socketIOClient(process.env.REACT_APP_SOCKET_URL_DEPLOY_CLIENT);

/**
 * Disconnect to the socket server
 */
export const disconnectSocket = () => {
    socket.disconnect();
}

