import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./app/hook";
import ProductAdd from "./pages/admin/product/product-add";
import LayoutAdmin from "./layouts/LayoutAdmin";
import LayoutWebsite from "./layouts/LayoutWebsite";
import Product from "./pages/admin/product/product";
import ProductEdit from "./pages/admin/product/product-edit";
import ListCategory from "./pages/admin/categories/listCategory";
import AddCategory from "./pages/admin/categories/addCategory";
import EditCategory from "./pages/admin/categories/editCategory";
import Home from "./pages/Home";
import DetailProduct from "./pages/client/DetailProduct";
import Signin from "./pages/auth/Signin";
import SignUp from "./pages/auth/SignUp";
import ProductList from "./pages/client/Product";
import CheckOut from "./pages/client/CheckOut";
import Account from "./pages/auth/Account";
import Profile from "./pages/auth/Profile";
import LayoutPrivate from "./layouts/LayoutPrivate";
import Cart from "./pages/client/Cart";
import ProductByCate from "./pages/client/ProductByCate";


function App() {

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<LayoutWebsite />}>
                    <Route index element={<Home />} />
                    <Route path="products" element={<ProductList />} />
                    <Route path="products/:id" element={<DetailProduct />} />
                    <Route path="checkout" element={<CheckOut />} />
                    <Route path="account" element={<Account />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="about" element={<h1>About Page</h1>} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="category/:id" element={<ProductByCate />} />

                    <Route path="signin" element={<Signin />} />
                    <Route path="signup" element={<SignUp />} />
                </Route>
                <Route path="/admin" element={<LayoutPrivate><LayoutAdmin /></LayoutPrivate>}>
                    <Route index element={<h1>Dashboard</h1>} />
                    <Route path="products">
                        <Route index element={<Product />} />
                        <Route path="add" element={<ProductAdd />} />
                        <Route path=":id/edit" element={<ProductEdit />} />
                    </Route>
                    <Route path="category">
                        <Route index element={<ListCategory />} />
                        <Route path="add" element={<AddCategory />} />
                        <Route path=":id/edit" element={<EditCategory />} />
                    </Route>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
