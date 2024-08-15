import "./App.css";
//import { useState, useEffect } from "react";
import Auth from "./pages/auth/auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainAdmin from "./pages/mainAdmin/mainAdmin.jsx";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Auth />} />
                    <Route path="/admin" element={<MainAdmin />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
