import {authApi} from "./useAxios";
import {Apartment} from  '../pages/UnitMgmtPage'
import {TextPrivateNotice,RentReceipts} from '../pages/Noticeprov.tsx'

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



export const createTextPrivNotices = async (message:string,  Apid: number) => {  
    await authApi.post(`/condominiums/create_private_notice/${Apid}/`, {message:message});
   

 };
 

 export const getTextPrivNotices = async(Apid:number) =>{
    try {
       const response = await authApi.get(`/condominiums/get_private_notices/${Apid}/`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching NOTICES');    
    }

}

export const editTextPrivNotices= async(data : TextPrivateNotice) =>{
    const formData = new FormData();
        formData.append('messaje', data.message.toString())
        await authApi.put(`/condominiums/edit_private_notice/${data.id}/`, formData);
    
}

export const deleteTextPrivNotices= async (id: number) => {
    await authApi.delete(`/condominiums/delete_private_notice/${id}/`)
  }


  export const getTextPrivNotice = async(id: number) =>{
    try {
        const response = await authApi.get(`/condominiums/get_private_notice/${id}/`);
         return response.data;
     } catch (error) {
         throw new Error('Error fetching apartment');    
     }
}


export const createRentReceiptRequest = async (number:number,date:string,recident_name:string,net_amount:number,expenses:number,expire_date:string,phone_number:string,total_amount:number ,Apid: number) => {  
    await authApi.post(`/condominiums/create_rent_receipt/${Apid}/`, {number, date, recident_name, net_amount, expenses, expire_date, phone_number, total_amount});
   

 };
 

 export const getRentReceiptsRequest = async(Apid:number) =>{
    try {
       const response = await authApi.get(`/condominiums/get_rent_receipts/${Apid}/`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching Recepts');    
    }

}

export const editRentReceiptRequest= async(data : TextPrivateNotice) =>{
    const formData = new FormData();
        formData.append('messaje', data.message.toString())
        await authApi.put(`/condominiums/edit_private_notice/${data.id}/`, formData);
    
}

export const deleteRentReceiptRequest= async (id: number) => {
    await authApi.delete(`/condominiums/delete_rent_receipt/${id}/`)
  }


  export const getRentReceiptRequest = async(id: number) =>{
    try {
        const response = await authApi.get(`/condominiums/get_rent_receipt/${id}/`);
         return response.data;
     } catch (error) {
         throw new Error('Error fetching apartment');    
     }
}

