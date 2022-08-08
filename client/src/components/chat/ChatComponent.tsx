import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../../app/socket';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {setGameOver} from "../game/gameslice"

export default function ChatComponent() {
  const socket = useContext(SocketContext);
  const messages = useAppSelector(state => state.chat.messages);
  const myTurn = useAppSelector(state => state.game.myTurn);
  const username = useAppSelector(state => state.game.username);

  const LeftClass = "flex content-center items-center justify-center rounded-full w-12 h-12 shadow-xl text-center bg-[#FF8000] text-white text-xl -ml-4"
  const rightClass = "flex content-center items-center justify-center rounded-full w-12 h-12 shadow-xl text-center bg-white text-[#FF8000] text-xl -mr-4 z-10"

  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => socket.emit("letsPlay"), 1000);
  }, []);

  useEffect(() => {
    socket.once("gameOver", (message: {user: string, isOver: boolean}) => {
      dispatch(setGameOver({
          isOver: message.isOver,
          won: message.user === username ? true : false
      }));
  })
}, []);

  const calculationResult = (message: any, index: number): string => {
    let number = message.number;
    let resN = message.number;

    if(message.isCorrectResult) {
      number = messages[index - 1].number;
    }

    const sum = Number(number) + Number(message.selectedNumber);

    if (sum % 3 == 0) {
      resN = sum/3;
    }

    return `[(${message.selectedNumber} + ${number})/3]=${resN}]`;
  };

  return (


    <div className='mx-4 p-6 my-6'>
      
        <div className='flex flex-col w-full overflow-y-auto'>
         {messages.map((message: any, index: number) => {
          return (
            <div key={index} style={{direction: message.user == username ? "ltr" : "rtl"}} >

              {message.isFirst && messages.filter(m => !m.isFirst).length === 0 && myTurn ?  <div className='w-80 h-16 bg-background m-2 p-4'> {message.number} </div> : ""}
              {!message.isFirst ? (
              
                  <div className='mr-8 flex flex-row'>
                    {message.user == username ? 
                    <img  src= "/src/assets/opponent.svg"
                      className="rounded-full w-12"
                      alt="UserAvatar"/> 
                    :  
                    <img
                      src= "/src/assets/logo.svg"
                      className="rounded-full w-12"
                      alt="Avatar"
                    />}
                   
                     <div className='w-80 h-16 bg-background m-2 p-4' style={{direction:"ltr"}}> {calculationResult(message, index)}</div>
                     <div className= {message.user == username ? LeftClass : rightClass} > {message.selectedNumber} </div>
                  </div>
                 
                 
                ) : ""}
            </div>
          )
        }
        )}

      </div>

    </div>

  )
}
