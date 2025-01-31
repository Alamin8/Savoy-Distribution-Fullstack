import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from '../src/components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './pages/Dashboard/Dashboard';
import ProductList from './pages/Product/ProductList';
import AddProduct from './pages/Product/AddProduct';
import OrderList from './pages/Orders/OrderList';
import OrderAction from './pages/Orders/OrderAction';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <div className='app-main'>
      <ToastContainer/>
      <Navbar/>
      <div className="app__container">
        <Sidebar/>
        <div className="container">
          <Routes>
            <Route path='' element={<Dashboard/>} />

            {/* ---Product Route--- */}
            <Route path='/products' element={<ProductList/>} />
            <Route path='/products/add' element={<AddProduct/>} />


            {/* ---Order Route--- */}
            <Route path='/orders' element={<OrderList/>} />
            <Route path='/orders/action' element={<OrderAction/>} />

          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;