import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {toast} from 'react-toastify'

import './Orders.css'

const OrderList = ({url}) => {

    const [orders, setOrders]= useState([]);

    const fetchAllOrders = async ()=>{
        const response = await axios.get(`${url}/api/order/list`)

        if(response.data.success){
            setOrders(response.data.data)
        }else{
            toast.error("Error Occurs on Order list fatching-admin frontend");

        }
    }

    useEffect(()=>{
        fetchAllOrders();
    },[])

    console.log(orders)
    return (
        <div className='order add'>
            <h3>Order Page</h3>
            <div className="order-list">
                {
                    orders.map((order, index)=><>
                        <div key={index} className="order-item">
                        <i className="fa-solid fa-gift"></i>
                        <div className="order-items">
                            <p className="order-item-food">
                                {
                                    order.items.map((item, index)=>{
                                        if(index===order.items.length-1){
                                            return(
                                                <>
                                                 <p>&#x25cf;  {`${item.name}`}<span> X{`${item.quantity}`}</span></p>
                                                </>
                                            )
                                        }else{
                                            return (
                                                <>
                                                 <p>&#x25cf;  {`${item.name}`}<span> X{`${item.quantity}`}</span></p> <hr />
                                                </>
                                            )
                                        }
                                    })
                                }
                            </p>
                            <p className='order-item-name'>{order.address.firstName+" "+ order.address.lastName}</p>
                            <div className='order-item-address'>
                                <p>{order.address.street+','}</p>
                                <p>{order.address.city+", "+order.address.state+", "+order.address.country+", "+order.address.zipcode+""}</p>
                            </div>
                            <p className='order-item-phone'>{order.address.phone}</p>

                        </div>
                        <p>Items: {order.items.length}</p>
                        <p>${order.amount}.00</p>
                        <select>
                            <option value="Order Processing">Order Processing</option>
                            <option value="Out for delivery">Out for delivery</option>
                            <option value="Delivered">Delivered</option>
                        </select>
                        </div>
                    </>)
                }
            </div>
        </div>
    );
};

export default OrderList;