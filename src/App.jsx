import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserListPage from './Components/user/UserListPage';
import Navbar from './Components/Header/Navbar';




function App() {
  return (
   <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<UserListPage />} />
      </Routes>
    </Router>
  );
}

export default App;
