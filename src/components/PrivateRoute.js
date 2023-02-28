
import { useContext } from 'react';
import { Navigate,  Route } from 'react-router-dom';
import { ThemeContext } from '../ThemeContext.js';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(ThemeContext);
  return (
   
    
        user ? <Component /> : <Navigate to="/login"></Navigate>
 
  
  );
};

export default PrivateRoute;