import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import roomReducer from '../components/Room/roomSlice';
import gameReducer from '../components/game/gameslice';
import chatReducer from "../components/chat/chatSlice";

export const store = configureStore({
  reducer: {
    room: roomReducer,
    game: gameReducer,
    chat: chatReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
