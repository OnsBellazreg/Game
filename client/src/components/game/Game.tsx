import React, {useContext, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import { SocketContext } from "../../app/socket";
import { newMessage, resetMessages, setFirstMessage } from "../chat/chatSlice";

import {setSocketConnected, setLoggedIn, setReady, setMyTurn, setOpponentName} from "./gameslice";

export const Game = (props: any) => {

    const dispatch = useAppDispatch();
    const socket = useContext(SocketContext);
    const username = useAppSelector(state => state.game.username);
    const isReady = useAppSelector(state => state.game.ready);

    const getUserName = () => username

    useEffect(() => {
        console.log("inside game");
        socket.on("connect", () => {
            console.log("connected", socket.id)
            dispatch(setSocketConnected(true));
        }).on("disconnected", () => {
            dispatch(setSocketConnected(false));
        }).on("error", (error: any) => {
            console.log(error);
        });

        socket.on("message", (message: any) => {
            console.log("message", message);
            dispatch(setOpponentName(message.user));
        });

        socket.on("onReady", (message: {state: boolean}) => {
            if(message.state === true) {
                dispatch(setReady(true));
            } else {
                dispatch(setReady(false));
            }
        })

        socket.on("activateYourTurn", (message: {state: string, user: string}) => {
            console.log("activateYourTurn", message);
            if(message.user !== socket.id && message.state === "wait"){
                dispatch(setMyTurn(true));
            }else if(message.user === socket.id && message.state === "play") {
                dispatch(setMyTurn(true));
            } else {
                dispatch(setMyTurn(false));
            }
        })

        socket.on("randomNumber", (message: any) => {
            console.log("randomNumber", message);
            if(message.isFirst === true) {
                dispatch(resetMessages([{
                    ...message
                }]));
            } else {
                dispatch(newMessage({
                    ...message
                }));
            }
        })

        socket.on("listTrigger", () => {
            dispatch(setReady(false));
        })
    } , []);

    useEffect(() => {
        dispatch(resetMessages([]));
    } , [isReady]);


    return <div>
        <h1> {props.children} </h1>
    </div>
}