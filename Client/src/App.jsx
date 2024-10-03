import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserListPage from './Components/user/UserListPage';
import Navbar from './Components/Header/Navbar';
import AddPost from './Components/AddPost/AddPost';
import FeedPage from './Components/Feed/FeedPage';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import UserProfile from './Components/Profile/UserProfile';
import './App.css';

function App() {
  return (
    <div className='main-content'>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<FeedPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/users" element={<UserListPage />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;