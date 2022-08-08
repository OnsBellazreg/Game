import * as React from 'react';
import Divider from '@mui/material/Divider';
import { setRooms, IRoom, selectRoom } from './roomSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useContext, useEffect } from 'react';
import { fetchRooms } from './api';
import { SocketContext } from '../../app/socket';
import { setReady } from '../game/gameslice';

type ItemProps = {
  room: IRoom
  onClick: (room: IRoom) => void
  isSelected: boolean
}
const Item = ({ room, onClick, isSelected }: ItemProps) => {
  let classes = "flex items-center text-lg py-4 pl-8 h-20 overflow-hidden text-[#205A6D] text-ellipsis whitespace-nowrap hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out cursor-pointer";

  if (isSelected) {
    classes += " bg-gray-100";
  }
  return (
    <li >
      <a className={classes} onClick={() => onClick(room)}>
        <span>{room.name}</span>
        <img src="/src/assets/forwardArrow.svg" alt="arrow" className="ml-auto pr-8" />
      </a>

    </li>
  )
}

export default function RoomList() {
  const dispatch = useAppDispatch();
  const rooms = useAppSelector(state => state.room.list);
  const socket = useContext(SocketContext);
  const selectedRoom = useAppSelector(state => state.room.selectedRoom);
  const username = useAppSelector(state => state.game.username);

  const joinRoom = (room: IRoom) => {
    dispatch(selectRoom(room));
    dispatch(setReady(false));

    socket.emit("joinRoom", {
      username,
      room: room.id,
      roomName: room.name,
      roomType: room.type
    });
  }
  const changeRoom = (room: IRoom) => {
    console.log("changeRoom", room);
    if (selectedRoom) {
      socket.emit("leaveRoom");
      socket.once("onReady", () => {
        joinRoom(room);
      })
    } else {
      joinRoom(room);
    }
  }

  useEffect(() => {
    fetchRooms().then(rooms => dispatch(setRooms(rooms)));
  }, []);

  return (
    <div className='flex flex-col items-center'>
      <div className='my-8 text-gray-600 text-xl'>Choose a game room</div>
       <div className="list-none w-80 shadow-md bg-white h-60">
      {rooms.map((room, index) =>
        <Item room={room} key={index} isSelected={room.id === selectedRoom?.id} onClick={changeRoom} />
      )}
    </div>
    </div>
   
  );
}
