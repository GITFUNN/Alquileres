import { getApartmentsRequest, deleteApartmentRequest, createApartmentRequest } from '../api/apartment';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import React, { useState } from "react";
import { toast, Toaster } from 'react-hot-toast';
import { Link, useNavigate, useParams  } from 'react-router-dom';
import { createJoiningRequest } from '../api/joining';
import { getUser } from '../api/user';



interface Props {
    ApId: number
  };
    export interface joiningRequest {
        id: number;
        recipient_id: string;
        active: boolean;
        rejected: boolean;
    }
   
const JoiningRequest =({ ApId }: Props )=>{
      const navigate = useNavigate();
      const queryClient = useQueryClient();
      const [recipient, setRecipientId] = useState("");
      const [active, setActive] = useState(true);
      const [rejected, setRejected] = useState(false);

      const createJoiningRequests = useMutation({
        mutationFn: async () => {
          try {
            const user = await getUser(recipient);
            return createJoiningRequest(user.id, active, rejected, ApId);
          } catch (error) {
            throw error; // Puedes manejar el error según tus necesidades
          }
        },
        onSuccess: () => {
          toast.success('Joining Request sent successfully');
        },
        onError: () => {
          toast.error('Probably the user does not exist');
        },
      });   
      const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setActive(true);
        setRejected(false);
        createJoiningRequests.mutate();
      };
      
return (
   
    <>
     <form className="space-y-4 sm:grid sm:col-span-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0" onSubmit={handleSubmit}>
           <div>
           <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
             <input
              value={recipient}
              onChange={(e) => setRecipientId((e.target.value))}
             type="text" name="recipient" id='recipient' className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 sm:p-2 md:p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:ring-blue-500 transition duration-25 focus:scale-105" placeholder="Name of the User"/>
           </div>           
           <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 col-start-2">Send</button>
           </form>
            
    </>
   

)
}
export default JoiningRequest