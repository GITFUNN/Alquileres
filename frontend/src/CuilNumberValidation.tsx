import  { useState } from 'react';
import React from 'react';

const CuilNumberValidator = () => {
    const [cuilNumber, setCuilNumber] = useState<string>('');
    const [valid, setValid] = useState<boolean>(true);

    const handleChange = (value:any) => {
        setCuilNumber(value);
        setValid(validateCuilNumber(value));
      };

      const validateCuilNumber = (cuilNumber: string): boolean => {
        const cuilNumberPattern = /^(20|23|24|27|30|33|34)([0-9]{2})([0-9]{8})([0-9])$/;
    
        return cuilNumberPattern.test(cuilNumber);
      };
return(
<form>
  <input
  type="text"
  id="cuil"
  name="cuil"
  placeholder="Ingrese un CUIL"
  value={cuilNumber}
  onChange={handleChange}

  />
  {valid === true && <span style={{ color: 'green' }}>CUIL válido</span>}
  {valid === false && <span style={{ color: 'red' }}>CUIL no válido</span>}
 </form>
);

};


export default CuilNumberValidator