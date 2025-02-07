import React, { useState } from 'react';
import './Product.css'
import UploadBtnImg from '../../assets/icon/upload_area.png'
import axios from 'axios'
import { toast } from 'react-toastify';

const AddProduct = ({url}) => {

    const [image, setImage]=useState(false)

    const [data,setData]=useState({
        name:"",
        description:"",
        price:"",
        category:"",
        brand:"",
        stock:"",
        UPC:"",
        MOC:"",
        case_size:"",
        item_weight:"",
        package_weight:"",
        unit_count:""

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
        formData.append("brand", data.brand)
        formData.append("stock", data.stock)
        formData.append("UPC", data.UPC)
        formData.append("MOC", data.MOC)
        formData.append("case_size", data.case_size)
        formData.append("item_weight", data.item_weight)
        formData.append("package_weight", data.package_weight)
        formData.append("unit_count", data.unit_count)
        formData.append("image", image)
        const response = await axios.post(`${url}/api/products/add`, formData)
        if(response.data.success){
            setData({
                name:"",
                description:"",
                price:"",
                category:"",
                brand:"",
                stock:"",
                UPC:"",
                MOC:"",
                case_size:"",
                item_weight:"",
                package_weight:"",
                unit_count:""
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
                    <textarea  onChange={onChangeHandler} value={data.description} name="description" rows="8" placeholder="Write content here" ></textarea>
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Brand</p>
                        <select  onChange={onChangeHandler} value={data.brand} name="brand">
                            <option >Select Brand</option>
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
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Category</p>
                        <select  onChange={onChangeHandler} value={data.category} name="category">
                            <option >Select category</option>
                            <option value='Food'>Food</option>
                            <option value='Drinks'>Drinks</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Stock</p>
                        <input onChange={onChangeHandler} value={data.stock} type="number" name='stock' placeholder='Stock'  />
                    </div>
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>UPC</p>
                        <input onChange={onChangeHandler} value={data.UPC} type="number" name='UPC' placeholder='UPC' required />
                    </div>
                    <div className="add-price flex-col">
                        <p>MOC</p>
                        <input onChange={onChangeHandler} value={data.MOC} type="text" name='MOC' placeholder='MOC'  />
                    </div>
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Case Size</p>
                        <input onChange={onChangeHandler} value={data.case_size} type="text" name='case_size' placeholder='Case Size'  />
                    </div>
                    <div className="add-price flex-col">
                        <p>Unit Count</p>
                        <input onChange={onChangeHandler} value={data.unit_count} type="text" name='unit_count' placeholder='Unit Count'  />
                    </div>
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Item Weight</p>
                        <input onChange={onChangeHandler} value={data.item_weight} type="text" name='item_weight' placeholder='Item Weight'  />
                    </div>
                    <div className="add-price flex-col">
                        <p>Package Weight</p>
                        <input onChange={onChangeHandler} value={data.package_weight} type="text" name='package_weight' placeholder='Package Weight'  />
                    </div>
                </div>
                <button type='submit' className='add-btn'>ADD</button>
            </form>
        </div>
    );
};

export default AddProduct;