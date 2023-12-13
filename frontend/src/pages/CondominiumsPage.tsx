import {getCondominiumsRequest,deleteCondominiumRequest} from "../api/condominium";
import { Toaster, toast } from 'react-hot-toast';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import React, { useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { Link } from  'react-router-dom';

export interface Condominium {
    id: number
    condominium_name: string
    condominium_location: string
}

    const CondominiumPage =()=>{
    const queryClient = useQueryClient()
    const {data,error} = useQuery({
        queryKey:['condominiums'],
        queryFn: getCondominiumsRequest
    })


const deleteCondominiumMutation = useMutation({
  mutationFn:deleteCondominiumRequest,
  onSuccess: ()=>{
    queryClient.invalidateQueries(["condominiums"]) 
    toast.success("Condominium deleted successfully")
  },
  onError: (error) => {
    console.error(error);
  },
})



if (error instanceof Error) return <>{toast.error(error.message)}</>
return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-4 py-3">Condominium</th>
            <th scope="col" className="px-4 py-3">Location</th>
          </tr>
        </thead>

        <tbody>
          {data?.map((condominium: Condominium) => (
            
            <tr key={condominium.id} className="border-b dark:border-gray-700">
              <td className="px-4 py-3">{condominium.condominium_name}{condominium.id}</td>
              <td className="px-4 py-3">{condominium.condominium_location}</td>
              <td className="px-4 py-3">
                <BsFillTrashFill
                onClick={() => {
                              deleteCondominiumMutation.mutate((condominium.id));
                            }} 
            
                            className="text-red-500 w-6 h-6 cursor-pointer hover:text-white"/>
                            <Link to = {`edit/${condominium.id}/`}>
            <AiFillEdit
            
            className = "text-grey-500 w-6 h-6 cursor-pointer hover:text-black"
            />
         </Link>
                        </td>
                        
            </tr>
          
           
            
          ))}
        
        </tbody>
      </table>
    </div>

  )
}


export default CondominiumPage