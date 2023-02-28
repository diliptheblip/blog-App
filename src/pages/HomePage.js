import React, { useContext, useEffect, useReducer } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';
import { ThemeContext } from '../ThemeContext.js';
const reducer=(state,action)=>{
    switch(action.type){

        case 'POSTS_REQUEST':
            return {...state,loading:true};
        case 'POSTS_SUCCESS':
            return{...state,loading:false,posts:action.payload,error:''};
        case 'POSTS_FAIL':
            return {...state,loading:false,error:action.payload}

        case 'USERS_REQUEST':
            return {...state,loadingUsers:true};
        case 'USERS_SUCCESS':
            return{...state,loadingUsers:false,users:action.payload,errorUsers:''};
        case 'USERS_FAIL':
            return {...state,loadingUsers:false,errorUsers:action.payload}

        case 'USER_SUCCESS':
            return{...state,loadingUsers:false,user:action.payload,errorUsers:''};    
                
            
        default:
            return state;

    }
}
export default function HomePage() {

    const {backendAPI}=useContext(ThemeContext);

    const {query,userId}=useParams();
    const [state,dispatch]=useReducer(reducer,{
        loading:false,
        error:'',
        posts:[],
        loadingUsers:false,
        errorUsers:'',
        users:[],
        user:{}
    });
    
    const {loading,error,posts,loadingUsers,errorUsers,users,user}=state;
    const loadPosts=async()=>{
        dispatch({type:'POSTS_REQUEST'});
        try{
            const {data}=await axios.get(
             userId ?  `${backendAPI}?userId=${userId}`
            : `${backendAPI}/posts`
            );

            const filteredPosts = query
            ? data.filter(
                (x) => x.title.indexOf(query) >= 0 || x.body.indexOf(query) >= 0
              )
            : data;
          dispatch({ type: 'POSTS_SUCCESS', payload: filteredPosts });

        } catch(err){
            dispatch({type:'POSTS_FAIL',payload:err.message});

        }

    }
    const loadUsers=async()=>{
        dispatch({type:'USERS_REQUEST'});
        try{
            const {data}=await axios.get(
                userId? `${backendAPI}/users/${userId}`
                :`${backendAPI}/users`);
                
            
            
            
               
            dispatch({type:userId?'USER_SUCCESS':'USERS_SUCCESS',payload:data});

        } catch(err){
            dispatch({type:'USERS_FAIL',payload:err.message});

        }

    }
    useEffect(()=>{
        loadPosts();
        loadUsers();
    }, [query,userId,backendAPI] );

    return (

    <div className='blog'>
        <div className='content'>
            <h1>
            {query? `Results for "${query}"`:
            userId?`${user.name}'s post`
            :
            'Posts'
            
            }

            </h1>

            
       

        {loading?<div>Loading...</div>:
        error?<div>Error:{error}</div>:
        posts.length===0?<div>No post found</div>:
        <ul> {posts.map(post=>
            <li key={post.id}>
                <Link to={`/post/${post.id}`}>
                <h2>{post.title}</h2>

                </Link>
                
                <p>{post.body}</p>
            </li>
            )}
        </ul>

        }
   
        </div>

       <div className='sidebar'>

        

        { loadingUsers?<div>Loading...</div>:
        errorUsers?<div>Error:{errorUsers}</div>:
        users.length===0?<div>No user found</div>:

        userId?

        <div> 
            <h2>{user.name}'s profile</h2>
            <ul>
                <li>Email:{user.email}</li>
                <li>Phone:{user.phone}</li>
                <li>Website:{user.website}</li>
            </ul>
        </div>
        :

          <div>
            <h2>Authors</h2>

             <ul>

              {users.map(user=>
              <li key={user.id}>
                 <Link to={`/user/${user.id}`}> {user.name}</Link>
               </li>
                )}

            </ul>

          </div>
       

        }




       </div> 
            
    </div>
  )
}
