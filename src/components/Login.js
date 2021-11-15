import React , { useEffect, useState } from "react";
import Header from './Header';
import { useNavigate } from 'react-router-dom';
// import Protected from './Protected';

const Login = () => {

    const navigate = useNavigate();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    
    useEffect(() => {
        if(localStorage.getItem('user-info'))
        {
            navigate('/add');
        }
    } , []);

    const Login = async (e) => {
        e.preventDefault();
        let item = {
            email , 
            password
        }
        setEmail('');
        setPassword('');
        let result = await fetch('http://localhost:8000/api/login',{
            method : 'POST',
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            },
            body : JSON.stringify(item)
        });
        result = await result.json();
        //console.log(result.status);
        if(result.status)
        {
            localStorage.setItem('user-info',JSON.stringify(result));
            navigate('/add');
        }
        else
        {
            alert(result.error[0]);
        }
    }

    return (
        <>
            <Header /> 
            <h1 className='text-center'>Login Page</h1>
            <div className='container'>
                <div className='row'>  
                <div className='col-md-2'></div>
                <div className='col-md-8'>
                    <form className='form-group'>
                        <small>Email</small>
                        <input type='email' name='email' value={email}
                        onChange={(e) => { setEmail(e.target.value); }} placeholder='Enter Your Email' className='form-control' />
                        <br />
                        <small>Password</small>
                        <input type='password' name='password' value={password} 
                        onChange={(e) => { setPassword(e.target.value); }} placeholder='Enter Your Password' className='form-control' />
                        <br />
                        <button onClick={Login} className='btn btn-primary'>Login</button>

                    </form>
                </div>
                <div className='col-md-2'></div>
                </div>
            </div>
        </>
    );

}

export default Login;