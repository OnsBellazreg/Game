import React, { useContext, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { SocketContext } from '../../app/socket';
import { validateName } from '../../utils'
import { setLoggedIn, setUserName } from '../game/gameslice';

export default function Form() {

    const socketConnected = useAppSelector(state => state.game.socketConnected);
    const socket = useContext(SocketContext);
    const username = useAppSelector(state => state.game.username);

    const dispatch = useAppDispatch()
    const [name, setName] = useState('')
    const [nameError, setNameError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const error = 'The name is required'

    const validateForm=() =>{
        setNameError(validateName(name) ? "" : error)
        return (
            validateName(name)
        )
    }

    const sendForm = () => {
      dispatch(setUserName(name))
      if(socketConnected) {
          setTimeout(() => socket.emit("login", {
              username: name
          }), 100)

          socket.once("message", (message: any) => {
            if("user" in message && message.user === name) {
                dispatch(setLoggedIn(true));
            }
          });
      }

    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
        if(validateForm()){
            setIsSubmitting(true)
            sendForm()
            setIsSubmitting(false)
        }
    }

  return (
    <section className="h-full gradient-form bg-gray-200 md:h-screen">
  <div className="container py-12 px-6 h-full">
    <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
      <div className="xl:w-10/12">
        <div className="block bg-white shadow-lg rounded-lg">
          <div className="lg:flex lg:flex-wrap g-0">
            <div className="lg:w-6/12 px-4 md:px-0">
              <div className="md:p-12 md:mx-6">
                <div className="text-center">
                  <img
                    className="mx-auto w-48"
                    src="/src/assets/logo.svg"
                    alt="logo"
                  />
                  <h4 className="text-xl font-semibold mt-1 mb-12 pb-1">Game of three</h4>
                </div>
                <form onSubmit={handleSubmit}>
                  <p className="mb-4">Please enter your name</p>
                  <div className="mb-4">
                    <input
                      type="text"
                      className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      id="name"
                      placeholder="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onBlur={(e) =>
                        setNameError(validateName(e.target.value) ? "" : error)
                      }
                    />
                  </div>
                  <div className="text-center pt-1 mb-12 pb-1">
                    <button
                      className="inline-block disabled:bg-gray-100 px-6 py-2.5 font-medium text-xs leading-tight uppercase rounded shadow-md bg-[#FF8000] hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3 "
                      type="submit"
                      data-mdb-ripple="true"
                      data-mdb-ripple-color="light"
                      //onClick={handleSubmit}
                      disabled= {name == ""}
                    >
                      Join
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div
              className="lg:w-6/12 flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none"
              style=
               {{ "background": "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)"}}
              
            >
              <div className="text-white px-4 py-6 md:p-12 md:mx-6">
                <h4 className="text-xl font-semibold mb-6">How to play</h4>
                <p className="text-sm">
                When a player starts, they incept a random (whole) number and send it to the second player as an approach of starting the game. The receiving player can then choose between adding one of "-1,0,1" in order to get to a number that is divisible by 3. The resulting whole number is then sent back to the original sender.​The same rules are applied until one player reaches the number 1 
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  )
}
