import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react'
import { Link, Navigate, useNavigate,  } from 'react-router-dom';
import { ThemeContext } from '../ThemeContext.js';

const reducer = (state, action) => {

    switch (action.type) {
      case 'REGISTER_REQUEST':
        return { ...state, loading: true };

      case 'REGISTER_SUCCESS':
        return {
          ...state,
          loading: false,
          error: '',
          loggedInUser: action.payload,
        };
      case 'REGISTER_FAIL':
        return { ...state, loading: false, error: action.payload };

      default:
        return state;
    }
  };
export default function RegisterPage() {

    const {user,setUser,backendAPI}=useContext(ThemeContext);

    const navigate=useNavigate();

    if(user){
      navigate("/profile")
    }

    const [state, dispatch] = useReducer(reducer, {
        loading: false,
        error: '',
        loggedInUser: null,
      });

    const { loading, error, loggedInUser } = state; 

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState(''); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: 'REGISTER_REQUEST' });
        try {
          const { data } = await axios.post(
            `${backendAPI}/users`,{
                name,
                email,
                password,
                id:Math.floor(Math.random()*1000000)
            }
          );
         
            localStorage.setItem('user',JSON.stringify(data));
            dispatch({ type: 'REGISTER_SUCCESS', payload: data });
        
        } catch (err) {
          dispatch({ type: 'REGISTER_FAIL', payload: err.message });
        }
      };
  
      useEffect(() => {
        if (loggedInUser) {
          
          setUser(loggedInUser);
         
          return navigate("/profile");
        }
      }, [loggedInUser]);
   
  return (
    <div>
       <h1>Register User</h1>
       <form onSubmit={handleSubmit} className="form">
        <div className="form-item">
            <label htmlFor='name'>Name:</label>
            <input name='name' type='text' id='name'  required onChange={e=>setName(e.target.value)} />
        </div>
        <div className="form-item">
            <label htmlFor='email'>Email:</label>
            <input name='email' type={email} id='email'  required onChange={e=>setEmail(e.target.value)} />
        </div>
        <div className="form-item">
            <label htmlFor='password'>Password:</label>
            <input name='password' type={password} id='password'  required onChange={e=>setPassword(e.target.value)} />
        </div>
        <div className="form-item">
            <label></label>
            <button>Register</button>
        </div>
        {loading && (
          <div className="form-item">
            <label></label>
            <span>Processing...</span>
          </div>
        )}
        {error && (
          <div className="form-item">
            <label></label>
            <span className="error">{error}</span>
          </div>
        )}

        <div className="form-item">
            <label></label>
            <span>Already have an account?<Link to="/login">Login</Link></span>
        </div>
   
       </form>

    </div>
  )
}
