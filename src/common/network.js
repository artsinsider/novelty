import axios from "axios";

const token = localStorage.getItem("jwt_backend_api_key") || "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJhZG1pbi50ZXJtaW5hbCIsImF1ZCI6ImFkbWluLnRlcm1pbmFsIiwiaWF0IjoxNTcyNjAwMTMyLCJleHAiOjE1NzI2ODY1MzIsInVzZXIiOnsiaWQiOjQ0LCJtb2RlbCI6ImNvbW1vblxcbW9kZWxzXFxNYW5hZ2VySWRlbnRpdHkifX0.47tpFv_QtIXi7jarXTHbSZpjTn4CkYuASOTE2KvHUEr9Z7PvgmtEdnkb8pT3Z4iQDRP0Q4Q6yK77b_iWwWk-_Q";

axios.defaults.baseURL =  `${window.location.origin}/api`; //"https://admin.dev.terminal.tass.ru/api";//'https://api.example.com';
axios.defaults.headers.common['Authorization'] =  token;
axios.defaults.headers.post['Content-Type'] = 'application/json';

let bodyData = {
    "method": "Announce.get",
    "jsonrpc": "2.0",
    "params": {},
    "id": Math.floor(Math.random() * 100) + 1
};

export async function  whoAmi (){
    try{
       const response =  await axios.post('', bodyData);
       return await response;
    } catch(error) {
        throw new Error('Не получилось получить данные пользователя');
        return error
    }
}