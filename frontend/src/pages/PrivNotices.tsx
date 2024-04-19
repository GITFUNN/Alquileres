<<<<<<< HEAD
import {
  getTextPrivNotices,
  createTextPrivNotices,
  editTextPrivNotices,
  deleteTextPrivNotices,
  getTextPrivNotice,
  getRentReceiptsRequest,
  getRentReceiptRequest,
  createRentReceiptRequest,
  editRentReceiptRequest,
  deleteRentReceiptRequest,
} from "../api/apartment";
import { Toaster, toast } from "react-hot-toast";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import React, { useState, Fragment, useEffect, useRef } from "react";
import { Await, Link, useParams } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import options from "../assets/options.svg";
=======
import {getTextPrivNotices,createTextPrivNotices,editTextPrivNotices,deleteTextPrivNotices,getTextPrivNotice,
getRentReceiptsRequest,getRentReceiptRequest,createRentReceiptRequest,editRentReceiptRequest,deleteRentReceiptRequest } from "../api/apartment";
import { Toaster, toast } from 'react-hot-toast';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import React, { useState, Fragment, useEffect, useRef } from "react";
import { Await, Link,useParams } from  'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import options from '../assets/options.svg';
>>>>>>> 08e8c20f5c4aaae1c27c678fee9505a2bdf85e69
import EditPrivNoticesPage from "./EditPrivNoticeText";
import "./styles.css";

export interface TextPrivateNotice {
  id: number;
  message: string;
}

export interface RentReceipt {
  id: number;
  number: number;
  date: string;
  recident_name: string;
  net_amount: number;
  expenses: number;
  expiry_date: string;
  phone_number: string;
}

const PrivNoticesPage = () => {
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
  const messageRef = useRef<HTMLTextAreaElement>(null);
  let ApId: number;
  if (id !== undefined && sId !== undefined) {
    ApId = Number(sId);
  }
  const queryClient = useQueryClient();

<<<<<<< HEAD
  const { data, error } = useQuery({
    queryKey: ["TextPrivateNotices"],
    queryFn: () => getTextPrivNotices(ApId),
  });
  const { data: rentReceiptData, error: rentReceiptError } = useQuery({
    queryKey: ["RentReceipts"],
    queryFn: () => getRentReceiptsRequest(ApId),
  });
=======
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
      const messageRef = useRef<HTMLTextAreaElement>(null);
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
>>>>>>> 08e8c20f5c4aaae1c27c678fee9505a2bdf85e69

  const createTextPrivNotice = useMutation({
    mutationFn: () => createTextPrivNotices(message, ApId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["TextPrivateNotices"] });
      toast.success("Success");
    },
    onError: () => {
      toast.error("error");
    },
  });

  const handleTextSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await createTextPrivNotice.mutateAsync(); // Espera a que la mutación tenga éxito

<<<<<<< HEAD
    // Limpia el valor del textarea después de que la mutación tenga éxito
    if (messageRef.current) {
      setMessage(""); // Limpia el estado local
      messageRef.current.value = ""; // Limpia el valor del textarea
    }
  };
=======
        },
        onError: () => {
          toast.error("error")
        },
      });
      
      const handleTextSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await createTextPrivNotice.mutateAsync(); // Espera a que la mutación tenga éxito

  // Limpia el valor del textarea después de que la mutación tenga éxito
  if (messageRef.current) {
    setMessage(""); // Limpia el estado local
    messageRef.current.value = ""; // Limpia el valor del textarea
  }
};
>>>>>>> 08e8c20f5c4aaae1c27c678fee9505a2bdf85e69

  const createRentReceipt = useMutation({
    mutationFn: () =>
      createRentReceiptRequest(
        number,
        date,
        recident_name,
        net_amount,
        expenses,
        expiry_date,
        phone_number,
        ApId
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["RentReceipt"] });
      toast.success("Success");
    },
    onError: () => {
      toast.error("error");
    },
  });

<<<<<<< HEAD
  const handleRentReceiptSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createRentReceipt.mutate();
  };
=======
        },
        onError: () => {
          toast.error("error")
        },
      });
      
      const handleRentReceiptSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        createRentReceipt.mutate();
      
      };      
