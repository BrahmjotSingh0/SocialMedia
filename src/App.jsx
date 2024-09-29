import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserListPage from './Components/user/UserListPage';
import Navbar from './Components/Header/Navbar';
import './App.css';



function App() {
  return (
    <div className='main-content'>
   <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<UserListPage />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
