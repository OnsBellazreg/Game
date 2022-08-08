import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
// import { fetchRoom } from "./roomAPI";

export interface ChatState {
    messages: {[key: string]: any}[]
    firstMessage: string
}

const initialState: ChatState = {
    messages: [],
    firstMessage: "",
};

export const chatSlice = createSlice({
  name: "room",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    newMessage: (state, action: PayloadAction<{[key: string]: any}>) => {
        state.messages.push(action.payload)
    },
    resetMessages: (state, action: PayloadAction<{[key: string]: any}[]>) => {
        state.messages = action.payload
    },
    setFirstMessage: (state, action: PayloadAction<string>) => {
        state.firstMessage = action.payload
    }
  },
});

export const { newMessage, resetMessages, setFirstMessage} = chatSlice.actions;

export default chatSlice.reducer;
