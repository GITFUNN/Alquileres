import {axi} from "./useAxios";
import {authApi} from "./useAxios";

export const registerRequest = async (email: string, password: string, name: string, last_name: string, phone_number: string) =>{
 await axi.post("/users/register/", {email, password, name, last_name, phone_number});
}

export const loginRequest = async (email: string, password: string) =>{
   const response = await axi.post("/users/login/", {email, password});
   return response;
}
  

export const getUser = async (email: string)=>{
   try {
      const response = await authApi.get(`/users/get/${email}/`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener el ID del usuario:', error);
      throw error;
    }
}


export const getUserAuthenticated = async ()=>{
  const response = await authApi.get('users/get_auth_user/')
  return response.data;
}


export const getSenderEmail = async(id:number)=>{
   try {
       const response = await authApi.get(`/users/get_sender/${id}/`);
       return response.data;
     } catch (error) {
       console.error('Error al obtener el nombre del condominio:', error);
       throw error;
     }     
} 