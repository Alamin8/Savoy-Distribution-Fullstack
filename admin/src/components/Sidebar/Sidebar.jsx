import React, { useState } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  
    const [productdrowpdown, setdropdown]=useState(false)
    const [orderDrowpdown, setOrderDropdown]=useState(false)

  return (
    <div className="sidebar">
      <div className="sortcut-links">
        
        <div className="side-links">
            <Link to="/" className="side-links-item"><p>Dashboard</p></Link>
        </div>

        {/* Product Dropdown */}
        <div className={`side-links ${productdrowpdown ? 'product-dropdownactive' : ''}`}> 
            <Link to='' className="side-links-item" onClick={()=>setdropdown(!productdrowpdown) }>
                Products
                {
                    productdrowpdown==false ? <i className="fa-solid fa-angle-right dropdown-down-arrow"></i> : <i className="fa-solid fa-angle-down dropdown-down-arrow"></i>
                }
            </Link>
            {
                productdrowpdown==false ? <></>:
                    <div className="sub-menu">
                    <Link to="/products" className="sub-menu-item"><p>All products</p></Link>
                    <Link to="/products/add" className="sub-menu-item"><p>Add Product</p></Link>
                </div>
            }
        </div>
          
        {/* Order DropDown */}
        <div className={`side-links ${orderDrowpdown ? 'order-dropdownactive' : ''}`}> 
            <Link to='' className="side-links-item" onClick={()=>setOrderDropdown(!orderDrowpdown) }>
                Orders
                {
                    orderDrowpdown==false ? <i className="fa-solid fa-angle-right dropdown-down-arrow"></i> : <i className="fa-solid fa-angle-down dropdown-down-arrow"></i>
                }
            </Link>
            {
                orderDrowpdown==false ? <></>:
                    <div className="sub-menu">
                    <Link to="/orders" className="sub-menu-item"><p>All Orders</p></Link>
                    <Link to="/orders/action" className="sub-menu-item"><p>Order Action</p></Link>
                </div>
            }
        </div>


      </div>
    </div>
  );
};

export default Sidebar;
