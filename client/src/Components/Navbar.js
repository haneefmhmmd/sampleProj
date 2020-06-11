import React, { useContext } from 'react';
import {Link, useHistory} from 'react-router-dom';
import {AuthContext} from '../Context/Context';
import authService from '../Services/authService';
import '../App.css';
const Navbar = (props) =>{

    const {user,setUser,isAuthenticated,setisAuthenticated} = useContext(AuthContext);
    const history = useHistory();
    const onClickHandler = (e)=>{
        e.preventDefault();
        authService.logout().then(data =>{
            if(data.success){
                setUser(data.user);
                setisAuthenticated(false);
                history.push('/login');
            }
        });
    }
    const unAuthenticatedNavbar = ()=>{
        return(
            <>
                <Link to = "/login">
                    <button className="navButton" type="submit">Login</button>
                </Link>  
            </>
        );
    }

    const AuthenticatedNavbar = ()=>{
        return(
            <>         

                <button className="navButton" 
                    type="submit" onClick={onClickHandler}>
                    Logout
                </button>
            </>
        );
    }

    return(
        <nav className="navbar navbar-dark bg-dark">
                <Link to="/">
                    <h3>Sample</h3>     
                </Link>
        {   isAuthenticated ? AuthenticatedNavbar() : unAuthenticatedNavbar()}  
        </nav> 
    );
}


export default Navbar;

