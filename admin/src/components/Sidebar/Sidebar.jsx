import React, { useState } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  
    const [productDropDown, setProductDropDown]=useState(false)
    const [orderDropDown, setOrderDropdown]=useState(false)
    const [categoryDropDown, setCategoryDropdown]=useState(false)
    const [brandDropDown, setBrandDropdown]=useState(false)

  return (
    <div className="sidebar">
      <div className="sortcut-links">
        
        <div className="side-links">
            <Link to="/" className="side-links-item"><p>Dashboard</p></Link>
        </div>

        {/* Product Dropdown */}
        <div className={`side-links ${productDropDown ? 'product-dropdownactive' : ''}`}> 
            <Link to='/products' className="side-links-item" onClick={()=>setProductDropDown(!productDropDown) }>
                Products
                {
                    productDropDown==false ? <i className="fa-solid fa-angle-right dropdown-down-arrow"></i> : <i className="fa-solid fa-angle-down dropdown-down-arrow"></i>
                }
            </Link>
            {
                productDropDown==false ? <></>:
                    <div className="sub-menu">
                    <Link to="/products" className="sub-menu-item"><p>Products List</p></Link>
                    <Link to="/products/add" className="sub-menu-item"><p>Add Product</p></Link>
                </div>
            }
        </div>
          
        {/* Order DropDown */}
        <div className={`side-links ${orderDropDown ? 'order-dropdownactive' : ''}`}> 
            <Link to='/orders' className="side-links-item" onClick={()=>setOrderDropdown(!orderDropDown) }>
                Orders
                {
                    orderDropDown==false ? <i className="fa-solid fa-angle-right dropdown-down-arrow"></i> : <i className="fa-solid fa-angle-down dropdown-down-arrow"></i>
                }
            </Link>
            {
                orderDropDown==false ? <></>:
                    <div className="sub-menu">
                    <Link to="/orders" className="sub-menu-item"><p>Order List</p></Link>
                    <Link to="/orders/action" className="sub-menu-item"><p>Order Action</p></Link>
                </div>
            }
        </div>

        {/* Category DropDown */}
        <div className={`side-links ${categoryDropDown ? 'category-dropdownactive' : ''}`}> 
            <Link to='/category-list' className="side-links-item" onClick={()=>setCategoryDropdown(!categoryDropDown) }>
                Category
                {
                    categoryDropDown==false ? <i className="fa-solid fa-angle-right dropdown-down-arrow"></i> : <i className="fa-solid fa-angle-down dropdown-down-arrow"></i>
                }
            </Link>
            {
                categoryDropDown==false ? <></>:
                    <div className="sub-menu">
                    <Link to="/category-list" className="sub-menu-item"><p>Category List</p></Link>
                    <Link to="/category-add" className="sub-menu-item"><p>Add Category</p></Link>
                </div>
            }
        </div>


        {/* Brand DropDown */}
        <div className={`side-links ${brandDropDown ? 'brand-dropdownactive' : ''}`}> 
            <Link to='/brand-list' className="side-links-item" onClick={()=>setBrandDropdown(!brandDropDown) }>
                Brand
                {
                    brandDropDown==false ? <i className="fa-solid fa-angle-right dropdown-down-arrow"></i> : <i className="fa-solid fa-angle-down dropdown-down-arrow"></i>
                }
            </Link>
            {
                brandDropDown==false ? <></>:
                    <div className="sub-menu">
                    <Link to="/brand-list" className="sub-menu-item"><p>Brand List</p></Link>
                    <Link to="/brand-add" className="sub-menu-item"><p>Add Brand</p></Link>
                </div>
            }
        </div>

      </div>
    </div>
  );
};

export default Sidebar;
