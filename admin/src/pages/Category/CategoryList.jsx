import React, { useEffect, useState } from 'react';
import './Category.css'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'


const CategoryList = ({url}) => {

    const [category, setCategory]=useState([])
    const [search, setSearch]=useState('');


    const fetchCategory = async()=>{
        if(search===''){
            const response = await axios.get(`${url}/api/category/list`)
                if(response){
                    setCategory(response.data.data)
                }
        }else{
            const res = await axios.get(url+`/api/category/search?q=${search}`)
            setCategory(res.data.data)

        }
    }

    const removeCategory = async(productId)=>{
        const response = await axios.post(`${url}/api/category/remove`,{id:productId})
        await fetchCategory()

        if(response.data.success){
            toast.success(response.data.message);
        }else{
            toast.error(response.data.message + 'Error');
        }
    }


    useEffect(()=>{
        fetchCategory()
        
    }, [search])


    return (
        <div className='category'>
             <h2 className="category-title">Category List</h2>
             <form className="category-search">
                <input type="text" name={search} onChange={e=> setSearch(e.target.value)} placeholder="Search here"/>
             </form>
             <div className="category-list title">
                          <p>SL</p>
                          <p>Image</p>
                          <p>Category Name</p>
                          <p>Description</p>
                          <p className="action">Action</p>
                        </div>
            {
                category ? category.map((item, index)=>{
                    return(
                        <div key={index} className="category-list">
                          <p>{index+1}</p>
                          <img src={`${url}/images/`+item.image} alt="" />
                          <p>{item.name}</p>
                          <p>{item.description}</p>
                          <div className="action">
                            <Link><i className="fa-solid fa-pen-to-square"></i></Link>
                            <Link className='delete'><i onClick={()=>removeCategory(item._id)} className="fa-solid fa-trash"></i></Link>
                          </div>
                        </div>
                    )
                }): <>No Category Found</>
            }
        </div>
    );
};

export default CategoryList;