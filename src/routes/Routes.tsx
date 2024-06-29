import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Search from "../pages/Search/Search";
import React from "react";
import Category from "../pages/Category/Category";

const MainRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/"  element={<Search />} />
                <Route path="/category/:category" element={<Category />} />
            </Routes>
        </Router>
    );
};


export default MainRoutes;
