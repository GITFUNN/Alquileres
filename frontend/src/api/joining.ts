import {authApi} from "./useAxios";
import {RenterApartment} from "../pages/SetRequestState";
import {State} from "../pages/SetRequestState";
export const createJoiningRequest = async(recipient:number, active:boolean, rejected:boolean, ApId:number) =>{
    await authApi.post(`/condominiums/joining_request/${ApId}/`, {recipient, active, rejected, ApId});
}

export const getJoiningRequests= async() =>{

    const response = await authApi.get('/condominiums/get_requests/');
    return response.data;
}

export const getApartmentNumber = async(id:number)=>{
    try {
        const response = await authApi.get(`/condominiums/get_apartment_number/${id}/`);
        return response.data;
      } catch (error) {
        console.error('Error al obtener el numero de apartamento:', error);
        throw error;
      }    

}

export const getCondominiumName = async(id:number)=>{
    try {
        const response = await authApi.get(`/condominiums/get_condominium_name/${id}/`);
        return response.data;
      } catch (error) {
        console.error('Error al obtener el nombre del condominio:', error);
        throw error;
      }         
}

export const setRenter = async( data: RenterApartment)=>{
  try {
    const formData = new FormData();
        formData.append('renters', data.renters.toString())
    await authApi.put(`/condominiums/set_renter/${data.id}/${data.renters}`);
    console.log(data.renters);
  } catch (error) {
    console.error('Error al editar apartamento:', error);
    throw error;
  }      
}
export const setRequestState = async(data: State)=>{

  try {
    const formData = new FormData();
        formData.append('active', data.active.toString())
        formData.append('rejected', data.active.toString())
        await authApi.put(`/condominiums/set_request_state/${data.id}/`, formData);
  } catch (error) {
    console.error('Error al editar apartamento:', error);
    throw error;
  }      
}

export const deleteJoiningRequest = async(id:number) =>{
  await authApi.delete(`/condominiums/delete_request/${id}/`)
}


