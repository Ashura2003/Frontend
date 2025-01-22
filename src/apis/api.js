import axios from "axios";

const Api = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
    headers:{
        "Content-Type": "application/json"
    }
});


export const registerApi = (data) => Api.post("api/user/register", data);

export const loginApi = (data) => Api.post("api/user/login", data); 