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
      const deleteJoiningRequestMutation = useMutation({
        
        mutationFn:deleteJoiningRequest,
        onSuccess: ()=>{
          setRejected(true);
          queryClient.invalidateQueries(["requests"]) 
          toast.success("Request Rejected")
        },
        onError: (error) => {
          console.error(error);
        },
      })
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
<div className ="grid grid-cols-2">
<button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-l-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 col-start-1" onClick={handleAccept}>ACCEPT</button>
<button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-r-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 col-start-2"onClick={() => {
                              deleteJoiningRequestMutation.mutate((id));
                            }}>REJECT</button>
</div>

)

}

export default SetRequestState