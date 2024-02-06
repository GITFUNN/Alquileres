import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { setRequestState, deleteJoiningRequest } from '../api/joining';
import { Toaster, toast } from 'react-hot-toast';
import React, { useState} from "react";
import { setRenter } from '../api/joining';
interface Props {
  ApId: number;
  UserId: number;
  id: number;
}
export interface State {
    active: boolean;
    rejected: boolean;
    id:number;
}
export interface RenterApartment{
  renters:number,
  id:number,
}


const SetRequestState =({ ApId, UserId, id }: Props)=>{
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [active,setActive] = useState(true);
    const [rejected, setRejected] = useState(false);
    const [renters, setApartmentRenter] = useState<Number>();
    

    const editMutation = useMutation({
        mutationFn: setRequestState,
        onSuccess:() =>{
          queryClient.invalidateQueries({queryKey:['requests']});  
          
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
      const deleteJoiningRequestMutation = useMutation({
        
        mutationFn:deleteJoiningRequest,
        onSuccess: ()=>{
          setRejected(true);
          queryClient.invalidateQueries(["requests"]) 
          toast.success("Done!");
        },
        onError: (error) => {
          console.error(error);
        },
      })
      const editMutationRe = useMutation({
        mutationFn: setRenter,
        onSuccess: () =>{
          queryClient.invalidateQueries({queryKey:['apartments']});   
          
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
      
      const handleAccept = async() => {
      
        setActive(false);
        
        try{
        await editMutation.mutate({
           active:false,
           rejected:false,
           id:id,
        });
        setApartmentRenter(UserId)
        await editMutationRe.mutate({
          renters:UserId,
          id:ApId
      });
    } catch (error){
      console.error(error);
    }
      };
      
      
      

return (
<div className="grid grid-cols-2 gap-4">
  <button
    type="submit"
    className="w-11/12 text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center place-self-end mb-4 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 "
    onClick={() => {
      handleAccept();
      deleteJoiningRequestMutation.mutate(id); // Llama a la función de mutación para eliminar
    }}
  > 
    ACCEPT
  </button>

  <button
    type="submit"
    className="w-11/12 text-black border border-black bg-white hover:bg-black hover:text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-4 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 "
    onClick={() => {
      deleteJoiningRequestMutation.mutate(id); // Llama directamente a la función de mutación para eliminar
    }}
  >
    DELETE
  </button>
</div>

)

}

export default SetRequestState