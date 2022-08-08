import {io, Socket} from "socket.io-client";
import {createContext} from "react";

import {wss} from "../../config/config.json";

export const socket = io(wss, {forceNew: true, path: "/", transports: ['websocket']});
export const SocketContext = createContext<Socket>(socket);