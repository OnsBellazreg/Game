import React, {useContext, useEffect} from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { SocketContext } from '../../app/socket';
import { newGame } from '../game/gameslice';

type ResultProps = {
    won: boolean
}

export default function ResultModals({won}: ResultProps) {
  const socket = useContext(SocketContext);
  const selectedRoom = useAppSelector(state => state.room.selectedRoom);
  const username = useAppSelector(state => state.game.username);

  const dispatch = useAppDispatch();

  useEffect(() => {
    socket.emit('leaveRoom');
  }, []);
  
  const rejoin = () => {
    dispatch(newGame());
    socket.emit("joinRoom", {
      username,
      room: selectedRoom?.id,
      roomName: selectedRoom?.name,
      roomType: selectedRoom?.type
    });
  }
  return (
    <div className='flex flex-col items-center'>
        {
           won ? 
            <div>
                    <img src='/src/assets/trophy.svg' alt='Trophy'/>
                    <div className='m-8'>
                    <h3 className="font-medium leading-tight text-3xl">You won!</h3>
                    </div>
                   
            </div>
            :
            <div>
                <img src='/src/assets/baloons.svg' alt='Baloons'/>
                <div className='m-8'>
                <h3 className="font-mediu leading-tight text-3xl">You have lost</h3>
                </div>
            
            </div>
        }


        <button onClick={rejoin} type="button" className="inline-block px-6 py-2.5 bg-white text-blue-600 font-medium text-xs leading-tight uppercase rounded-full w-32 shadow-md hover:bg-blue-600 hover:shadow-lg hover:text-white focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Play</button>
</div>
  )
}
