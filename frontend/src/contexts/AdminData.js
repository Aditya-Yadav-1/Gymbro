import React, {createContext, useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { alertcontext } from './AlertContext';

const admincontext = createContext();
const host = "https://gymbro-lbim.onrender.com";

const AdminData = (props) => {
  const [admin, setadmin] = useState({});
  const {setshowAlert, setmessage, setcolor} = useContext(alertcontext);
  const navigate = useNavigate();

  const getAdmin = async () => {
    try {
      const url = `${host}/api/auth/getAdmin`; 
      let admindata;
      const response = await fetch(url, {
        method : "POST",
        headers : {
          "auth-token" : localStorage.getItem('authtoken')
        }
      });
      admindata = await response.json();
      setadmin(admindata);
    } catch (error) {
      setshowAlert(true);
      setmessage(error.message);
      setcolor("red");
      // console.log(error);
    }
    
  }

  const login = async (credentials) => {
    try {
      const url = `${host}/api/auth/login`;
      let response = await fetch(url, {
        method : "POST",
        headers : {
          "Content-Type": "application/json"
        },
        body : JSON.stringify(credentials)
      });
      const json = await response.json();
      // console.log(json);
      if(json.success){
        localStorage.setItem('authtoken', json.authtoken);
        navigate('/home');
      }
      else{
        // console.log("response success false");
        setshowAlert(true);
        setmessage("Invalid Id or Password");
        setcolor("red");
      }
    } catch (error) {
      setshowAlert(true);
      setmessage(error.message);
      setcolor("red");
      // console.log(error);
    }
    
  }
  return (
    <>
      <admincontext.Provider value={{admin, setadmin, getAdmin, login}}>
          {props.children}
      </admincontext.Provider>
    </>
  )
}

export default AdminData;

export {admincontext};
