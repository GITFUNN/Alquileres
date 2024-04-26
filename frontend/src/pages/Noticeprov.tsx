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
import EditPrivNoticesPage from "./EditPrivNoticeText";
import ReceiptComponent from "./ReceiptComponent";

export interface TextPrivateNotice {
  id: number;
  message: string;
}
export interface RentReceipts {
  number: number;
  date: string;
  recident_name: string;
  net_amount: number;
  expenses: number;
  expiry_date: number;
  phone_number: number;
  ApId: number;
}
const PrivNoticesPage2 = () => {
  const [message, setMessage] = useState("");
  const [number, setNumber] = useState(0);
  const [date, setDate] = useState("");
  const [recident_name, setRecidentName] = useState("0");
  const [net_amount, setNetAmount] = useState(0);
  const [expenses, setExpensen] = useState(0);
  const [expiry_date, setExpiryDate] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [showMedia, setShowMedia] = useState(false);
  const [show, setShow] = useState(false);
  const { id, sId } = useParams();
  const messageRef = useRef<HTMLTextAreaElement>(null);
  let ApId: number;
  if (id !== undefined && sId !== undefined) {
    ApId = Number(sId);
  }
  const queryClient = useQueryClient();

  const { data, error } = useQuery({
    queryKey: ["TextPrivateNotices"],
    queryFn: () => getTextPrivNotices(ApId),
  });
  const { data: rentReceiptData, error: rentReceiptError } = useQuery({
    queryKey: ["RentReceipts"],
    queryFn: () => getRentReceiptsRequest(ApId),
  });

  const createTextPrivNotice = useMutation({
    mutationFn: () => createTextPrivNotices(message, ApId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["TextPrivateNotices"] });
    },
    onError: () => {
      toast.error("An error occurred while creating, please try again");
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

  const handleRentReceiptSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createRentReceipt.mutate();
  };

  const handleClickChangeToMessage = () => {
    setShowMessage(true);
    setShowReceipt(false);
    setShowMedia(false);
  };

  const handleClickChangeToReceipt = () => {
    setShowMessage(false);
    setShowReceipt(true);
    setShowMedia(false);
  };
  const handleClickChangeToMedia = () => {
    setShowMessage(false);
    setShowReceipt(false);
    setShowMedia(true);
  };

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

  document.body.style.overflowY = "hidden";

  if (error instanceof Error) return <> {toast.error(error.message)}</>;
  return (
    <div id="principal" className="h-full font-display">
      <div>
        <div>
          <div className="relative min-h-screen flex flex-col">
            <div className="flex-grow w-full mx-auto lg:flex">
              <div className="flex-1 min-w-0 bg-white xl:flex">
                <div className="border-b border-gray-200 xl:border-b-0 xl:flex-shrink-0 xl:w-64 xl:border-r xl:border-gray-200 bg-gray-50 ml-2">
                  <div className="h-full pl-4 pr-2 lg:py-6 sm:pl-6 lg:pl-8 xl:pl-0">
                    <div className="h-full relative hidden lg:block">
                      <div className="relative px-2 py-2 flex items-center space-x-3 hover:border-gray-400 focus-within:ring-offset-2 focus-within:ring-red-500 mb-4">
                        <div className=" flex-shrink-0">APP</div>
                        <div className="flex-1 min-w-0">
                          <a className="focus:outile-none">
                            <span className="absolute inset-0" />
                            <p className="text-sm font-bold">
                              Apartment 1A C1{" "}
                            </p>
                          </a>
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                              />
                            </svg>
                          </div>
                          <input
                            placeholder="Search apartments by code"
                            name="search"
                            className="focus:ring-black focus:border-gray-200 bloc w-full pl-10 sm:text-sm border-gray-100  p-2 border font-display"
                          />
                        </div>
                      </div>
                      <div className="relative px-2 py-2 flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 mb-3 hover:bg-gray-200">
                        <div className="flex-shrink-0">APP</div>
                        <div className="flex-1 min-w-0">
                          <a className="focus:outline-none">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-display font-bold">
                                Apartment 1A C1
                              </p>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {showMessage && (
                  <div className="p-2 flex flex-col h-screen justify-between border-r bg-white-gray w-full ">
                    <div className="flex sm:items-center justify-between border-b border-gray-200 p-2 lg:p-3 my-1 bg-white">
                      <div className="flex items-center space-x-4">
                        <p>Aurelio's Apartments 1A C1 </p>
                        <div className=""></div>
                      </div>
                    </div>
                    <div className="flex flex-col xl:ml-24 overflow-auto ">
                      <div>
                        {data?.map((TextPrivateNotice: TextPrivateNotice) => (
                          <div
                            className="border rounded-tl-lg rounded-br-lg rounded-tr-lg p-3 my-3 xl:w-9/12 shadow-md bg-white border-t-1 border-t-orange-500  text-gray-800"
                            key={TextPrivateNotice.id}
                          >
                            <p>{TextPrivateNotice.message}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className=" border-t-2 lg:mb-16 mt-4 w-full relative bg-white">
                      <div className="flex">
                        <span className="absolute inset-y-0 flex items-center"></span>
                        <form className="w-full" onSubmit={handleTextSubmit}>
                          <input
                            className="w-full py-3 pl-2 pr-12"
                            placeholder="Write Something"
                            ref={messageRef}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                          />

                          <div className="absolute inset-y-0 right-0 items-center px-4 z-50 p-4 flex border-l-2 my-1">
                            <button type="submit">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                className="h-5 w-5 fill-none cursor-pointer "
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                                />
                              </svg>
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                )}
                {showReceipt && (
                  <div className="p-2 flex flex-col h-screen justify-between border-r bg-white-gray w-full">
                    <div className="flex sm:items-center justify-between border-b border-gray-200 p-2 lg:p-3 my-1 bg-white ">
                      <div className="flex items-center ">
                        <p>Aurelio's Apartments 1A C1 </p>
                        <div className=""></div>
                      </div>
                    </div>
                    <div id="textid" className="flex flex-col overflow-auto">
                      <div>
                        <div className=" border-t-8 border-t-amber-500 border rounded-lg mb-8 shadow-md bg-white w-full  mx-auto  md:w-7/12 flex relative ">
                          <div className="grid grid-rows-8 p-6 w-full h-full">
                            <div className="flex border-b-2 border-b-gray-200 items-center py-2">
                              <h1 className="text-3xl justify-center font-semibold">
                                Receipt
                              </h1>
                            </div>
                            <div className="flex items-center">
                              <p className="font-semibold mr-2">N°</p>
                              <p className="font-medium text-gray-800 ">
                                1
                              </p>
                            </div>
                            <div className="flex justify-between items-center">
                              <p className="font-semibold">Date</p>
                              <p className="font-medium text-gray-800">Apr. 25, 2024</p>
                            </div>
                            <div className="flex justify-between items-center">
                              <p className="font-semibold">Resident</p>
                              <p className="font-medium text-gray-800">
                                Jon Doe
                              </p>
                            </div>

                            <div className="flex justify-between items-center">
                              <p className="font-semibold">Net Amount</p>
                              <p className="font-medium text-gray-800">
                                $114,000.00
                              </p>
                            </div>
                            <div className="flex justify-between items-center">
                              <p className="font-semibold">Expenses</p>
                              <p className="font-medium text-gray-800">
                                
                                $9,000.00
                              </p>
                            </div>

                            <div className="flex justify-between items-center">
                              <p className="font-semibold">Expire Date</p>
                              <p className="font-medium text-gray-800">
                                
                                2024-05-10
                              </p>
                            </div>
                            <div className="flex justify-between items-center border-b-2 border-b-gray-200 ">
                              <p className="font-semibold">Phone Number</p>
                              <p className="font-medium text-gray-800">
                                3445123254
                              </p>
                            </div>
                            <div className="flex items-center py-4">
                              <p className="font-semibold text-xl mr-2">
                                Total
                              </p>
                              <p className="font-medium text-gray-800">
                                $124,000.00
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className=" border-t-2 lg:mb-16 mt-4 w-full relative flex items-center">
                        <div className="flex py-2 px-1 items-center justify-center">
                         <button className="border bg-light-orange text-black p-2 text-sm font-medium flex items-center px-4 hover:bg-orange-500 justify-center text-center align-middle">
                         <svg xmlns="http://www.w3.org/2000/svg " className="fill-none h-5 w-5 stroke-black mr-2  justify-center text-center align-middle items-center"  viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>
Create new receipt
                         </button>
                          
                      </div>
                    </div>
                  </div>
                  
                )}
              </div>
              <div className="bg-gray-50 px-2 lg:flex-shrink-0 xl:block xl:w-96">
                <div className="h-full bg-gray-50 relative">
                  <div className="lg:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg font-medium pointer-events-none hidden">
                    Some Content Here
                  </div>

                  <div className="flex sm:items-center border-b border-gray-200 p-3 my-3 mx-auto">
                    <div className="flex space-x-4 text-nowrap align-middle mx-auto">
                      <div className="relative flex justify-between items-center">
                        <div className="flex space-x-3 font-medium text-gray-600">
                          <span className="border-r border-gray-800" />
                          <p
                            id="message_button"
                            className={`hover:text-black cursor-pointer focus:border-blue-500 ${
                              showMessage ? " border-b-2 border-orange-500" : ""
                            }`}
                            onClick={handleClickChangeToMessage}
                          >
                            Text Messages
                          </p>
                          <span className="border-r border-gray-800" />
                          <p
                            id="receipt_button"
                            className={`hover:text-black cursor-pointer focus:border-blue-500 ${
                              showReceipt ? " border-b-2 border-orange-500" : ""
                            }`}
                            onClick={handleClickChangeToReceipt}
                          >
                            Receipts
                          </p>
                          <span className="border-r border-gray-800 " />
                          <p
                            id="media_button"
                            className={`hover:text-black cursor-pointer focus:border-blue-500 ${
                              showMedia ? " border-b-2 border-orange-500" : ""
                            }`}
                            onClick={handleClickChangeToMedia}
                          >
                            Media Section
                          </p>
                          <span className="border-r border-gray-800 cursor-pointer" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=""></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivNoticesPage2;
