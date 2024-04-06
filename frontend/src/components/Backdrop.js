import React, { useContext, useEffect } from 'react';
import { admincontext } from '../contexts/AdminData';

const Backdrop = () => {
  const {admin, getAdmin} = useContext(admincontext);
  useEffect(()=>{
    getAdmin();
  },[]);
  return (
    <div className="backdrop">
      <div><span>{admin.gym_name}</span> by {admin.name}</div>
      {/* <div><span>FitSure</span> by Aditya Yadav</div> */}
      {/* <div><span>Bolt Fitness</span> by Bhomesh Yadav</div> */}
    </div>
  )
}

export default Backdrop
