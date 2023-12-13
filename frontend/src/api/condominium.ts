import {authApi} from "./useAxios";
import { Condominium } from '../pages/CondominiumsPage'

export const createCondominiumRequest = async(condominium_name:string, condominium_location:string) =>{
    await authApi.post('/condominiums/post/', {condominium_name, condominium_location});

    console.log("Solicitud de creación de condominios completada");
}

export const deleteCondominiumRequest= async (id: number) => {
    await authApi.delete(`/condominiums/delete/${id}/`)
  }

export const getCondominiumsRequest = async() =>{
    try {
       const response = await authApi.get('/condominiums/');
        return response.data;
    } catch (error) {
        throw new Error('Error fetching condominiums');    
    }

}
export const getCondominiumRequest = async(id:number) =>{
    try {
       const response = await authApi.get(`/condominiums/get/${id}/`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching condominiums');    
    }

}

export const editCondominiumRequest = async(data : Condominium) =>{
    const formData = new FormData();
        formData.append('condominium_name', data.condominium_name);
        formData.append('condominium_location', data.condominium_location);
        await authApi.put(`/condominiums/edit/${data.id}/`, formData);
    
}
