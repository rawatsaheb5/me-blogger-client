import logo from './logo.svg';
import './App.css';
import { Routes , Route} from 'react-router-dom';
import Login from './pages/Login';
import BlogCard from './components/BlogCard';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import CreatePost from './components/CreatePost';
import Profile from './pages/Profile';
import RegisterForm from './pages/Register';
import MyBlog from './pages/MyBlog'
import EditPost from './components/EditPost';
import PostPage from './pages/PostPage';
import EditProfile from './pages/EditProfile';
function App() {
  return (
    <>
      <Routes>
        <Route path='/signin' element={<Login />} />
        <Route path='/signup' element={<RegisterForm />} />
        <Route path='/' element={<Home />} />
        <Route path='/navbar' element={<Navbar />} />
        <Route path='/signin' element={<Login />} />
        <Route path='/create-blog' element={<CreatePost />} />
        <Route path='/my-blog' element={<MyBlog />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/post-edit' element={<EditPost />} />
        <Route path='/post-page' element={<PostPage />} />
        <Route path='/edit-profile' element={<EditProfile />} />
        
      </Routes>
    </>
  );
}

export default App;
