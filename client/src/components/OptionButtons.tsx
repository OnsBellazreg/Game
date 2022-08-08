import React, { useContext } from 'react';
import { useAppSelector } from '../app/hooks';
import { SocketContext } from '../app/socket';

type OptionButtonProps = {
    value: string
    onClick: () => void
}

const OptionButton= ({value, onClick }:OptionButtonProps) =>{
    return(
        <div className="flex space-x-2 justify-center">
        <div>
          <button onClick={onClick} type="button" className="inline-block rounded-full bg-white text-[#1574F5] leading-normal uppercase shadow-lg hover:bg-gray-100 hover:shadow-xl focus:bg-gray-100 focus:shadow-xl focus:outline-none focus:ring-0 active:shadow-xl transition duration-150 ease-in-out w-16 h-16 mx-4 text-lg">
            {value}
          </button>
        </div>
      </div>
    )
   
}

export default function OptionButtons() {
  const socket = useContext(SocketContext);
  const lastMessage = useAppSelector(state => state.chat.messages[state.chat.messages.length - 1])
  
  const sendNumber = (value: number) => {
    socket.emit("sendNumber", {
      selectedNumber: value,
      number: lastMessage.number
    });
  }
  return (
    <div className="flex spac-x-2 justify-center">
        <OptionButton value='-1' onClick={() => sendNumber(-1)} />
        <OptionButton value='0' onClick={() => sendNumber(0)} />
        <OptionButton value='+1'onClick={() => sendNumber(1)} />
    </div>
    
  )
}
