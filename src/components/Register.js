import React, { useState , useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Header from './Header';
// import Protected from './Protected';

const Register = () => {

    const navigate = useNavigate();
    
    useEffect(() => {
        if(localStorage.getItem('user-info'))
        {
            navigate('/add');
        }
    } , []);

    const [name , setName] = useState('');
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');

    const SignUp = async (e) => {
        e.preventDefault();
        let item = {
            name ,
            email , 
            password
        }
        setName('');
        setEmail('');
        setPassword('');
        let result = await fetch('http://localhost:8000/api/register',{
            method : 'POST',
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            },
            body : JSON.stringify(item)
        });
        result = await result.json();
        console.warn("Result : ",result);
        navigate('/login');
    }

    return (
        <>
            <Header /> 
            <h1 className='text-center mt-5'>User Sign Up</h1>
            <div className='container'>
                <div className='row'>  
                <div className='col-md-2'></div>
                <div className='col-md-8'>
                    <form className='form-group'>

                        <small>Full Name</small>
                        <input type='text' name='name' 
                        placeholder='Enter Your Name' value={name} 
                        onChange={(event) => { setName(event.target.value) }} className='form-control' />
                        <br />
                        <small>Email</small>
                        <input type='email' name='email' 
                        placeholder='Enter Your Email' value={email} 
                        onChange={(event) => { setEmail(event.target.value) }} className='form-control' />
                        <br />
                        <small>Password</small>
                        <input type='password' name='password' 
                        placeholder='Enter Your Password' value={password} 
                        onChange={(event) => { setPassword(event.target.value) }} className='form-control' />
                        <br />
                        <button onClick={SignUp} className='btn btn-primary'>Sign Up</button>

                    </form>
                </div>
                <div className='col-md-2'></div>
                </div>
            </div>
        </>
    );

}

export default Register;