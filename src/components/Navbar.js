


import React, { useContext, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../ThemeContext.js'

export default function Navbar() {

    const [query, setQuery] = useState('');


    //const history=useHistory();
    // With ReactRouter updating from version 5 to version 6, there have been a few changes. One of which is the replacement of the useHistory() hook to useNavigate()


    
    const navigate = useNavigate();
  
    const handleSubmit = (e) => {
      e.preventDefault();
      navigate(`/search/${query}`);
    };
    const {theme,toggleTheme,user,backendAPI,toggleBackendAPI} = useContext(ThemeContext);
  return (
    <div className='header'>
        <div className='header-item'>
            <Link to="/">
                <strong>Awesome Blog</strong>
            </Link>
        </div>

        <div className="header-item">
        <form onSubmit={handleSubmit}>

            <input
              name="query"
              type="text"
              placeholder="search posts"
              onChange={(e) => setQuery(e.target.value)}
            ></input>

            <button >Go</button>

        </form>
      </div>
        <div className="header-item">
            
        {user ? (
          <>
            <NavLink to="/profile" activeClassName="active">
              {user.name}
            </NavLink>{' '}
            <NavLink to="/create" activeClassName="active">
              Create Post
            </NavLink>
          </>
        ) : (
          <NavLink to="/login" activeClassName="active">
            Login
          </NavLink>
        )}{' '}
          
            
            <button onClick={toggleTheme}>{theme==='light'?'Theme:light':'Theme:dark'}</button>{' '}
            <button onClick={toggleBackendAPI}>{backendAPI==='/api'?'API:Real':'API:Mock'}</button>

        </div>
      
    </div>
  )
}
