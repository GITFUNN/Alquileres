import { getApartmentsRequest, deleteApartmentRequest, createApartmentRequest } from '../api/apartment';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import React, { useState } from "react";
import { toast, Toaster } from 'react-hot-toast';
import { BsFillTrashFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { Link } from 'react-router-dom';

interface Props {
  condId: number
};

export interface Apartment {
  rooms_number: number,
  number: string,
  id: number,
}

const UnitMgmt = ({ condId }: Props) => {
  const { data, error } = useQuery({
    queryKey: ['apartments'],
    queryFn: () => getApartmentsRequest(condId)
  });
  const [show, setShow] = useState(false);
  const queryClient = useQueryClient();
  const [number, setApartmentNumber] = useState("");
  const [rooms_number, setApartmentRooms] = useState(0);

  const createApartment = useMutation({
    mutationFn: () => createApartmentRequest(rooms_number, number, condId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['apartments'] })
      toast.success('Apartment Added')
      setShow(false);
    },
    onError: () => {
      toast.error('An error occurred')
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createApartment.mutate();
  };
  const deleteApartmentMutation = useMutation({
    mutationFn: deleteApartmentRequest,
    onSuccess: () => {
      queryClient.invalidateQueries(["apartments"])
      toast.success("Apartment deleted successfully")
    },
    onError: (error) => {
      console.error(error);
    },
  });

  if (error instanceof Error) return <>{toast.error(error.message)}</>

  return (
    <>
      {show &&
        <div>
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
            <Link to="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white md:top-5 md:left-8 md:absolute">
              <span className="text-gray-50 text-2xl font-jost">RentFlow</span>
            </Link>
            <div className="w-full md:w-[900px] bg-slate-50 rounded-lg border-gray-300">
              <div className="px-4 py-6 space-y-4">
                <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Add Apartment
                </h1>
                <button
                  onClick={() => setShow(false)}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-toggle="defaultModal"
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
                <form className="space-y-4 sm:grid sm:col-span-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Number</label>
                    <input
                      value={number}
                      onChange={(e) => setApartmentNumber(e.target.value)}
                      type="string" name=" number" id=' number' className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 sm:p-2 md:p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:ring-blue-500 transition duration-25 focus:scale-105" placeholder="Unity Number  " />
                  </div>
                  <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rooms</label>
                    <input
                      value={rooms_number}
                      onChange={(e) => setApartmentRooms(Number(e.target.value))}
                      type="rooms_number" name="rooms_number" id="rooms_number" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg transition duration-50 focus:ring-primary-600 focus:border-primary-600 focus:scale-105 block w-full p-1.5 sm:p-2 md:p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:ring-blue-500" placeholder="Rooms" />
                  </div>
                  <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 col-start-2">Create</button>
                </form>
              </div>
            </div>
          </div>
          <Toaster />
        </div>
      }
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-4 py-3">Unity Code</th>
              <th scope="col" className="px-4 py-3">Rooms</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((apartments: Apartment) => (
              <tr key={apartments.id} className="border-b dark:border-gray-700">
                <td className="px-4 py-3">{apartments.number}</td>
                <td className="px-4 py-3">{apartments.rooms_number}</td>
                <td className="px-4 py-3">
                  <BsFillTrashFill
                    onClick={() => {
                      deleteApartmentMutation.mutate((apartments.id));
                      console.log(apartments.id);
                    }}

                    className="text-red-500 w-6 h-6 cursor-pointer hover:text-white" />

                  
                  <Link to = {`apartments/${apartments.id}/`}>
            <AiFillEdit
            
            className = "text-grey-500 w-6 h-6 cursor-pointer hover:text-black"
            />
         </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className=""
          onClick={() => {
            setShow(true)
          }}
        >
          Add Apartment
        </button>
      </div>
    </>
  );
}

export default UnitMgmt;
