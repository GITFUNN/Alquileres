import { getApartmentsRequest, deleteApartmentRequest, createApartmentRequest } from '../api/apartment';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import React, { useState } from "react";
import { toast, Toaster } from 'react-hot-toast';
import { Link, useNavigate} from 'react-router-dom';
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
            throw error; 
          }
        },
        onSuccess: () => {
          toast.success('Joining Request sent successfully');
        },
        onError: () => {
          toast.error('Probably the user does not exist or the Email is invalid');
        },
      });   
      const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setActive(true);
        setRejected(false);
        createJoiningRequests.mutate();
      };
      
      
return (
   
  <div>
  <div className="flex items-center justify-center px-6 py-8 mx-auto">


<div className="w-full md:w-[600px] border border-black rounded-lg">
<div className="">

          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 top-2 left-2 relative hover:bg-gray-100 rounded-lg cursor-pointer hover:stroke-violet-800" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" onClick={() => navigate(-1)}>
        < path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
       
        </div>
 <div className="px-4 py-6 space-y-4 ">
  <div className='flex justify-center pb-2'>

  <div className ='text-center' >
  
  <h1 className='text-lg font-medium'>Apartment Request</h1>
  </div>
  </div>
   <form className="space-y-4 " onSubmit={handleSubmit}>
     <div>
      
       <label htmlFor="name" className="block mb-2 text-sm font-medium text-black">Mail of the User</label>
       <div className='flex items-center'>
       <span className='inline-block align-middle'>
      <svg className='h-4 w-4 fill-none stroke-violet-800' xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
<path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
</svg>

      </span> 
       <input
       value={recipient}
       onChange={(e) => setRecipientId(e.target.value)}
       type="location" name="condominium_location" id="condominium_location" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg transition duration-50 block w-full p-1.5 sm:p-2 md:p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:ring-blue-500" placeholder="Location"/>
       </div>
     </div>
     <div className='flex items-center py-4'>
       <span className='inline-block align-middle'>
      <svg className='h-4 w-4 stroke-transparent fill-transparent' xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
<path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
</svg>

      </span>
     <button type="submit" className="w-full font-medium text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-900 col-start-2 transition duration-25">Send</button>
     </div>
     </form>
      </div>
      </div>
  </div>
  <Toaster />
</div>
   

)
}
export default JoiningRequest