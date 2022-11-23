import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./app/hook";
import ProductAdd from "./pages/admin/product/product-add";
import LayoutAdmin from "./layouts/LayoutAdmin";
import LayoutWebsite from "./layouts/LayoutWebsite";
import { login } from "./slice/auth";
import Product from "./pages/admin/product/product";
import ProductEdit from "./pages/admin/product/product-edit";


function App() {
    const dispatch = useAppDispatch();
    const isLogin = useAppSelector((state) => state.auth.isLogin);

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<LayoutWebsite />}>
                    <Route index element={<h1>Home Page</h1>} />
                    <Route path="about" element={<h1>About Page</h1>} />
                </Route>
                <Route path="/admin" element={<LayoutAdmin />}>
                    <Route index element={<h1>Dashboard</h1>} />
                    <Route path="products" element={<Product />} />
                    <Route path="products/add" element={<ProductAdd />} />
                    <Route path="products/:id/edit" element={<ProductEdit />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
