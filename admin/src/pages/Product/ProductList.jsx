import React, { useEffect, useState } from 'react';
import './Product.css'
import axios from 'axios';
import {toast} from 'react-toastify'

const ProductList = ({url}) => {


    const [list, setList]=useState([])
    const [search, setSearch]=useState('')

    const fetchList = async ()=>{
        const res = await axios.get(url+`/api/products/adminSearch?q=${search}`)
        console.log(res)
        if(res.data.success){
            setList(res.data.data)
        }else{
            toast.error("Error")
        }
    }
    const removeProduct = async(productId)=>{
        const response = await axios.post(`${url}/api/products/remove`,{id:productId})
        setSearch('')
        await fetchList()

        if(response.data.success){
            toast.success(response.data.message);
        }else{
            toast.error(response.data.message + 'Error');
        }
    }

    useEffect(()=>{
        fetchList();
    }, [search])


    return (
        <div className='productlist list add flex-col'>
            <p className="product-list-title">All Products List</p>
            <input className="advance-search" type="text" name={search} onChange={(e)=>setSearch(e.target.value)} placeholder='Search here' />
            <p>Search result: {list.length}</p>
            <div className="list-table">
                <div className="list-table-format title">
                    <b>UPC</b>
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Action</b>
                </div>
                {
                    list.map((item, index)=>{
                        return(
                            <div key={index} className="list-table-format">
                                <p>{item.UPC}</p>
                                <img src={`${url}/images/`+item.image} alt="" />
                                <p>{item.name}</p>
                                <p>{item.category}</p>
                                <p>{item.price}</p>
                                <p><i className="fa-solid fa-eye"></i><i className="fa-solid fa-pen-to-square"></i><i onClick={()=>removeProduct(item._id)} className="fa-solid fa-trash"></i></p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default ProductList;