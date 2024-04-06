import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Contact from './components/Contact'; 
import AdminData from './contexts/AdminData';
import Memberdata from './contexts/Memberdata';
import Login from './components/Login';
import { AlertData } from './contexts/AlertContext';

function App() {
  return (
    <>
      <Router>
        <AlertData>
          <AdminData>
            <Memberdata>
              <div className="container">
                <Routes>
                  <Route path="/home" element={<Home />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/" element={<Login />} />
                </Routes>
              </div>
            </Memberdata>
          </AdminData>
        </AlertData>
      </Router>
    </>
  );
}

export default App;
