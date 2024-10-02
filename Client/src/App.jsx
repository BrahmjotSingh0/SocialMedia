import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserListPage from './Components/user/UserListPage';
import Navbar from './Components/Header/Navbar';
import SignIn from './Components/Signin/SignIn';
import SignUp from './Components/Signup/Signup';
import AddPost from './Components/AddPost/AddPost';
import './App.css';



function App() {
  return (
    <div className='main-content'>
   <Router>v
      <Navbar />
      <Routes>
        <Route path="/" element={<UserListPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/add-post" element={<AddPost />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
