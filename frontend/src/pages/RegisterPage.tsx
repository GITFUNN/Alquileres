import { Link, useNavigate } from 'react-router-dom'
import backimage from '../assets/back.png'
import Logo from '../assets/react.svg';
import { registerRequest } from '../api/user';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from "react";
import { Toaster, toast } from 'react-hot-toast';
import { useAuthStore } from '../store/auth.ts';

const RegisterPage = () => {
 
    const navigate = useNavigate();
    const { isAuth } = useAuthStore();

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [last_name, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [re_password, setRePassword] = useState("");
    const [phone_number, setPhoneNumber] = useState("");
    
    const registerMutation = useMutation({

      mutationFn: () => registerRequest(email, password, name, last_name, phone_number),
      onSuccess: () =>{
        navigate("/login")
      },

      onError: (error) => {
        if (typeof error === 'string') {
          toast.error(error);
        } else {
          toast.error('An error occurred');
        }
      },
    });

    const handleMatch = () => {
      if (password !== re_password) {
        return false;
    } else {
      return true;
    }
  }

  const handlePhoneNumberChange = (e:any) => {
    const value = e.target.value;
    const numericValue = value.replace(/[^0-9]/g, "").slice(0, 12);
    setPhoneNumber(numericValue);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== re_password) {
      toast.error('Password does not match');
    } else {
      registerMutation.mutate();
    }
  };
  
  if (registerMutation.isLoading) return <p>Loading...</p>
  

    return (
      <div className='sm:min-h-screen sm:flex items-center sm:justify-center'

      style={{
        backgroundImage: `url(${backimage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }} 
      
       >
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
     
      <Link to="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white md:top-5 md:left-8 md:absolute">
      <img className="w-10 h-10 mr-1 transition duration-500 hover:rotate-180" src={Logo} alt="logo"/>
      <span className = "text-gray-50 text-2xl font-jost">RentFlow</span>

      </Link>
      <div className="w-full md:w-[900px] bg-slate-50 rounded-lg border-gray-300">
        <div className="px-4 py-6 space-y-4">
        <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create a new account 
            </h1>
          <form className="space-y-4 sm:grid sm:col-span-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0" onSubmit={handleSubmit}>
            <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email*</label>
              <input
               value={email}
               onChange={(e) => setEmail(e.target.value)}
              type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 sm:p-2 md:p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:ring-blue-500 transition duration-25 focus:scale-105" placeholder="name@company.com"/>
            </div>
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name*</label>
              <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="name" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg transition duration-50 focus:ring-primary-600 focus:border-primary-600 focus:scale-105 block w-full p-1.5 sm:p-2 md:p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:ring-blue-500" placeholder="Name"/>
            </div>
            <div>
              <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your last name*</label>
              <input
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
              type="last_name" name="last_name" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 sm:p-2 md:p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition duration-50 focus:scale-105" placeholder="Last name"/>
            </div>
            <div>
            <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your phone number*</label>  
            <input
              value={phone_number}
              onChange={handlePhoneNumberChange}
              type="phone_number" name="phone_number" id="phone_number" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 sm:p-2 md:p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition duration-50 focus:scale-105" placeholder="Phone number"/>
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password*</label>
              <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 sm:p-2 md:p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition duration-50 focus:scale-105"/>
            </div>
            <div>
              <label htmlFor="re_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password*</label>
              <input 
              value={re_password}
              onChange={(e) => setRePassword(e.target.value)}
              type="password" name="re_password" id="re_password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 sm:p-2 md:p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition duration-50 focus:scale-105"/>
            </div>
          {handleMatch() ? false :<p className="text-sm font-medium text-red-500">Passwords must match</p>}
            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 col-start-2">Sign up</button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Have an account? <Link to={'/login'} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign in</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
    <Toaster />
    </div>
    )
}
export default RegisterPage
