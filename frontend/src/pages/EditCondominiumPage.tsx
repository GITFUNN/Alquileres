import { Link, useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { Toaster, toast } from 'react-hot-toast';
import { editCondominiumRequest,getCondominiumRequest } from '../api/condominium';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';

const EditCondominiumPage = ()=>{
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [condominium_name, setCondominiumName] = useState<string>("");
    const [condominium_location, setCondominiumLocation] = useState<string>("");
  
    const { id } = useParams();
    let condId:number;
    if (id !== undefined){
      condId = Number(id);
    } 

    const { data } = useQuery({
      queryKey:['condominiums', id],
      queryFn:()=> getCondominiumRequest(condId)
  
});

useEffect(()=>{
  if (data){
    setCondominiumName(data.condominium_name);
    setCondominiumLocation(data.condominium_location)

  }

},[data]);

const editMutation = useMutation({

    mutationFn: editCondominiumRequest,
    onSuccess: () =>{
      queryClient.invalidateQueries({queryKey:['condondominiums']});
      toast.success("Edit successful")   
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
    editMutation.mutate({
      id: condId,
      condominium_name:condominium_name,
      condominium_location:condominium_location
    });

  };
  


  return (


    <div>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
     
     <Link to="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white md:top-5 md:left-8 md:absolute">
     <span className = "text-gray-50 text-2xl font-jost">RentFlow</span>

     </Link>
     <div className="w-full md:w-[900px] bg-slate-50 rounded-lg border-gray-300">
       <div className="px-4 py-6 space-y-4">
       <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
             Edit Condominium
           </h1>
         <form className="space-y-4 sm:grid sm:col-span-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0" onSubmit={handleSubmit}>
           <div>
           <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
             <input
              value={condominium_name}
              onChange={(e) => setCondominiumName(e.target.value)}
             type="name" name="condominium_name" id='condominium_name' className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 sm:p-2 md:p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:ring-blue-500 transition duration-25 focus:scale-105" placeholder="Name of the Condominium"/>
           </div>
    
           <div>
             <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location</label>
             <input
             value={condominium_location}
             onChange={(e) => setCondominiumLocation(e.target.value)}
             type="location" name="condominium_location" id="condominium_location" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg transition duration-50 focus:ring-primary-600 focus:border-primary-600 focus:scale-105 block w-full p-1.5 sm:p-2 md:p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:ring-blue-500" placeholder="Location"/>
           </div>
           <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 col-start-2">Accept</button>
           </form>
            </div>
            </div>
        </div>
        <Toaster />
    </div>


  );
}

export default EditCondominiumPage