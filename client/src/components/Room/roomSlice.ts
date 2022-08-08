import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
// import { fetchRoom } from "./roomAPI";
export interface IRoom {
  id:string,
   name:string,
    owner:string,
     type:string
  }
export interface RoomState {
    list: IRoom [];
    selectedRoom: IRoom | null;
}

const initialState: RoomState = {
  list:[],
 selectedRoom: null
};

export const roomSlice = createSlice({
  name: "room",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    selectRoom: (state, action: PayloadAction<IRoom>) => {
        state.selectedRoom = action.payload;
    },
    setRooms: (state, action: PayloadAction<IRoom[]>) => {
        console.log("called")
        state.list = action.payload;
    }
  },

});

export const { selectRoom, setRooms } = roomSlice.actions;

export default roomSlice.reducer;
