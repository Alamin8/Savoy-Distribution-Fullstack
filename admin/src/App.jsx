import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from '../src/components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './pages/Dashboard/Dashboard';
import ProductList from './pages/Product/ProductList';
import AddProduct from './pages/Product/AddProduct';
import OrderList from './pages/Orders/OrderList';
import OrderAction from './pages/Orders/OrderAction';
import CategoryList from './pages/Category/CategoryList';
import CategoryAdd from './pages/Category/CategoryAdd';
import BrandList from './pages/Brand/BrandList';
import BrandAdd from './pages/Brand/AddBrand';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  const url ='http://localhost:4000';
  return (
    <div className='app-main'>
      <ToastContainer/>
      <Navbar/>
      <div className="app__container">
        <Sidebar/>
        <div className="container">
          <Routes>
            <Route path='/' element={<Dashboard/>} />

            {/* ---Product Route--- */}
            <Route path='/products' element={<ProductList url={url}/>} />
            <Route path='/products/add' element={<AddProduct url={url}/>} />


            {/* ---Order Route--- */}
            <Route path='/orders' element={<OrderList url={url}/>} />
            <Route path='/orders/action' element={<OrderAction/>} />


            {/* ---Category Route--- */}
            <Route path='/category-list' element={<CategoryList url={url}/>} />
            <Route path='/category-add' element={<CategoryAdd url={url} />} />


            {/* ---Brand Route--- */}
            <Route path='/brand-list' element={<BrandList url={url}/>} />
            <Route path='/brand-add' element={<BrandAdd url={url} />} />

          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;