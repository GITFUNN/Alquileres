import { Link, useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { Toaster, toast } from 'react-hot-toast';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { editApartmentRequest, getApartmentRequest } from '../api/apartment';


const EditApartment = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [number, setApartmentNumber] = useState("");
    const [rooms_number, setApartmentRooms] = useState(0);
    const [renters, setApartmentRenter] = useState(0);

    const { id, sId } = useParams();
    let ApId:number;
    if (id!== undefined && sId!== undefined){
      ApId = Number(sId);
    } 

    const { data } = useQuery({
      queryKey:['apartments',id],
      queryFn:()=> getApartmentRequest(ApId)
  
});

useEffect(()=>{
  if (data){
    setApartmentNumber(data.number);
    setApartmentRooms(data.rooms_number);
    setApartmentRenter(0);

  }

},[data]);

const goBack = () => {
    navigate(-1);
};

const editMutation = useMutation({
    mutationFn: editApartmentRequest,
    onSuccess: () =>{
      queryClient.invalidateQueries({queryKey:['apartments']});
      toast.success("Edit successful")   
      goBack();
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
        rooms_number:rooms_number,
        number:number,
        id: ApId,
        renters:renters,
    });

  };
  console.log("Data received:", data);
  return (

    <div className ="z-50">
          

          <div className="flex items-center justify-center px-6 py-8 mx-auto">
     
     
     <div className="w-full sm:w-[600px] border border-black rounded-lg">
     <div className="">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 top-2 left-2 relative hover:bg-gray-100 rounded-lg cursor-pointer hover:stroke-violet-800" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" onClick={() => navigate(-1)}>
        < path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
        </div>
       <div className="px-4 py-6 space-y-4 ">
        <div className='flex justify-center pb-2'>

        <div className ='text-center' >
        
        <h1 className='text-lg font-medium'>Edit Apartment</h1>
        </div>
        </div>
         <form className="space-y-4 " onSubmit={handleSubmit}>
           <div>
           <label htmlFor="email" className="block mb-2 text-sm font-medium text-black">Number</label>
           <div className='flex items-center'>
             <span className='inline-block align-middle'>
            <svg className='h-4 w-4 fill-none stroke-violet-800' xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
</svg>

            </span> 
             <input
              value={number}
              onChange={(e) => setApartmentNumber(e.target.value)}
             type="text" name="number" id='number' className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg   block w-full p-1.5 sm:p-2 md:p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:ring-blue-500 transition duration-25" placeholder="Name of the Condominium"/>
             </div>
           </div>
           <div>
            
             <label htmlFor="name" className="block mb-2 text-sm font-medium text-black">Rooms</label>
             <div className='flex items-center'>
             <span className='inline-block align-middle'>
            <svg className='h-4 w-4 fill-none stroke-violet-800' xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
</svg>

            </span> 
             <input
             value={rooms_number}
             onChange={(e) => setApartmentRooms(e.target.value)}
             type="number" name="rooms_number" id="rooms_number" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg transition duration-50 block w-full p-1.5 sm:p-2 md:p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:ring-blue-500 appearance-none" placeholder="Location"/>
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



export default EditApartment