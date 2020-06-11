import React,{useState,useContext,useEffect,useRef} from 'react';
import {AuthContext} from '../Context/Context';
import authService from '../Services/authService';
import Message from './Message';

const Login = props => {

    var [user,setUser] = useState({username:"", password:""});
    var [message,setMessage] = useState(null);
    const authContext = useContext(AuthContext);
    var timerId = useRef(null);

    useEffect(()=>{
        return  ()=>{
            clearTimeout(timerId);
        }
    },[]);

    const onChange = e =>{
        setUser({...user,[e.target.name] : e.target.value});
    }

    const onSubmitHandler = e =>{
        e.preventDefault();
        authService.login(user).then(data =>{
            console.log(data);
            if(data.isAuthenticated){
            authContext.setUser(data.user);
            authContext.setisAuthenticated(true);
            props.history.push('/feed');}
            else{
                message={msgBody :"Invalid username/password!", msgError : true};
                setMessage(message);
                timerId = setTimeout(()=>{
                    setMessage(null);
                },3000);
            }
        });
    }

    const onClickHandler = e=>{
        e.preventDefault();
        props.history.push('/register');
    }

    return(
        <div>
            <form onSubmit={onSubmitHandler} className="logindiv">
                        <h2>Login</h2>
                <div className="inputdiv">
                    <label htmlFor="username" className="formLabel">Username</label><br />
                        <input type="text" className="formInput" 
                        name = "username" value={user.username} 
                        onChange = {onChange}  placeholder = "Enter Username"  />
                </div>

                <div className="inputdiv">
                    <label htmlFor="password" className="formLabel">Password</label><br />
                        <input type="password" className="formInput" 
                        name="password" value={user.password} 
                        onChange = {onChange}  placeholder = "Enter Password"  />
                </div>
                <div className="inputdiv" >
                        <button type="submit" className="loginButton submitButton">Login</button>
                </div>
                <h6>Dont have an account?<span onClick={onClickHandler}> SignUp</span></h6>
            </form>
            <div className="container">
            { message!==null? <Message message={message} />:null}
        </div>
        </div>
    );

};  


export default Login;