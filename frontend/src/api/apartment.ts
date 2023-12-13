import {authApi} from "./useAxios";
import {Apartment} from  '../pages/UnitMgmtPage'


export const deleteApartmentRequest= async (id: number) => {
    await authApi.delete(`/condominiums/delete_apartment/${id}/`)
  }

export const getApartmentsRequest = async(condId: number) =>{
    try {
       const response = await authApi.get(`/condominiums/get_apartments/${condId}/`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching Apartments');    
    }

}

export const getApartmentRequest = async(id: number) =>{
    try {
        const response = await authApi.get(`/condominiums/get_solo_apartment/${id}/`);
         return response.data;
     } catch (error) {
         throw new Error('Error fetching apartment');    
     }
}

export const createApartmentRequest = async ( rooms_number: number, number: string,  condId: number) => {
    await authApi.post(`/condominiums/apartments/${condId}/`, {rooms_number, number});
 };
 



export const editApartmentRequest = async(data : Apartment) =>{
    const formData = new FormData();
        formData.append('rooms_number', data.rooms_number.toString())
        formData.append('number', data.number);
        await authApi.put(`/condominiums/edit_apartment/${data.id}/`, formData);
    
}