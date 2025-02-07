import React, { useState } from 'react';
import './Category.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import UploadBtnImg from '../../assets/icon/upload_area.png'

const CategoryAdd = ({url}) => {

    const [image, setImage]=useState(false)

    const [data,setData]=useState({
        name:"",
        description:"",
        category:""
    })

    const onChangeHandler=(event)=>{
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data, [name]:value}))
    }

    const onSubmitHandeler= async (event)=>{
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name)
        formData.append("description", data.description)
        formData.append("price", Number(data.price))
        formData.append("image", image)
        const response = await axios.post(`${url}/api/category/add`, formData)
        if(response.data.success){
            setData({
                name:"",
                description:""
            }),
            setImage(false);
            toast.success(response.data.message);
        }else{
            toast.error(response.data.message)
        }
    }

    return (
        <div className='add-product'>
                    <form className="flex-col" onSubmit={onSubmitHandeler}>
                        <div className="add-img-upload flex-col">
                            <p>Upload Image</p>
                            <label htmlFor="image">
                                <img src={image?URL.createObjectURL(image):UploadBtnImg} alt="" />
                            </label>
                            <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden required />
                        </div>
                        <div className="add-product-name flex-col">
                            <p>Category name</p>
                            <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder="Type here" />
                        </div>
                        <div className="add-product-description flex-col">
                            <p>Category Description</p>
                            <textarea  onChange={onChangeHandler} value={data.description} name="description" rows="8" placeholder="Write content here" ></textarea>
                        </div>
                        
                        <button type='submit' className='add-btn'>ADD</button>
                    </form>
                </div>
    );
};

export default CategoryAdd;