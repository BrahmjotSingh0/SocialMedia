import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserListPage from './Components/user/UserListPage';
import Navbar from './Components/Header/Navbar';
import SignIn from './Components/Signin/SignIn';
import SignUp from './Components/Signup/Signup';
import AddPost from './Components/AddPost/AddPost';
import FeedPage from './Components/Feed/FeedPage';
import './App.css';

function App() {
  return (
    <div className='main-content'>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<FeedPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/users" element={<UserListPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;