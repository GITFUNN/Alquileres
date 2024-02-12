import {getTextPrivNotices,createTextPrivNotices,editTextPrivNotices,deleteTextPrivNotices,getTextPrivNotice } from "../api/apartment";
import { Toaster, toast } from 'react-hot-toast';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import React, { useState, Fragment, useEffect } from "react";
import { Link,useParams } from  'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import options from '../assets/options.svg';
import EditPrivNoticesPage from "./EditPrivNoticeText";



export interface TextPrivateNotice {
    id: number;
    message: string;
}

    const PrivNoticesPage =()=>{
      const [message, setMessage] = useState("");
      const [show, setShow] = useState(false);
      const { id, sId } = useParams();
      let ApId:number;
      if (id!== undefined && sId!== undefined){
        ApId = Number(sId);
        
      } 
    const queryClient = useQueryClient()
    
    const {data,error} = useQuery({
        queryKey:['TextPrivateNotices'],
        queryFn:()=> getTextPrivNotices(ApId) 
    })

    const createTextPrivNotice = useMutation({
        mutationFn: () => createTextPrivNotices(message, ApId),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['TextPrivateNotices'] })
          toast.success('Success')
          

        },
        onError: () => {
          toast.error("error")
        },
      });
      
      const handleTextSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        createTextPrivNotice.mutate();
        
      };
      


const deleteTextPrivNotice = useMutation({
  mutationFn:deleteTextPrivNotices,
  onSuccess: ()=>{
    queryClient.invalidateQueries(["TextPrivateNotices"]) 
    toast.success("Text deleted successfully")
  },
  onError: (error) => {
    console.error(error);
  },
})
function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}


if (error instanceof Error) return <> {toast.error(error.message)}</>
return (
  <div>
 
    <div className="flex justify-center">
      
      <div className = 'mx-auto my-auto w-11/12'>
      
      <div className ='text-center' >
        
      <fieldset className="border-t border-black pb-4">
        <legend className="mx-auto px-4 text-xl">Private Notices</legend>
    </fieldset>
      </div>
    
          {data?.map((TextPrivateNotice:TextPrivateNotice) => (
         
            <div key={TextPrivateNotice.id} className="sm:py-1 sm:w-[600px] bg-white text-black my-6 sm:my-2 mx-auto border grid grid-cols-2 rounded-lg border-slate-100 font-sans">
                 {show &&
        
        <EditPrivNoticesPage id ={TextPrivateNotice.id} Apid={ApId} setShow={setShow}/>  
      }
  
              <div className='flex items-center'>
             <span className='inline-block align-middle ml-2'> 
            <svg className='h-4 w-4 fill-none stroke-2 stroke-violet-800' xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
</svg>

            </span> 
              <p className="px-4 py-3">TEXT{TextPrivateNotice.message}</p>
            </div>

              <div className="z-50">
                  { (
                    <Menu as="div" className="relative ml-2">
                      <div>
                        <Menu.Button className="absolute text-sm right-0 top-0 ">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={options}
                            alt="options"
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right bg-white dark:bg-slate-950 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>

                              {({ active }) => (
                              <span
                              onClick={() => {
                                setShow(true);
                              }} 
                                className={classNames(active ? 'bg-red-500 text-white dark:bg-slate-700 ' : '', 'block px-4 py-2 text-sm text-gray-700 cursor-pointer dark:text-slate-200')}
                              >
                                  Edit
                              </span>
                         
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <span
                              onClick={() => {
                                deleteTextPrivNotice.mutate((TextPrivateNotice.id));
                              }} 
                                className={classNames(active ? 'bg-red-500 text-white dark:bg-slate-700 ' : '', 'block px-4 py-2 text-sm text-gray-700 cursor-pointer dark:text-slate-200')}
                              >
                                  Delete
                              </span>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
  
                  )}
  
                </div>
                <div className='flex items-center'>
             <span className='inline-block align-middle ml-2'>
            <svg className='h-4 w-4 fill-none stroke-2 stroke-violet-800' xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
</svg>

            </span> 
                <p className="px-4 py-3">{}</p>
                </div>
<div className="relative" >
  <Link to = {``}>
  <span className="absolute right-1.5 bottom-1.5 ">
  <svg className="w-5 h-5 fill-none transition duration-150 hover:stroke-violet-800 " xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
</svg>

 
  </span>
</Link>
</div>
                         
            </div>
           
           
            
          ))}
        </div>
        <form className="space-y-4 " onSubmit={handleTextSubmit}>
           <div>
           <label htmlFor="text" className="block mb-2 text-sm font-medium text-black">Name</label>
           <div className='flex items-center'>
             <span className='inline-block align-middle'>
            <svg className='h-4 w-4 fill-none stroke-violet-800' xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
</svg>

            </span> 
             <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
             type="text" name="message" id='message' className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg   block w-full p-1.5 sm:p-2 md:p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:ring-blue-500 transition duration-25" placeholder="Name of the Condominium"
             />
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
  )
}

 
export default PrivNoticesPage