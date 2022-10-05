import { createContext } from 'react';


export const socket = new WebSocket('ws://127.0.0.1:6990');
socket.binaryType = 'arraybuffer';

export const WebsocketContext = createContext(socket);
export const WebsocketProvider = WebsocketContext.Provider;