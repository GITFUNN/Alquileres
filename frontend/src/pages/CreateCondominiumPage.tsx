import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from "react";
import { Toaster, toast } from 'react-hot-toast';
import { createCondominiumRequest } from '../api/condominium';
import { useMutation } from '@tanstack/react-query';


const CreateCondominiumPage = ()=>{

    const navigate = useNavigate();

    const [condominium_name, setCondominiumName] = useState("");
    const [condominium_location, setCondominiumLocation] = useState("");


const createMutation = useMutation({

    mutationFn: () => createCondominiumRequest(condominium_name, condominium_location),
    onSuccess: () =>{
      navigate("/condominiums")
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
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createMutation.mutate();
    
  };
  


  return (


    <div>
        <div className="flex items-center justify-center px-6 py-8 mx-auto">
     
     
     <div className="w-full md:w-[600px] border border-black rounded-lg">
       <div className="px-4 py-6 space-y-4 ">
        <div className='flex justify-center pb-2'>

        <div className ='text-center' >
        
        <h1 className='text-lg font-medium'>Create a new Condominium</h1>
        </div>
        </div>
         <form className="space-y-4 " onSubmit={handleSubmit}>
           <div>
           <label htmlFor="email" className="block mb-2 text-sm font-medium text-black">Name</label>
           <div className='flex items-center'>
             <span className='inline-block align-middle'>
            <svg className='h-4 w-4 fill-none stroke-violet-800' xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
</svg>

            </span> 
             <input
              value={condominium_name}
              onChange={(e) => setCondominiumName(e.target.value)}
             type="name" name="condominium_name" id='condominium_name' className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg   block w-full p-1.5 sm:p-2 md:p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:ring-blue-500 transition duration-25" placeholder="Name of the Condominium"/>
             </div>
           </div>
           <div>
            
             <label htmlFor="name" className="block mb-2 text-sm font-medium text-black">Location</label>
             <div className='flex items-center'>
             <span className='inline-block align-middle'>
            <svg className='h-4 w-4 fill-none stroke-violet-800' xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
</svg>

            </span> 
             <input
             value={condominium_location}
             onChange={(e) => setCondominiumLocation(e.target.value)}
             type="location" name="condominium_location" id="condominium_location" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg transition duration-50 block w-full p-1.5 sm:p-2 md:p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:ring-blue-500" placeholder="Location"/>
             </div>
           </div>
           <div className='flex items-center py-4'>
             <span className='inline-block align-middle'>
            <svg className='h-4 w-4 stroke-transparent fill-transparent' xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
</svg>

            </span>
           <button type="submit" className="w-full font-medium text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-900 col-start-2 transition duration-25">Create</button>
           </div>
           </form>
            </div>
            </div>
        </div>
        <Toaster />
    </div>


  );
}

export default CreateCondominiumPage