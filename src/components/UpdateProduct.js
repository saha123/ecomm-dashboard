import React , { useState , useEffect } from "react";
import Header from './Header';
import { useNavigate } from 'react-router-dom'; 

const UpdateProduct = () => {
    const url = window.location.href;
    const url_arr = url.split('/');
    const navigate = useNavigate();

    const getData = async () => {
        let result = await fetch('http://localhost:8000/api/edit-product/'+url_arr[4]);
        result = await result.json();
        setName(result[0].name);
        setFilePath(result[0].file_path);
        setPrice(result[0].price);
        setDesc(result[0].desc);
    }
    
    useEffect(() => {
        if(!localStorage.getItem('user-info'))
        {
            navigate('/login');
        }
        getData();
    } , []);

    const [name , setName] = useState('');
    const [file , setFile] = useState('');
    const [filepath,setFilePath] = useState('');
    const [price , setPrice] = useState('');
    const [desc , setDesc] = useState('');

    const editProduct = async (e) => { 
        e.preventDefault();
        const formData = new FormData();
        formData.append('name',name);
        formData.append('file',file);
        formData.append('price',price);
        formData.append('desc',desc);
        let result = await fetch('http://localhost:8000/api/edit-product-process/'+url_arr[4],{
            method : 'POST',
            body : formData
        });
        alert("Product Updated successfully");
        getData();
        navigate('/');
    }

    return (
        <>
            <Header /> 
            <h1 className='text-center mt-5'>Update Product</h1>
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
                        <img src={"http://localhost:8000/"+filepath} width="100" height="100" />
                        <br />
                        <small>Price</small>
                        <input type='text' name='price' value={price}
                        onChange={(e) => { setPrice(e.target.value) }} placeholder='Enter Product Price' className='form-control' />
                        <br />
                        <small>Description</small>
                        <textarea name='desc' className='form-control' value={desc}
                        onChange={(e) => { setDesc(e.target.value) }} 
                        placeholder='Enter Product Description'></textarea>
                        <br />
                        <button onClick={editProduct} className='btn btn-primary'>Edit</button>

                    </form>
                </div>
                <div className='col-md-2'></div>
                </div>
            </div>
        </>
    );

}

export default UpdateProduct;