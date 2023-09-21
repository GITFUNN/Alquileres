import  { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const PhoneNumberValidation = () => {
  const [phone_number, setPhoneNumber] = useState<string>('');
  const [valid, setValid] = useState<boolean>(true);

  const handleChange = (value: string) => {
    setPhoneNumber(value);
    setValid(validatePhoneNumber(value));
  };

  const validatePhoneNumber = (phoneNumber: string): boolean => {
    const phoneNumberPattern = /^\+?[1-9]\d{1,14}$/;

    return phoneNumberPattern.test(phoneNumber);
  };

  return (
        <PhoneInput 
          country={'ar'}
          value={phone_number}
          onChange={handleChange}
          inputProps={{
            required: true,
            id: 'phone_number',
            name: 'phone_number',
            className:"bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:ring-blue-500 pl-12 transition duration-50",
            
           
          }}
          
        />
      
  );
};

export default PhoneNumberValidation;