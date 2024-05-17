import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import PropertyList from './components/PropertyList';
import './index.css';
import PostProperty from './components/PostProperty';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyPosts from './components/MyPosts';


function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/post-property" element={<PostProperty/>} />
        <Route path="/properties" element={<PropertyList />} />
        <Route path="/my-posts" element={<MyPosts />} />
      </Routes>
    </div>
  );
}

export default App;
