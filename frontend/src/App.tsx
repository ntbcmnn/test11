import './App.css';
import Toolbar from './Components/UI/Toolbar/Toolbar.tsx';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './Containers/LoginPage/LoginPage.tsx';
import RegisterPage from './Containers/RegisterPage/RegisterPage.tsx';
import AddProduct from './Containers/AddProduct/AddProduct.tsx';
import Products from './Containers/Products/Products.tsx';
import DetailedProduct from './Containers/DetailedProduct/DetailedProduct.tsx';

const App = () => {
  return (
    <>
      <Toolbar />
      <div className="container my-5">
        <Routes>
          <Route path="/" element={<Products/>}/>
          <Route path="/products" element={<Products/>}/>
          <Route path="/products/:productId" element={<DetailedProduct/>}/>
          <Route path="/products/category/:categoryId" element={<DetailedProduct/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="add-product" element={<AddProduct/>}/>
          <Route
            path="*"
            element={<h3 className="text-center">Page not found</h3>}
          />
        </Routes>
      </div>
    </>
  );
};

export default App;
