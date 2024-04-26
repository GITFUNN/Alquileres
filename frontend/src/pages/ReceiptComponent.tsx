const ReceiptComponent = () => {
  return (
    <div>
      <div className="p-2 flex flex-col h-screen justify-between border-r bg-white-gray">
        <div className="flex sm:items-center justify-between border-b border-gray-200 p-3 my-1 bg-white">
          <div className="flex items-center space-x-4">
            <p>Aurelio's Apartments 1A C1 </p>
            <div className=""></div>
          </div>
        </div>
        <div className="flex flex-col xl:ml-24 overflow-auto ">
          <div>
            <div className="border rounded-tl-lg rounded-br-lg rounded-tr-lg p-3 my-3 xl:w-9/12 shadow-md bg-white"></div>
          </div>
        </div>
        <div className=" border-t-2 lg:mb-16 mt-4 w-full relative bg-white">
          <div className="flex">
            <span className="absolute inset-y-0 flex items-center"></span>
            <form className="w-full">
              <input
                className="w-full py-3 pl-2 pr-12"
                placeholder="Write Something"
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
    </div>
  );
};

export default ReceiptComponent;
