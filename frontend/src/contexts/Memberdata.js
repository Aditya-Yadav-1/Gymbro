import React, {createContext, useContext} from 'react';
import { useState } from 'react';
import { admincontext } from '../contexts/AdminData';
import { alertcontext } from './AlertContext';

const membercontext = createContext();
const host = "http://localhost:5000";

const MemberData = (props) => {
  // const {admin, setadmin, getAdmin} = useContext(admincontext);
  const {setshowAlert, setcolor, setmessage} = useContext(alertcontext);
  const [members, setMembers] = useState([]);

  const getMembers = async () =>{
    if(localStorage.getItem('authtoken')){
      const url = `${host}/api/member/getmembers`;
      let memberdata;
      const response = await fetch(url, {
        method : "GET",
        headers : {
          "auth-token" : localStorage.getItem('authtoken')
        }
      });
      memberdata = await response.json();
      setMembers(memberdata);
    }else{
      // console.log("Unauthorized Access");
    }
    
  }

  const addMember = async (formData) =>{
    try {
      if(localStorage.getItem('authtoken')){
        const url = `${host}/api/member/addMember`;
        const response = await fetch(url, {
          method : "POST",
          body : JSON.stringify(formData),
          headers : {
            "Content-Type" : "application/json",
            "auth-token" : localStorage.getItem('authtoken')
          }
        });
        const json = await response.json();
        setshowAlert(true);
        if(json.success){
          setmessage(json.message);
          setcolor("green");
        }
        else{
          setmessage(json.error);
          setcolor("red");
        }
        getMembers();
      }
      else{
        // console.log("Unauthorized Access");
      }
      
    } catch (error) {
      setshowAlert(true);
      setmessage(error.message);
      setcolor("red");
      // console.log(error);
    }
  }

  const deleteMember = async (id) =>{
    try {
      if(localStorage.getItem('authtoken')){
        const url = `${host}/api/member/deleteMember/${id}`;
        const response = await fetch(url, {
          method : "DELETE",
          headers : {
            "auth-token" : localStorage.getItem('authtoken')
          }
        });
        const json = await response.json();
        setshowAlert(true);
        if(json.success){
          setmessage(json.message);
          setcolor("teal");
        }
        else{
          setmessage(json.error);
          setcolor("red");
        }
        getMembers();
      }
      else{
        // console.log("Unauthorized Access");
      }
      
    } catch (error) {
      setshowAlert(true);
      setmessage(error.message);
      setcolor("red");
      // console.log(error);
    }
  }

  const updateMember = async (id, formData) =>{
    try {
      if(localStorage.getItem('authtoken')){
        const url = `${host}/api/member/updateMember/${id}`;
        const response = await fetch(url, {
          method : "PUT",
          body : JSON.stringify(formData),
          headers : {
            "Content-Type" : "application/json",
            "auth-token" : localStorage.getItem('authtoken')
          }
        });
        const json = await response.json();
        setshowAlert(true);
        if(json.success){
          setmessage(json.message);
          setcolor("SteelBlue");
        }
        else{
          setmessage(json.error);
          setcolor("red");
        }
        getMembers();
        getMembers();
      }
      else{
        // console.log("Unauthorized Access");
      }
      
    } catch (error) {
      setshowAlert(true);
      setmessage(error.message);
      setcolor("red");
      // console.log(error);
    }
  }

  return (
    <membercontext.Provider value = {{members, getMembers, setMembers, addMember, deleteMember, updateMember}}>
        {props.children}
    </membercontext.Provider>
  )
}

export default MemberData;

export {membercontext};