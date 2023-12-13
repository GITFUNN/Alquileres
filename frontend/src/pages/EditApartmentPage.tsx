import { Link, useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { Toaster, toast } from 'react-hot-toast';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { editApartmentRequest, getApartmentRequest } from '../api/apartment';



const EditApartment = ()=>{
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [number, setApartmentNumber] = useState("");
    const [rooms_number, setApartmentRooms] = useState(0);
  
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
             Edit Apartment
           </h1>
         <form className="space-y-4 sm:grid sm:col-span-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0" onSubmit={handleSubmit}>
           <div>
           <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
             <input
              value={number}
              onChange={(e) => setApartmentNumber(e.target.value)}
              type="string" name=" number" id=' number' className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 sm:p-2 md:p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:ring-blue-500 transition duration-25 focus:scale-105" placeholder="Unity Number" />
           </div>
    
           <div>
             <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location</label>
             <input
             value={rooms_number}
             onChange={(e) => setApartmentRooms(Number(e.target.value))}
             type="rooms_number" name="rooms_number" id="rooms_number" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg transition duration-50 focus:ring-primary-600 focus:border-primary-600 focus:scale-105 block w-full p-1.5 sm:p-2 md:p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:ring-blue-500" placeholder="Rooms" />
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



export default EditApartment