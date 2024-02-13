import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import { Fragment } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Logo from '../assets/logo02.png'
import Logo2 from '../assets/Logo01.png';


const Header = () =>{
    const { isAuth } = useAuthStore()
    function logOutFun() {
        useAuthStore.getState().logout()
        window.location.href = '/login'
      }

      function classNames(...classes: any) {
        return classes.filter(Boolean).join(' ')
      }
    



      return (
        <div className=" bg-stone-200 ">
        <Disclosure as="nav" className="bg-grey dark:bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
  
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:text-gray-900 dark:text-slate-200 dark:hover:text-slate-50">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                      )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
  
                    <img
                      className="hidden h-8 w-auto lg:block"
                      src={Logo2}
                      alt="Logo2"
                    />
                  </div>
  
  
                  <div className="hidden sm:ml-6 sm:block">
  
                    <div className="flex space-x-4">
  
                      {isAuth ? (
                        <>
                          <Link
                            to={'/'}
                            className='bg-slate-400 p-2 px-4 rounded-lg text-black dark:bg-gray-900 dark:text-white' 
                          >
                            Home
                          </Link>
  
                          <Link
                            to={'condominiums/'}
                            className='text-black p-2 px-4 rounded-lg hover:bg-slate-400 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                          >
                            Condominiums
                          </Link>
                          <Link
                            to={'condominiums/'}
                            className='text-black p-2 px-4 rounded-lg hover:bg-slate-400 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                          >
                            Reports
                          </Link>
                          <Link
                            to={'condominiums/'}
                            className='text-black p-2 px-4 rounded-lg hover:bg-slate-400 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                          >
                            Messajes
                          </Link>
                          <Link
                            to={'condominiums/'}
                            className='text-black p-2 px-4 rounded-lg hover:bg-slate-400 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                          >
                            Announcements
                          </Link>
                          <Link
                            to={'/requests'}
                            className='text-black p-2 px-4 rounded-lg hover:bg-slate-400 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                          >
                            Requests
                          </Link>
                          <Link
                            to={'condominiums/'}
                            className='text-black p-2 px-4 rounded-lg hover:bg-slate-400 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                          >
                            Options
                          </Link>



                        </>
  
                      ) : (
                          <>
                            <Link
                              to={'/login'}
                              className='bg-slate-400 p-2 px-4 rounded-lg text-black dark:bg-gray-900 dark:text-white' 
                            >
                              Log in
                            </Link>
  
                            <Link
                              to={'/register'}
                              className='text-black p-2 px-4 rounded-lg hover:bg-slate-400 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                            >
                              Sign up
                            </Link>
                            
                            
                          </>
                        )}
  
  
                    </div>
  
                  </div>
                </div>
                <div className="absolute space-x-2 inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {isAuth && (
                    <Menu as="div" className="relative ml-2">
                      <div>
                        <Menu.Button className="flex rounded-full ml-8 text-sm focus:outline-none ">
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src={Logo}
                            alt="Logo"
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
                              <a
                                href="#"
                                className={classNames(active ? 'bg-gray-100 dark:bg-slate-700' : '', 'block px-4 py-2 text-sm text-gray-700 dark:text-slate-200')}
                              >
                                Your Profile
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <span
                                onClick={logOutFun}
                                className={classNames(active ? 'bg-red-500 text-white dark:bg-slate-700' : '', 'block px-4 py-2 text-sm text-gray-700 cursor-pointer dark:text-slate-200')}
                              >
                                Sign out
                              </span>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
  
                  )}
  
                </div>
              </div>
            </div>
  
            <Disclosure.Panel className="sm:hidden">
  
    
                <div className="flex mx-2">
                  <div className="absolute inset-y-[72px] left-2 px-4 flex pl-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                    <span className="sr-only">Search icon</span>
                  </div>
                  <input type="text" id="search-navbar" className="block w-full p-2
                    pl-10 text-sm text-gray-900 border border-gray-300 rounded-full 
                    bg-gray-50 dark:bg-gray-700 outline-none
                    dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  
                    " placeholder="Search..."/>
                </div>
    
                <div className="space-y-1 px-2 pb-3 pt-2">
                  {/*       item.current ? 'bg-slate-400 text-black dark:bg-gray-900 dark:text-white' : */}
                  {/*         'text-black hover:bg-slate-400 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white', */}
                  {/* 'block rounded-md px-3 py-2 text-base font-medium' */}
                  {isAuth ? (
                    <div className="w-full grid grid-cols-1">
  <Link
                      to={'/'}
                      className='bg-slate-400 p-2 px-4 rounded-lg text-black dark:bg-gray-900 dark:text-white' 
                    >
                      Home
                    </Link>
  
                    <Link
                      to={'/condominiums'}
                      className='text-black p-2 px-4 rounded-lg hover:bg-slate-400 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                    >
                      Condominiums
                    </Link>
                    <Link
                      to={'/condominiums'}
                      className='text-black p-2 px-4 rounded-lg hover:bg-slate-400 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                    >
                      Reports
                    </Link>
                    <Link
                      to={'/'}
                      className='text-black p-2 px-4 rounded-lg hover:bg-slate-400 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                    >
                      Messajes
                    </Link>
                    <Link
                      to={'/'}
                      className='text-black p-2 px-4 rounded-lg hover:bg-slate-400 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                    >
                      Announcements
                    </Link>
                    <Link
                      to={'/requests'}
                      className='text-black p-2 px-4 rounded-lg hover:bg-slate-400 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                    >
                      Request
                    </Link>
                    <Link
                      to={'/options'}
                      className='text-black p-2 px-4 rounded-lg hover:bg-slate-400 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                    >
                      Options
                    </Link>
                  </div>
  
                ) : (
                    <div className="w-full grid grid-cols-1">
                      <Link
                        to={'/login'}
                        className='bg-slate-400 p-2 px-4 rounded-lg text-black dark:bg-gray-900 dark:text-white' 
                      >
                        Log in
                      </Link>
  
                      <Link
                        to={'/register'}
                        className='text-black p-2 px-4 rounded-lg hover:bg-slate-400 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                      >
  Sign up                  </Link>
  </div>
                  )}
  
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      </div>
    )

}
export default Header