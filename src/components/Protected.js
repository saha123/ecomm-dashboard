import React , { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const Protected  = () => 
{
    const navigate = useNavigate();
    
    useEffect(() => {
        if(localStorage.getItem('user-info'))
        {
            navigate('/add');
        }
    } , []);

}

export default Protected;
