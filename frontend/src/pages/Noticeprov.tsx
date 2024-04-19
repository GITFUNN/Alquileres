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

export interface TextPrivateNotice {
  id: number;
  message: string;
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
    <div>
    <div>
      <div>
        <div className="relative min-h-screen flex flex-col ">
          <div className="flex-grow w-full mx-auto lg:flex">
            <div className="flex-1 min-w-0 bg-white xl:flex">
              <div className="border-b border-gray-200 xl:border-b-0 xl:flex-shrink-0 xl:w-64 xl:border-r xl:border-gray-200 bg-gray-50 ml-2">
                <div className="h-full pl-4 pr-2 py-6 sm:pl-6 lg:pl-8 xl:pl-0">
                  <div className="h-full relative">
                    <div className="relative px-2 py-2 flex items-center space-x-3 hover:border-gray-400 focus-within:ring-offset-2 focus-within:ring-red-500 mb-4">
                      <div className=" flex-shrink-0">APP</div>
                      <div className="flex-1 min-w-0">
                        <a className="focus:outile-none">
                          <span className="absolute inset-0" />
                          <p className="text-sm font-bold">Apartment 1A C1</p>
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

              <div className="p-2 flex flex-col h-screen justify-between border-r">
                <div className="flex sm:items-center justify-between border-b border-gray-200 p-3 my-1">
                  <div className="flex items-center space-x-4">
                    <p>Apartment 1A C1</p>
                    <div className=""></div>
                  </div>
                </div>
                <div className="flex flex-col xl:ml-24 overflow-auto">
                  <div>
                {data?.map((TextPrivateNotice: TextPrivateNotice)=>(                
                  <div className="border rounded-tl-lg rounded-br-lg rounded-tr-lg p-2 my-2 xl:w-9/12"
                  key = {TextPrivateNotice.id}
                  >
                    <p>
                      {TextPrivateNotice.message}
                    </p>
                  </div>
))}
                </div>
                  </div>
                
                <div className=" border-t-2 lg:mb-16 mt-4 w-full relative">
                  <div className="flex">
                    <span className="absolute inset-y-0 flex items-center"></span>
                    <form
                    className="w-full"
                    onSubmit={handleTextSubmit}
                    >
                    <input
                      className="w-full py-3 pl-2 pr-12"
                      placeholder="Write Something"
                      ref={messageRef}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />

                    
                    
                    <div className="absolute inset-y-0 right-0 items-center px-4 z-50 p-4 flex border-l-2 my-1">
                      <button
                      type="submit">
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
                          <p className="hover:text-black cursor-pointer">
                            Text Messages
                          </p>
                          <span className="border-r border-gray-800" />
                          <p className="hover:text-black  cursor-pointer">
                            Receipts
                          </p>
                          <span className="border-r border-gray-800 " />
                          <p className="hover:text-black  cursor-pointer">
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
