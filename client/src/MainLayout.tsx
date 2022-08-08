import React from 'react'
import Header from "../src/components/Header/Header";
import RoomList from "./components/Room/RoomList";
import OptionButtons from "../src/components/OptionButtons";
import Footer from "../src/components/Footer/Footer"
import ChatComponent from "../src/components/chat/ChatComponent";
import Form from './components/Form/Form';
import { useAppSelector } from './app/hooks';
import ResultModals from '../src/components/ResultModals/ResultModals'
function MainLayout() {
  const isReady = useAppSelector(state => state.game.ready);
  const gameOver = useAppSelector(state => state.game.gameOver);
  const myTurn = useAppSelector(state => state.game.myTurn);
  return (
   
    <>
    <Header />
    <div className='flex h-full w-full p-4 md:flex-nowrap'>
    <RoomList />
        <div className='w-full flex flex-col'>
        {isReady && !gameOver.isOver ? <>
           <ChatComponent />
            {/* { myTurn? <OptionButtons />: ""} */}
         </> : ""}
           {gameOver.isOver ? <ResultModals won={gameOver.won} /> : ""}
           {console.log(gameOver.won)}
           <div>
          { isReady && myTurn && !gameOver.isOver ? <OptionButtons />: ""}
          </div>
        </div>
         
        </div>

    </>

  )
}

export default MainLayout