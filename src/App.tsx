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
import ListCategory from "./pages/admin/categories/listCategory";
import AddCategory from "./pages/admin/categories/addCategory";
import EditCategory from "./pages/admin/categories/editCategory";


function App() {

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<LayoutWebsite />}>
                    <Route index element={<h1>Home Page</h1>} />
                    <Route path="about" element={<h1>About Page</h1>} />
                </Route>
                <Route path="/admin" element={<LayoutAdmin />}>
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
