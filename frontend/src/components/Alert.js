import React, { useState, useEffect, useContext } from 'react';
import { alertcontext } from '../contexts/AlertContext';

const Alert = () => {
  const {message, color, setshowAlert, setmessage, setcolor} = useContext(alertcontext);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
        setshowAlert(false) 
        setmessage("") 
        setcolor("")
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`alert ${visible ? 'show' : 'hide'}`} style={{backgroundColor:color}}>
      {message}
    </div>
  );
};

export default Alert;

