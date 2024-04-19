import {
  getApartmentsRequest,
  deleteApartmentRequest,
  createApartmentRequest,
} from "../api/apartment";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import React, { useState, Fragment, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import options from "../assets/options.svg";
import { Menu, Transition } from "@headlessui/react";
import { getSenderEmail } from "../api/user";
import PrivNoticesPage from "./PrivNotices.tsx";
interface Props {
  condId: number;
}

export interface Apartment {
  rooms_number: number;
  number: string;
  id: number;
  renters: number;
  email?: string;
}

const UnitMgmt = ({ condId }: Props) => {
  const { data, error } = useQuery({
    queryKey: ["apartments"],
    queryFn: () => getApartmentsRequest(condId),
  });
  const [show, setShow] = useState(false);
  const queryClient = useQueryClient();
  const [number, setApartmentNumber] = useState("");
  const [rooms_number, setApartmentRooms] = useState(0);
  const navigate = useNavigate();
  const createApartment = useMutation({
    mutationFn: () => createApartmentRequest(rooms_number, number, condId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apartments"] });
      toast.success("Apartment Added");
      setShow(false);
    },
    onError: () => {
      toast.error("An error occurred");
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createApartment.mutate();
  };
  const deleteApartmentMutation = useMutation({
    mutationFn: deleteApartmentRequest,
    onSuccess: () => {
      queryClient.invalidateQueries(["apartments"]);
      toast.success("Apartment deleted successfully");
    },
    onError: (error) => {
      console.error(error);
    },
  });
  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const enrichedData = await Promise.all(
          data?.map(async (apartment: Apartment) => {
            // Verificar si renters no es null
            if (apartment.renters !== null) {
              const senderEmailData = await getSenderEmail(apartment.renters);
              const email = senderEmailData?.email;

              return {
                ...apartment,
                email,
              };
            } else {
              // Si renters es null, retornar el apartamento sin cambios
              return apartment;
            }
          }) || []
        );

        // Actualiza el estado con los datos enriquecidos
        console.log(enrichedData);
        setApartments(enrichedData);
      } catch (error) {
        console.error("Error al obtener datos enriquecidos:", error);
      }
    };

    fetchData();
  }, [data]);

  const [apartments, setApartments] = useState<Apartment[]>([]);

  if (error instanceof Error) return <>{toast.error(error.message)}</>;

  return (
    <div className="font-display">
      {show && (
        <div className="z-50">
          <div className="flex items-center justify-center px-6 py-8 mx-auto">
            <div className="w-full sm:w-[600px] border border-black rounded-lg">
              <div className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 top-2 left-2 relative hover:bg-gray-100 rounded-lg cursor-pointer hover:stroke-violet-800"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  onClick={() => setShow(false)}
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <div className="px-4 py-6 space-y-4 ">
                <div className="flex justify-center pb-2">
                  <div className="text-center">
                    <h1 className="text-lg font-medium">New Apartment</h1>
                  </div>
                </div>
                <form className="space-y-4 " onSubmit={handleSubmit}>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-black"
                    >
                      Number
                    </label>
                    <div className="flex items-center">
                      <span className="inline-block align-middle">
                        <svg
                          className="h-4 w-4 fill-none stroke-violet-800"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m8.25 4.5 7.5 7.5-7.5 7.5"
                          />
                        </svg>
                      </span>
                      <input
                        value={number}
                        onChange={(e) => setApartmentNumber(e.target.value)}
                        type="text"
                        name="number"
                        id="number"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg   block w-full p-1.5 sm:p-2 md:p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:ring-blue-500 transition duration-25"
                        placeholder="Apartment Code"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-black"
                    >
                      Rooms
                    </label>
                    <div className="flex items-center">
                      <span className="inline-block align-middle">
                        <svg
                          className="h-4 w-4 fill-none stroke-violet-800"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m8.25 4.5 7.5 7.5-7.5 7.5"
                          />
                        </svg>
                      </span>
                      <input
                        value={rooms_number}
                        onChange={(e) => setApartmentRooms(e.target.value)}
                        type="number"
                        name="rooms_number"
                        id="rooms_number"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg transition duration-50 block w-full p-1.5 sm:p-2 md:p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:ring-blue-500 appearance-none"
                        placeholder="Location"
                      />
                    </div>
                  </div>
                  <div className="flex items-center py-4">
                    <span className="inline-block align-middle">
                      <svg
                        className="h-4 w-4 stroke-transparent fill-transparent"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m8.25 4.5 7.5 7.5-7.5 7.5"
                        />
                      </svg>
                    </span>
                    <button
                      type="submit"
                      className="w-full font-medium text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-900 col-start-2 transition duration-25"
                    >
                      Create
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <Toaster />
        </div>
      )}
      <div className="flex justify-center ">
        <div className="mx-auto my-auto w-11/12">
          <div className="text-center">
            <fieldset className="border-t border-black pb-4">
              <legend className="mx-auto px-4 text-xl">
                Apartments Section
              </legend>
            </fieldset>
          </div>

          <span
            className="inline-block transition duration-150 hover:bg-gray-100 p-2 rounded-full cursor-pointer hover:text-violet-800 "
            title="Go back"
          >
            <svg
              className="h-5 w-5 relative  rounded-lg   text-center justify-center"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              onClick={() => navigate(-1)}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          </span>
          {apartments.map((apartments) => (
            <div
              key={apartments.id}
              className="sm:py-1 sm:w-[600px] bg-white text-black my-6 sm:my-2 mx-auto border-2 grid grid-rows-3 grid-flow-col grid-cols-2 border-gray-400 font-sans"
            >
              <div className="flex items-center col-span-2">
                <span className="inline-block align-middle ml-2">
                  <svg
                    className="fill-none h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5-3.9 19.5m-2.1-19.5-3.9 19.5"
                    />
                  </svg>
                </span>
                <p className="px-4 py-3">Number: {apartments.number}</p>
              </div>

              <div className="flex items-center col-span-2">
                <span className="inline-block align-middle ml-2">
                  <svg
                    className="fill-none w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122"
                    />
                  </svg>
                </span>
                <p className="px-4 py-3">Rooms: {apartments.rooms_number}</p>
              </div>
              <div className="flex items-center col-span-2">
                <span className="inline-block align-middle ml-2">
                  <svg
                    className="h-4 w-4 fill-none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                    />
                  </svg>
                </span>
                <p className="px-4 py-3">Residents: {apartments.email}</p>
              </div>

              <div className="z-50">
                {
                  <Menu as="div" className="relative">
                    <div>
                      <Menu.Button
                        className="absolute right-1.5 top-2 p-0.5 transition duration-150 hover:bg-gray-100 rounded-full hover:text-violet-800"
                        title="Options"
                      >
                        <svg
                          className="w-6 h-6 fill-none"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                          />
                        </svg>
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
                            <Link to={`apartments/${apartments.id}/`}>
                              <a
                                className={classNames(
                                  active ? "bg-gray-100 dark:bg-slate-700" : "",
                                  "block px-4 py-2 text-sm text-gray-700 dark:text-slate-200"
                                )}
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
                                deleteApartmentMutation.mutate(apartments.id);
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
              <div className="relative col-span-2">
                <Link to={`${apartments.id}/priv_notices2`}>
                  <span
                    className="absolute right-1.5 top-2 p-0.5 transition duration-150 hover:bg-gray-100 rounded-full hover:text-violet-800"
                    title="Chat"
                  >
                    <svg
                      className="h-6 w-6 fill-none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                      />
                    </svg>
                  </span>
                </Link>
              </div>
              <div className="relative col-span-2">
                <Link to={`${apartments.id}/`}>
                  <span
                    className="absolute right-1.5 top-2 p-0.5 transition duration-150 hover:bg-gray-100 rounded-full hover:text-violet-800"
                    title="Add Residents"
                  >
                    <svg
                      className="h-6 w-6 fill-none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                      />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          ))}

          <div className="text-center">
            <span className="inline-block  ">
              <svg
                className="w-8 h-8 stroke-1 fill-none transition duration-150 hover:stroke-violet-800 cursor-pointer"
                onClick={() => setShow(true)}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  stroke-linejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitMgmt;
