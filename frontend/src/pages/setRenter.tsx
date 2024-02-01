import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { setRenter } from '../api/joining';
import { Toaster, toast } from 'react-hot-toast';
import { getApartmentRequest } from '../api/apartment';
import React, { useState} from "react";
import { IdentificationIcon } from '@heroicons/react/24/outline';
import SetRequestState from "./SetRequestState";

interface Props {
    ApId: number;
    UserId: number;
    id: number;
  }
  
  export interface RenterApartment{
    renters:number,
    id:number,
  }
  

  
const SetRenterPage =({ ApId, UserId, id}: Props)=>{
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [renters, setApartmentRenter] = useState<Number>();
    
    

    const editMutationRe = useMutation({
        mutationFn: setRenter,
        onSuccess: () =>{
          queryClient.invalidateQueries({queryKey:['apartments']});
          toast.success("Edit successful")   
          
        },
    
    
        onError: (error) => {
          if (typeof error === 'string') {
            toast.error(error);
          } else {
            toast.error('An error occurred');
            console.log(error);
          }
        },
      });

      const handleAcceptClick = () => {
        setApartmentRenter(UserId)
        editMutationRe.mutate({
            renters:UserId,
            id:ApId
        });
    
      };



return (
  <div className="flex items-center">
  <div className="relative">
      {/* Botón invisible */}
      <input
          type="button"
          className="opacity-0 absolute top-0 left-0 w-full h-full cursor-pointer"
          onClick={handleAcceptClick}
      />
  </div>

  {/* SetRequestState */}
 
</div>

)

}

export default SetRenterPage