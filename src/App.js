import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//categories
import CreateCategory from "./components/Categories/Create/CreateCategory";
import UpdateCategory from "./components/Categories/Update/UpdateCategory";
import ListCategory from "./components/Categories/Liste/ListCategory";
import DeleteCategory from "./components/Categories/Delete/deleteCategory";

//produits
import ProductList from "./components/products/Liste/ProductList"
import AddProduct from "./components/products/Add/AddProduct";
import UpdateProduct from "./components/products/Update/UpdateProduct";
import ProductDetails from "./components/products/ProductDetails/ProductDetails";

//Header
import Header from "./components/Header/header";
//footer 
import Footer from "./components/Footer/Footer";
//home page
import HomePage from "./components/HomePage /HomePage";


//users
import ListUsers from "./components/users/Liste/ListUsers";


//orders

import AllOrders from "./components/Ordres/AllOrders";
import OrderDetails from "./components/Ordres/OrderDetail";


function App() {
  return (
    <Router>
      <Header />

      <Routes>
        {/* Category Routes */}
        <Route path="/categories" element={<ListCategory />} />
        <Route path="/categories/add" element={<CreateCategory />} />
        <Route path="/categories/update/:id" element={<UpdateCategory />} />
        <Route path="/categories/delete" element={<DeleteCategory />} />

        {/* Product Routes */}
        <Route path="/produit" element={< ProductList/>} />
        <Route path="/produit/add" element={<AddProduct />} />
        <Route path="/produit/update/:id" element={<UpdateProduct />} />
        <Route path="/produit/details/:productId" element={<ProductDetails />} />


        

        {/* Users Routes */}
        <Route path="/users" element={<ListUsers />} />
        
        
        

        {/* orders routes */}
        <Route path="/orders" element={<AllOrders />} />
        <Route path="/orders/:orderId" element={<OrderDetails />} />

         {/* home page routes */}
         <Route path="/homepage" element={<HomePage />} />



        
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
