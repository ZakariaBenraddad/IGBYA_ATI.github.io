import "./App.css";
//import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/auth/auth";
import MainAdmin from "./pages/mainAdmin/mainAdmin.jsx";
import Register from "./pages/register/register.jsx";
import axios from "axios";

axios.defaults.baseURL = "https://localhost:3000";
axios.defaults.withCredentials = false; // listen a sat la derti true l hadi kimchi kulchi

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Auth />} />
                    <Route path="/admin" element={<MainAdmin />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
