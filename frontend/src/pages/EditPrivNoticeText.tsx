import {
  getTextPrivNotices,
  createTextPrivNotices,
  editTextPrivNotices,
  deleteTextPrivNotices,
  getTextPrivNotice,
} from "../api/apartment";
import { Toaster, toast } from "react-hot-toast";
import {
  useMutation,
  useQueryClient,
  useQuery,
  QueryClient,
} from "@tanstack/react-query";
import React, { useState, Fragment, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import options from "../assets/options.svg";
import backimage from "../assets/cssback.png";

interface Props {
  id: number;
  Apid: number;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditPrivNoticesPage = ({ Apid, id, setShow }: Props) => {
  const [message, setMessage] = useState<string>("");
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["TextPrivateNotices", Apid],
    queryFn: () => getTextPrivNotice(id),
  });
  useEffect(() => {
    if (data) {
      setMessage(data.message);
    }
  }, [data]);
  const editTextMutation = useMutation({
    mutationFn: editTextPrivNotices,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["TextPrivateNotices"] });
      toast.success("Edit successful");
    },

    onError: (error) => {
      if (typeof error === "string") {
        toast.error(error);
      } else {
        toast.error("An error occurred");
        console.log(error);
      }
    },
  });

  const handleEditTextSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    editTextMutation.mutate({
      message: message,
      id: id,
    });
  };

  return (
    <div>
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
                <div className="text-center"></div>
              </div>
              <form className="space-y-4 " onSubmit={handleEditTextSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    Message
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
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      type="text"
                      name="message"
                      id="message"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg   block w-full p-1.5 sm:p-2 md:p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:ring-blue-500 transition duration-25"
                      placeholder="New Message"
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
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Toaster />
      </div>
    </div>
  );
};
export default EditPrivNoticesPage;
