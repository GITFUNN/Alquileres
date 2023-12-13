import {axi} from "./useAxios";

export const registerRequest = async (email: string, password: string, name: string, last_name: string, phone_number: string) =>{
 await axi.post("/users/register/", {email, password, name, last_name, phone_number});
}

export const loginRequest = async (email: string, password: string) =>{
   const response = await axi.post("/users/login/", {email, password});
   return response;
}
  

    
