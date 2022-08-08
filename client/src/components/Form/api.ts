import {API_ENDPOINT} from "../../../config/config.json";

export const addUser= async() =>{
 fetch(`${API_ENDPOINT}/users`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        name,
    })

})
}