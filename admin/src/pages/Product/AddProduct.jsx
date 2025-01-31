import React, { useState } from 'react';
import './Product.css'
import UploadBtnImg from '../../assets/icon/upload_area.png'
import axios from 'axios'
import { toast } from 'react-toastify';

const AddProduct = () => {

    const url ="http://localhost:4000";
    const [image, setImage]=useState(false)

    const [data,setData]=useState({
        name:"",
        description:"",
        price:"",
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
        formData.append("category", data.category)
        formData.append("image", image)
        const response = await axios.post(`${url}/api/products/add`, formData)
        if(response.data.success){
            setData({
                name:"",
                description:"",
                price:"",
                category:""
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
                    <p>Product name</p>
                    <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder="Type here" />
                </div>
                <div className="add-product-description flex-col">
                    <p>Product Description</p>
                    <textarea  onChange={onChangeHandler} value={data.description} name="description" rows="8" placeholder="Write content here" required></textarea>
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Category</p>
                        <select  onChange={onChangeHandler} value={data.category} name="category">
                            <option >Select category</option>
                            <option value='Molino_Pasini'>Molino Pasini</option>
                            <option value='Goya_Foods'>Goya Foods</option>
                            <option value='Garofalo'>Garofalo</option>
                            <option value='MUTTI'>MUTTI</option>
                            <option value='Torani'>Torani</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Product price</p>
                        <input onChange={onChangeHandler} value={data.price} type="number" name='price' placeholder='$' required />
                    </div>
                </div>
                <button type='submit' className='add-btn'>ADD</button>
            </form>
        </div>
    );
};

export default AddProduct;