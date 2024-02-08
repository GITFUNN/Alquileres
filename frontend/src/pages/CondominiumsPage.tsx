import {getCondominiumsRequest,deleteCondominiumRequest} from "../api/condominium";
import { Toaster, toast } from 'react-hot-toast';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import React, { useState, Fragment } from "react";
import { Link } from  'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import options from '../assets/options.svg';
import backimage from '../assets/cssback.png'



export interface Condominium {
    id: number
    condominium_name: string
    condominium_location: string
}

    const CondominiumPage =()=>{
    const queryClient = useQueryClient()
    const {data,error} = useQuery({
        queryKey:['condominiums'],
        queryFn: getCondominiumsRequest
    })


const deleteCondominiumMutation = useMutation({
  mutationFn:deleteCondominiumRequest,
  onSuccess: ()=>{
    queryClient.invalidateQueries(["condominiums"]) 
    toast.success("Condominium deleted successfully")
  },
  onError: (error) => {
    console.error(error);
  },
})
function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}


if (error instanceof Error) return <>{toast.error(error.message)}</>
return (
  
    <div className="flex justify-center">
      
      <div className = 'mx-auto my-auto w-11/12'>
      
      <div className ='text-center' >
        
      <fieldset className="border-t border-black pb-4">
        <legend className="mx-auto px-4 text-xl">Condominiums Section</legend>
    </fieldset>
      </div>
    
          {data?.map((condominium: Condominium) => (
         
            <div key={condominium.id} className="sm:py-1 sm:w-[600px] bg-white text-black my-6 sm:my-2 mx-auto border grid grid-cols-2 rounded-lg border-slate-100 font-sans">
              <div className='flex items-center'>
             <span className='inline-block align-middle ml-2'> 
            <svg className='h-4 w-4 fill-none stroke-2 stroke-violet-800' xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
</svg>

            </span> 
              <p className="px-4 py-3">{condominium.condominium_name}{condominium.id}</p>
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
                                <Link to = {`edit/${condominium.id}/`}>
                              <a
                                
                                className={classNames(active ? 'bg-gray-100 dark:bg-slate-700' : '', 'block px-4 py-2 text-sm text-gray-700 dark:text-slate-200')}
                              >
                                Edit
                              </a>
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <span
                              onClick={() => {
                                deleteCondominiumMutation.mutate((condominium.id));
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
                <p className="px-4 py-3">{condominium.condominium_location}</p>
                </div>
<div className="relative" >
  <Link to = {`${condominium.id}/`}>
  <span className="absolute right-1.5 bottom-1.5 ">
  <svg className="w-5 h-5 fill-none transition duration-150 hover:stroke-violet-800 " xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
</svg>

 
  </span>
</Link>
</div>
                         
            </div>
           
           
            
          ))}
        <div className="text-center" >
        <Link to="/create/">
  <span className="inline-block">
  <svg className="w-8 h-8 stroke-1 fill-none transition duration-150 hover:stroke-violet-800 " xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
 
  </span>
</Link>
</div>

        </div>                        
    </div>
  
  )
}

 
export default CondominiumPage