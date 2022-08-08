import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface GameState {
    socketConnected: boolean;
    loggedIn: boolean;
    username: string;
    ready: boolean;
    myTurn: boolean;
    opponentName: string;
    gameOver: {
        won: boolean;
        isOver: boolean;
    }
}

const initialState: GameState = {
    socketConnected: false,
    loggedIn: false,
    ready: false,
    username: "",
    opponentName: "CPU",
    myTurn: false,
    gameOver: {
        won: false,
        isOver: false
    }
};

export const gameSlice = createSlice({
  name: "room",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setSocketConnected: (state, action: PayloadAction<boolean>) => {
        state.socketConnected = action.payload;
    },
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
        state.loggedIn = action.payload;
    },
    setUserName: (state, action: PayloadAction<string>) => {
        state.username = action.payload;
    },
    setReady: (state, action: PayloadAction<boolean>) => {
        state.ready = action.payload;
    },
    setMyTurn: (state, action: PayloadAction<boolean>) => {
        state.myTurn = action.payload;
    },
    setGameOver: (state, action: PayloadAction<{won: boolean, isOver: boolean}>) => {
        state.gameOver = action.payload;
    },
    setOpponentName: (state, action: PayloadAction<string>) => {
        if(action.payload !== state.username) {
            state.opponentName = action.payload;
        }
    } ,
    newGame: (state) => {
        state.ready = false;
        state.myTurn = false;
        state.opponentName = "CPU";
        state.gameOver = {
            won: false,
            isOver: false
        }
    }  
  },
});

export const { setSocketConnected, setLoggedIn, setUserName, setReady, setMyTurn, setGameOver, newGame, setOpponentName} = gameSlice.actions;

export default gameSlice.reducer;
