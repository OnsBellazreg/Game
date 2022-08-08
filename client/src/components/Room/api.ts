import {API_ENDPOINT} from "../../../config/config.json";

export const fetchRooms= async() =>{
    const rooms = await fetch(`${API_ENDPOINT}/rooms`);
    return await rooms.json();
}
