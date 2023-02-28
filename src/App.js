
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar.js';
import { useContext } from 'react';
import {ThemeContext} from './ThemeContext.js'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.js';
import PostPage from './pages/PostPage.js';
import LoginPage from './pages/LoginPage.js';
import ProfilePage from './pages/ProfilePage.js';
import PrivateRoute from './components/PrivateRoute.js';
import CreatePostPage from './pages/CreatePostPage.js';
import RegisterPage from './pages/RegisterPage.js';


function App() {
 const {theme}=useContext(ThemeContext);
 
  return (
    <BrowserRouter>
          <div className={`container ${theme}`}>
            <Navbar/>

           <div className="main">

              <Routes>
                <Route path="/create" element={<PrivateRoute component={CreatePostPage}/>}></Route>
                <Route path="/profile" element={<PrivateRoute component={ProfilePage}/>}></Route>
                <Route path="/login" element={<LoginPage/>}></Route>
                <Route path="/register" element={<RegisterPage/>}></Route>
                <Route path="/post/:postId" element={<PostPage/>}></Route>
                <Route path="/search/:query?" element={<HomePage/>}></Route>
                <Route path="/user/:userId" element={<HomePage/>}></Route>

                <Route path="/" element={<HomePage/>}></Route>

              </Routes>
             
              

            </div>
            <div className="footer">
              Awesome blog.All rights reserved
            </div>

          </div>

    
    
    </BrowserRouter>
  );
}

export default App;






