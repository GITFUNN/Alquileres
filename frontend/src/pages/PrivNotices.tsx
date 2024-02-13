import {getTextPrivNotices,createTextPrivNotices,editTextPrivNotices,deleteTextPrivNotices,getTextPrivNotice,
getRentReceiptsRequest,getRentReceiptRequest,createRentReceiptRequest,editRentReceiptRequest,deleteRentReceiptRequest } from "../api/apartment";
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

export interface RentReceipt{
  id:number;
  number: number;
  date: string;
  recident_name: string;
  net_amount: number;
  expenses: number;
  expiry_date: string;
  phone_number: string;
}


    const PrivNoticesPage =()=>{
      const [message, setMessage] = useState("");
      const [number, setNumber] = useState(0);
      const [date, setDate] = useState("");
      const [recident_name, setRecidentName] = useState("0");
      const [net_amount, setNetAmount] = useState(0);
      const [expenses, setExpensen] = useState(0);
      const [expiry_date, setExpiryDate] = useState("");
      const [phone_number, setPhoneNumber] = useState("");
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
    const {data:rentReceiptData, error:rentReceiptError} = useQuery({
      queryKey:['RentReceipts'],
      queryFn:()=> getRentReceiptsRequest(ApId) 
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

      const createRentReceipt= useMutation({
        mutationFn: () => createRentReceiptRequest(number,date,recident_name,net_amount,expenses,expiry_date,phone_number,ApId),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['RentReceipt'] })
          toast.success('Success')
          

        },
        onError: () => {
          toast.error("error")
        },
      });
      
      const handleRentReceiptSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        createRentReceipt.mutate();
        
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
  <div className=" flex flex-col max-h-164 sm:w-6/12 sm:mx-auto sm:border-x-2 pt-4 overflow-y-auto ">
 
    <div className="flex justify-center ">
      
      <div className = 'mx-auto my-auto w-11/12 '>
      
      <div className ='text-center' >
        
      <fieldset className="border-t border-black pb-4">
        <legend className="mx-auto px-4 text-xl">Private Notices</legend>
    </fieldset>
      </div>
      <div className="">
    
          {data?.map((TextPrivateNotice:TextPrivateNotice) => (
         
            <div key={TextPrivateNotice.id} className="sm:py-1 sm:w-[600px] bg-white text-black my-6 sm:my-2 mx-auto border grid grid-cols-12 rounded-lg border-slate-100 font-sans "> 
                 {show &&
        
        <EditPrivNoticesPage id ={TextPrivateNotice.id} Apid={ApId} setShow={setShow}/>  
      }

              <p className="px-4 py-3 col-span-11">{TextPrivateNotice.message}</p>
          

              <div className="z-50">
                  { (
                    <Menu as="div" className="relative ">
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
                                className={classNames(active ? 'bg-gray-100  dark:bg-slate-700 ' : '', 'block px-4 py-2 text-sm text-gray-700 cursor-pointer dark:text-slate-200')}
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
            </div>
  
          ))}
          </div>
          <form className="space-y-4 fixed mx-auto text-center justify-center" onSubmit={handleTextSubmit}>
           <div className="flex items-center">                  
           <div className='flex items-center'>
             <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
             type="text" name="message" id='message' className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg   block w-full p-1.5 sm:p-2 md:p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 transition duration-25" placeholder="Message"
             />
             </div>
           
             <div className='block items-center'>
      <button type="submit" className="focus:outline-none">
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
          </svg>
        </span>
      </button>
    </div>

           </div>
           </form>
          
        </div>
                             
    </div>
    </div>
  )
}

 
export default PrivNoticesPage