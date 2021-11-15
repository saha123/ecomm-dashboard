import React,{ useState , useEffect } from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';

const AllProduct = () => {

    const [data,setData] = useState([]);
    const [search,setSearch] = useState('');
    let [count , setCount] = useState(1);

    const getData = async () => {
        let result = await fetch('http://localhost:8000/api/all-products');
        result = await result.json();
        setData(result);
    }

    useEffect(() => {
        getData();
    } , []);

    const deleteOperation = async (id) => {
        let result = await fetch('http://localhost:8000/api/delete-product/'+id);
        result = await result.json();
        alert(result.result);
        setCount(1);
        getData();
    }

    const Search = async (e) => {
        setSearch(e.target.value);
        if(search.length > 0)
        {
            let result = await fetch('http://localhost:8000/api/search/'+search);
            result = await result.json();
            setCount(1);
            setData(result);
        }
        else
        {
            getData();
        }
    }

    return (
        <>
            <Header />
            <h1 className='text-center mt-5'>All Products</h1>
            <div><input type='text' style={{width:'20%',float:'right',marginRight:'10px'}} name='search' 
            className='form-control input-sm' name='search_str'
            onKeyUp={Search} placeholder='Search...' autoComplete='off' /></div>
            <br />
            <br />
            <table className="table table-striped">
                <thead className="table-info">
                    <tr className='text-center'>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Image</th>
                        <th scope="col">Price</th>
                        <th scope="col">Description</th>
                        <th scope="col">Created Date</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((elem) => {
                            return (
                                <tr className='text-center'>
                                    <th scope="row">{count++}</th>
                                    <td>{elem.name}</td>
                                    <td>
                                        <img src={"http://localhost:8000/"+elem.file_path} width="100" height="100" />
                                    </td>
                                    <td>{elem.price}</td>
                                    <td>{elem.desc}</td>
                                    <td>{elem.created_at}</td>
                                    <td>
                                        <Link className='btn btn-warning'
                                        to={'edit/'+elem.id}>Edit</Link> &nbsp;
                                        <button className='btn btn-danger' 
                                        onClick={() => { deleteOperation(elem.id) }}>Delete</button>
                                    </td>
                                </tr>
                            );
                        })
                    }  
                </tbody>
            </table>
        </>
    );
}

export default AllProduct;