>>>>>>> 08e8c20f5c4aaae1c27c678fee9505a2bdf85e69

  const deleteTextPrivNotice = useMutation({
    mutationFn: deleteTextPrivNotices,
    onSuccess: () => {
      queryClient.invalidateQueries(["TextPrivateNotices"]);
      toast.success("Text deleted successfully");
    },
    onError: (error) => {
      console.error(error);
    },
  });
  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  useEffect(() => {
    const scrollWindowToBottom = () => {
      document.body.scrollTop = document.body.scrollHeight;
    };

    // Scroll hacia abajo al cargar la página
    scrollWindowToBottom();
  }, []);

  if (error instanceof Error) return <> {toast.error(error.message)}</>;
  return (
    <div className=" py-6">
      <div className=" flex flex-col min-h-128 max-h-128 sm:max-h-164  lg:w-9/12 xl:w-6/12 w-full mx-auto sm:border-x-2 overflow-y-auto  scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-200 scrollbar-corner-transparent scrollbar-track-rounded-full ">
        <div className="flex justify-center ">
          <div className="mx-auto my-auto w-11/12 ">
            <div className="">
              {data?.map((TextPrivateNotice: TextPrivateNotice) => (
                <div
                  key={TextPrivateNotice.id}
                  className="sm:py-1 lg:w-[550px]  bg-white text-black my-6 sm:my-2 mx-auto border grid grid-cols-12 rounded-tl-lg rounded-tr-lg rounded-br-lg border-slate-100 font-sans "
                >
                  {show && (
                    <EditPrivNoticesPage
                      id={TextPrivateNotice.id}
                      Apid={ApId}
                      setShow={setShow}
                    />
                  )}

                  <p className="px-4 py-3 col-span-11">
                    {TextPrivateNotice.message}
                  </p>

                  <div className="z-50">
                    {
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
                                  className={classNames(
                                    active
                                      ? "bg-gray-100  dark:bg-slate-700 "
                                      : "",
                                    "block px-4 py-2 text-sm text-gray-700 cursor-pointer dark:text-slate-200"
                                  )}
                                >
                                  Edit
                                </span>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <span
                                  onClick={() => {
                                    deleteTextPrivNotice.mutate(
                                      TextPrivateNotice.id
                                    );
                                  }}
                                  className={classNames(
                                    active
                                      ? "bg-red-500 text-white dark:bg-slate-700 "
                                      : "",
                                    "block px-4 py-2 text-sm text-gray-700 cursor-pointer dark:text-slate-200"
                                  )}
                                >
                                  Delete
                                </span>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>
<<<<<<< HEAD
        </div>
      </div>
      <form
        className="lg:flex lg:text-center lg:justify-center"
        onSubmit={handleTextSubmit}
      >
        <div className="flex items-center lg:w-9/12 xl:w-6/12">
          <div className="flex items-center w-full">
            <textarea
              autoFocus
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              ref={messageRef}
              name="message"
              id="message"
              className="bg-gray-50 border border-gray-300 text-gray-900 xl:text-sm w-full md:py-2.5 pl-2 h-auto resize-none min-h-8 max-h-12 relative rounded-full lg:rounded-none pt-2 "
              placeholder="Write a message"
            />

            <div className="absolute right-1 lg:right-1/4 mx-2 align-middle items-center justify-center text-center mt-1">
              <button type="submit" className="focus:outline-none">
                <span>
                  <svg
                    className="fill-none h-5 w-5 "
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </div>
=======
          
          
>>>>>>> 08e8c20f5c4aaae1c27c678fee9505a2bdf85e69
        </div>
      </form>
    </div>
<<<<<<< HEAD
  );
};
=======
    
    </div>
    <form
    
    
     className="lg:flex lg:text-center lg:justify-center" onSubmit={handleTextSubmit}>
      
    <div className="flex items-center lg:w-9/12 xl:w-6/12">                  
    <div className='flex items-center w-full'>
      <textarea 
      autoFocus
      
       value={message}
       onChange={(e) => setMessage(e.target.value)}
       ref = {messageRef}
       name="message" id='message' className="bg-gray-50 border border-gray-300 text-gray-900 xl:text-sm w-full md:py-2.5 pl-2 h-auto resize-none min-h-8 max-h-12 relative rounded-full lg:rounded-none pt-2 "  placeholder="Write a message"
      
      />
      
      <div className='absolute right-1 lg:right-1/4 mx-2 align-middle items-center justify-center text-center mt-1'>
<button type="submit" className="focus:outline-none">
 <span>
   <svg className="fill-none h-5 w-5 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
     <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
   </svg>
 </span>
</button>
</div>
      </div>
    

    </div>
    </form>
    </div>
   
  )
}
>>>>>>> 08e8c20f5c4aaae1c27c678fee9505a2bdf85e69

export default PrivNoticesPage;
