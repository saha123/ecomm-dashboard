import React , { useState , useEffect } from "react";
import Header from './Header';
import { useNavigate } from 'react-router-dom';  

const AddProduct = () => {

    const navigate = useNavigate();
    
    useEffect(() => {
        if(!localStorage.getItem('user-info'))
        {
            navigate('/login');
        }
    } , []);

    const [name , setName] = useState('');
    const [file , setFile] = useState('');
    const [price , setPrice] = useState('');
    const [desc , setDesc] = useState('');

    const addProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name',name);
        formData.append('file',file);
        formData.append('price',price);
        formData.append('desc',desc);
        let result = await fetch('http://localhost:8000/api/add-product',{
            method : 'POST',
            body : formData
        });
        alert("Product added successfully");
        navigate('/');
    }

    return (
        <>
            <Header /> 
            <h1 className='text-center mt-5'>Add Product</h1>
            <div className='container'>
                <div className='row'>  
                <div className='col-md-2'></div>
                <div className='col-md-8'>
                    <form className='form-group'>

                        <small>Product Name</small>
                        <input type='text' name='name' 
                        placeholder='Enter Product Name' value={name}
                        onChange={(e) => { setName(e.target.value) }} className='form-control' />
                        <br />
                        <small>Upload Image</small>
                        <input type='file' name='file'
                        onChange={(e) => { setFile(e.target.files[0]) }} className='form-control' />
                        <br />
                        <small>Price</small>
                        <input type='text' name='price' value={price}
                        onChange={(e) => { setPrice(e.target.value) }} placeholder='Enter Product Price' className='form-control' />
                        <br />
                        <small>Description</small>
                        <textarea name='desc' class='form-control' 
                        onChange={(e) => { setDesc(e.target.value) }} 
                        placeholder='Enter Product Description'>{desc}</textarea>
                        <br />
                        <button onClick={addProduct} className='btn btn-primary'>Add</button>

                    </form>
                </div>
                <div className='col-md-2'></div>
                </div>
            </div>
        </>
    );

}

export default AddProduct;