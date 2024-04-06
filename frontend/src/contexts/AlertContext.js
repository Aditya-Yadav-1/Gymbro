import React, { createContext, useState } from 'react'

const alertcontext = createContext();
const AlertData = (props) => {
  const [showAlert, setshowAlert] = useState(false);
  const [message, setmessage] = useState("");
  const [color, setcolor] = useState("");
  return (
      <alertcontext.Provider value={{showAlert, setshowAlert, message, setmessage, color, setcolor}}>
        {props.children}
      </alertcontext.Provider>
  )
}

export {AlertData, alertcontext};
