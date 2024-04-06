import React, { useContext, useState } from 'react'
import Backdrop from './Backdrop'
import QueryBar from './QueryBar'
import ShowMembers from './ShowMembers'
import Navbar from './Navbar'
import Alert from './Alert'
import { alertcontext } from '../contexts/AlertContext'

const Home = () => {
  const [whichMembersToShow , setwhichMembersToShow] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const {showAlert} = useContext(alertcontext);
  return (
    
    <div className='main'>
      <Navbar/>
      {showAlert && <Alert/>} 
      <Backdrop/>
      <QueryBar whichMembersToShow={whichMembersToShow} setwhichMembersToShow={setwhichMembersToShow} setSearchValue={setSearchValue} searchValue={searchValue}/>
      <ShowMembers whichMembersToShow={whichMembersToShow} searchValue={searchValue}/>
    </div>
  )
} 

export default Home
