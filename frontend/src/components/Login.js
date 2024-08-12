import React, {useContext, useState} from 'react';
import main_logo from './Images/GYMBRO3.png';
import { admincontext } from '../contexts/AdminData';
import Alert from '../components/Alert';
import { alertcontext } from '../contexts/AlertContext';

const Login = () => {
  const {login} = useContext(admincontext);
  const {showAlert, setshowAlert} = useContext(alertcontext);
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const credentials = {email, password};
    login(credentials);
  };

  return (
    <div className="landing_page">
        <div className="left_side">
            <img id="main_logo" src = {main_logo} alt="main_logo"/>
            <div className="heading_under_logo">
                Gym Management Software
            </div>
            <div className="text_under_logo">
                To efficiently manage memberships, provide alerts to the members, track progress, and streamline operations
            </div>
        </div>
        <div className="right_side">
        {showAlert && <Alert/>}
            <div className="header">
                Welcome To GYMBRO
            </div>
            <div className="login-form">
                <div className='credentials'>
                    Email: aditya2@gmail |
                    Password: 12345678
                </div>
                <form>
                <input
                    className='login-input'
                    type="text"
                    autoComplete="on"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    className='login-input'
                    type="password" 
                    autoComplete="on"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className='login-button' onClick={handleLogin}>Login</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login
